import { createContext, useContext, useEffect, useReducer } from "react";
import expenseReducer from "../reducer/expenseReducer";

const ExpenseContext = createContext();

const initialState =
  JSON.parse(localStorage.getItem("expenses")) || [];

export const ExpenseProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(
    expenseReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  const addExpense = (expense) => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });
  };

  const editExpense = (expense) => {
    dispatch({
      type: "EDIT_EXPENSE",
      payload: expense,
    });
  };

  const deleteExpense = (id) => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
  };

  const clearExpenses = () => {
    dispatch({
      type: "CLEAR_EXPENSES",
    });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        editExpense,
        deleteExpense,
        clearExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () =>
  useContext(ExpenseContext);
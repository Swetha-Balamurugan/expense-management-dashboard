const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.payload];

    case "EDIT_EXPENSE":
      return state.map((expense) =>
        expense.id === action.payload.id
          ? action.payload
          : expense
      );

    case "DELETE_EXPENSE":
      return state.filter(
        (expense) => expense.id !== action.payload
      );

    case "CLEAR_EXPENSES":
      return [];

    default:
      return state;
  }
};

export default expenseReducer;
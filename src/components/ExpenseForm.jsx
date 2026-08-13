import { useEffect, useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

function ExpenseForm({ editingExpense, setEditingExpense }) {
  const { addExpense, editExpense } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert("Please fill all fields");
      return;
    }

    const expenseData = {
      id: editingExpense
        ? editingExpense.id
        : Date.now(),
      title,
      amount: Number(amount),
      category,
      date,
    };

    if (editingExpense) {
      editExpense(expenseData);
      setEditingExpense(null);
    } else {
      addExpense(expenseData);
    }

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleCancel = () => {
    setEditingExpense(null);
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="form-card">
      <h2>
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Expense Name</label>

          <input
            type="text"
            placeholder="Eg: Grocery"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Amount</label>

          <input
            type="number"
            placeholder="Eg: 500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Education</option>
            <option>Other</option>
          </select>
        </div>

        <div className="input-group">
          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />
        </div>

        <button className="add-btn" type="submit">
          {editingExpense
            ? "Update Expense"
            : "+ Add Expense"}
        </button>

        {editingExpense && (
          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ExpenseForm;
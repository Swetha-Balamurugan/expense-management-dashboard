import { useExpenses } from "../context/ExpenseContext";

function ExpenseCard({ expense, onEdit }) {
  const { deleteExpense } = useExpenses();

  return (
    <div className="expense-card">

      <div>
        <h3>{expense.title}</h3>

        <p>
          {expense.category} • {expense.date}
        </p>
      </div>

      <div className="expense-right">

        <strong>
          ₹{Number(expense.amount).toLocaleString()}
        </strong>

        <button
          className="edit-btn"
          onClick={() => onEdit(expense)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteExpense(expense.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ExpenseCard;
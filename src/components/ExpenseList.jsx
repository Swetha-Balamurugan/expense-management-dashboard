import ExpenseCard from "./ExpenseCard";

function ExpenseList({ expenses, onEdit }) {
  return (
    <div className="list-card">
      <div className="section-header">
        <h2>Recent Expenses</h2>

        <span>{expenses.length} transactions</span>
      </div>

      {expenses.length === 0 ? (
        <div className="empty">
          <p>No expenses found.</p>
          <span>
            Try selecting another category.
          </span>
        </div>
      ) : (
        expenses
          .slice()
          .reverse()
          .map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
            />
          ))
      )}
    </div>
  );
}

export default ExpenseList;
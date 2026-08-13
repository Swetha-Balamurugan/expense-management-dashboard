import { useExpenses } from "../context/ExpenseContext";

function Dashboard() {
  const { expenses } = useExpenses();

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const average =
    expenses.length > 0
      ? total / expenses.length
      : 0;

  const highest =
    expenses.length > 0
      ? Math.max(...expenses.map((expense) => expense.amount))
      : 0;

  return (
    <div className="stats-grid">

      <div className="stat-card">
        <span>Total Spending</span>
        <h2>₹{total.toLocaleString()}</h2>
      </div>

      <div className="stat-card">
        <span>Transactions</span>
        <h2>{expenses.length}</h2>
      </div>

      <div className="stat-card">
        <span>Average Expense</span>
        <h2>₹{Math.round(average).toLocaleString()}</h2>
      </div>

      <div className="stat-card">
        <span>Highest Expense</span>
        <h2>₹{highest.toLocaleString()}</h2>
      </div>

    </div>
  );
}

export default Dashboard;
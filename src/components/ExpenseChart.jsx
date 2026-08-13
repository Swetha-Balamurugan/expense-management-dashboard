import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ expenses = [] }) {

  const categories = {};

  expenses.forEach((expense) => {
    if (!categories[expense.category]) {
      categories[expense.category] = 0;
    }

    categories[expense.category] += Number(
      expense.amount
    );
  });

  const data = Object.entries(categories).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  const COLORS = [
    "#6366f1",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
    "#64748b",
  ];

  return (
    <div className="chart-card">

      <h2>Spending by Category</h2>

      {data.length === 0 ? (
        <div className="chart-empty">
          No expenses found for the selected filter.
        </div>
      ) : (
       <ResponsiveContainer
  width="100%"
  height={300}
>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `₹${value}`}
            />

            <Legend />

          </PieChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}

export default ExpenseChart;
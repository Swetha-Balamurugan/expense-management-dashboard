import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { getSpendingInsights } from "../services/geminiService";

function AIInsights() {
  const { expenses } = useExpenses();

  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateInsights = async () => {
    if (expenses.length === 0) {
      setError("Add some expenses first.");
      return;
    }

    setLoading(true);
    setError("");
    setInsights("");

    try {
      const result = await getSpendingInsights(expenses);
      setInsights(result);
    } catch (err) {
      setError(
        "Unable to generate AI insights. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const closeInsights = () => {
    setInsights("");
    setError("");
  };

  const cleanInsights = (text) => {
    return text
      .replace(/###/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .trim();
  };

  return (
    <div className="ai-insights-card">

      <div className="ai-insights-header">

        <div>
          <p className="ai-label">AI POWERED</p>

          <h2>Smart Spending Insights</h2>

          <p>
            Get intelligent insights about your spending habits.
          </p>
        </div>

        <button
          className="ai-button"
          onClick={handleGenerateInsights}
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "✨ Analyze Spending"}
        </button>

      </div>

      {error && (
        <div className="ai-error">
          {error}
        </div>
      )}

      {insights && (
        <div className="ai-result">

          <div className="ai-result-header">

            <h3>🤖 Gemini Analysis</h3>

            <button
              className="close-ai-btn"
              onClick={closeInsights}
              title="Close analysis"
            >
              ✕
            </button>

          </div>

          <div className="ai-text">
            {cleanInsights(insights)}
          </div>

        </div>
      )}

    </div>
  );
}

export default AIInsights;
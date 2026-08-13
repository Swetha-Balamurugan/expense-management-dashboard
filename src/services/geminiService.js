import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function getSpendingInsights(expenses) {
  if (!expenses || expenses.length === 0) {
    return "Add some expenses first so I can analyze your spending.";
  }

  const expenseData = expenses.map((expense) => ({
    name: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
  }));

  const prompt = `
You are a personal finance assistant.

Analyze the following expense data:

${JSON.stringify(expenseData, null, 2)}

Give a concise spending analysis with:

1. Overall spending summary
2. Highest spending category
3. Any unusual or concerning spending pattern
4. Two practical money-saving suggestions

Keep the response simple and beginner-friendly.
Do not invent any information that is not present in the expense data.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(
      "Unable to generate AI insights. Please try again."
    );
  }
}
import { useMemo, useState } from "react";

import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import FilterBar from "./components/FilterBar";

import { useExpenses } from "./context/ExpenseContext";

import "./App.css";

function App() {
  const { expenses } = useExpenses();

  const [editingExpense, setEditingExpense] =
    useState(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedPeriod, setSelectedPeriod] =
    useState("All");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPeriod("All");
    setStartDate("");
    setEndDate("");
  };

  const filteredExpenses = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return expenses.filter((expense) => {
      const expenseDate = new Date(
        `${expense.date}T00:00:00`
      );

      

      const categoryMatch =
        selectedCategory === "All" ||
        expense.category === selectedCategory;

      if (!categoryMatch) {
        return false;
      }

     

      if (selectedPeriod === "All") {
        return true;
      }

    
      if (selectedPeriod === "Today") {
        return (
          expenseDate.getTime() ===
          today.getTime()
        );
      }

     
      if (selectedPeriod === "Yesterday") {
        const yesterday = new Date(today);

        yesterday.setDate(
          today.getDate() - 1
        );

        return (
          expenseDate.getTime() ===
          yesterday.getTime()
        );
      }

     
      if (selectedPeriod === "Week") {
        const weekStart = new Date(today);

        weekStart.setDate(
          today.getDate() - today.getDay()
        );

        const weekEnd = new Date(weekStart);

        weekEnd.setDate(
          weekStart.getDate() + 6
        );

        return (
          expenseDate >= weekStart &&
          expenseDate <= weekEnd
        );
      }

     
      if (selectedPeriod === "LastWeek") {
        const thisWeekStart = new Date(today);

        thisWeekStart.setDate(
          today.getDate() - today.getDay()
        );

        const lastWeekStart = new Date(
          thisWeekStart
        );

        lastWeekStart.setDate(
          thisWeekStart.getDate() - 7
        );

        const lastWeekEnd = new Date(
          thisWeekStart
        );

        lastWeekEnd.setDate(
          thisWeekStart.getDate() - 1
        );

        return (
          expenseDate >= lastWeekStart &&
          expenseDate <= lastWeekEnd
        );
      }

      
      if (selectedPeriod === "Month") {
        return (
          expenseDate.getMonth() ===
            today.getMonth() &&
          expenseDate.getFullYear() ===
            today.getFullYear()
        );
      }

    
      if (selectedPeriod === "LastMonth") {
        const lastMonthStart = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );

        const lastMonthEnd = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );

        return (
          expenseDate >= lastMonthStart &&
          expenseDate <= lastMonthEnd
        );
      }

    
      if (selectedPeriod === "Year") {
        return (
          expenseDate.getFullYear() ===
          today.getFullYear()
        );
      }

      
      if (selectedPeriod === "LastYear") {
        return (
          expenseDate.getFullYear() ===
          today.getFullYear() - 1
        );
      }

     
      if (selectedPeriod === "Custom") {
        if (!startDate && !endDate) {
          return true;
        }

        const fromDate = startDate
          ? new Date(`${startDate}T00:00:00`)
          : null;

        const toDate = endDate
          ? new Date(`${endDate}T00:00:00`)
          : null;

        if (fromDate && expenseDate < fromDate) {
          return false;
        }

        if (toDate && expenseDate > toDate) {
          return false;
        }

        return true;
      }

      return true;
    });
  }, [
    expenses,
    selectedCategory,
    selectedPeriod,
    startDate,
    endDate,
  ]);

  return (
    <div className="app">

      <header className="header">
        <div>
          <p className="eyebrow">
            SMART FINANCE
          </p>

          <h1>
             Expense Management Dashboard
          </h1>

          <p className="subtitle">
            Track, analyze and understand your spending.
          </p>
        </div>
      </header>

      <main className="container">

        <Dashboard />

        <div className="top-grid">

          <ExpenseForm
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />

          <ExpenseChart
            expenses={filteredExpenses}
          />

        </div>

       

<FilterBar
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  selectedPeriod={selectedPeriod}
  setSelectedPeriod={setSelectedPeriod}
  startDate={startDate}
  setStartDate={setStartDate}
  endDate={endDate}
  setEndDate={setEndDate}
  clearFilters={clearFilters}
/>

      

        <ExpenseList
          expenses={filteredExpenses}
          onEdit={setEditingExpense}
        />

      </main>

    </div>
  );
}

export default App;
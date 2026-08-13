function FilterBar({
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  clearFilters,
}) {
  return (
    <div className="filter-bar">

      <div className="filter-group">
        <label>Category:</label>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Period:</label>

        <select
          value={selectedPeriod}
          onChange={(e) =>
            setSelectedPeriod(e.target.value)
          }
        >
          <option value="All">All Time</option>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="Week">This Week</option>
          <option value="LastWeek">Last Week</option>
          <option value="Month">This Month</option>
          <option value="LastMonth">Last Month</option>
          <option value="Year">This Year</option>
          <option value="LastYear">Last Year</option>
          <option value="Custom">Custom Date</option>
        </select>
      </div>

      {selectedPeriod === "Custom" && (
        <>
          <div className="filter-group">
            <label>From:</label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
            />
          </div>

          <div className="filter-group">
            <label>To:</label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
            />
          </div>
        </>
      )}

      <button
        className="clear-filter-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>

    </div>
  );
}

export default FilterBar;
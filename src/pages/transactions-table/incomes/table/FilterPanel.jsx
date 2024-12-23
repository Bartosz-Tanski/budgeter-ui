import React from "react";
import SearchBar from "../../../../common/components/SearchBar.jsx";

const FilterPanel = ({
                         searchQuery,
                         onSearchChange,

                         startDate,
                         onStartDateChange,

                         endDate,
                         onEndDateChange,

                         selectedCategory,
                         onCategoryChange,
                         categories,
                     }) => {
    return (
        <div className="filter-section">
            <SearchBar
                value={searchQuery}
                onChange={(query) => onSearchChange(query)}
            />

            <div className="filter-group">
                <label className="filter-label">Date from:</label>
                <input
                    type="date"
                    className="filter-input"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label className="filter-label">Date to:</label>
                <input
                    type="date"
                    className="filter-input"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label className="filter-label">Category:</label>
                <select
                    className="filter-select"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="">All categories</option>
                    <option value="No category">No category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterPanel;

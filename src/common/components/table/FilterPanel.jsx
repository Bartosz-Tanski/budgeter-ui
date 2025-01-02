import React, {useState} from "react";
import SearchBar from "./SearchBar.jsx";
import {getDefaultStartDate, getTodayDate} from "../../helpers/dateHelper.js";

const FilterPanel = ({
                         searchQuery,
                         onSearchChange,
                         onStartDateChange,
                         onEndDateChange,
                         selectedCategory,
                         onCategoryChange,
                         categories,
                         startDate,
                         endDate,
                     }) => {
    return (
        <div className="filter-section">
            <div className="filter-left">
                <SearchBar
                    value={searchQuery}
                    onChange={(val) => onSearchChange(val)}
                />
            </div>

            <div className="filter-right">
                <input
                    type="date"
                    className="filter-input date-input"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                />
                -
                <input
                    type="date"
                    className="filter-input date-input"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                />

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

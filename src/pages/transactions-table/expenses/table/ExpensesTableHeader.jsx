import React from "react";

const ExpensesTableHeader = ({ sortConfig, onSort }) => {
    const handleSortClick = (key) => {
        onSort(key);
    };

    const renderSortIndicator = (key) => {
        if (sortConfig.key !== key) return null;

        const isAscending = sortConfig.direction === 0;

        return (
            <i
                className={`fas fa-chevron-up ${isAscending ? "rotated-up" : "rotated-down"}`}
            ></i>
        );
    };

    return (
        <tr>
            <th onClick={() => handleSortClick("Title")}>
                Title {renderSortIndicator("Title")}
            </th>
            <th onClick={() => handleSortClick("Amount")}>
                Amount {renderSortIndicator("Amount")}
            </th>
            <th onClick={() => handleSortClick("Date")}>
                Date {renderSortIndicator("Date")}
            </th>
            <th onClick={() => handleSortClick("CategoryName")}>
                Category {renderSortIndicator("CategoryName")}
            </th>
            <th onClick={() => handleSortClick("Description")}>
                Description {renderSortIndicator("Description")}
            </th>
            <th>Actions</th>
        </tr>
    );
};

export default ExpensesTableHeader;

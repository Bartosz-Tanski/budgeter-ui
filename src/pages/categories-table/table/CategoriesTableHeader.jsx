import React from "react";

const CategoriesTableHeader = ({ onSort, sortConfig }) => {
    const handleSort = (key) => {
        onSort((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 0 ? 1 : 0,
        }));
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
            <th onClick={() => handleSort("Name")}>
                Name {renderSortIndicator("Name")}
            </th>
            <th>Actions</th>
        </tr>
    );
};

export default CategoriesTableHeader;

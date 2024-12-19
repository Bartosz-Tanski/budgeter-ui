import React from "react";

const TableHeader = ({ onSort, sortConfig }) => {
    const handleSort = (key) => {
        onSort((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 0 ? 1 : 0,
        }));
    };

    const renderSortIndicator = (key) =>
        sortConfig.key === key ? (sortConfig.direction === 0 ? "▲" : "▼") : "";

    return (
        <tr>
            <th onClick={() => handleSort("Name")}>
                Name {renderSortIndicator("Name")}
            </th>
            <th onClick={() => handleSort("Balance")}>
                Balance {renderSortIndicator("Balance")}
            </th>
            <th onClick={() => handleSort("CurrencyCode")}>
                Currency Code {renderSortIndicator("CurrencyCode")}
            </th>
            <th>Actions</th>
        </tr>
    );
};

export default TableHeader;

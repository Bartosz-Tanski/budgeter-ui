import React from "react";
import CategoriesTableHeader from "./CategoriesTableHeader.jsx";
import CategoriesTableRow from "./CategoriesTableRow.jsx";

const CategoriesTable = ({ categories, onDelete, onEdit, onSort, sortConfig }) => {
    return (
        <table className="table">
            <thead>
            <CategoriesTableHeader onSort={onSort} sortConfig={sortConfig} />
            </thead>
            <tbody>
            {categories.map((category) => (
                <CategoriesTableRow
                    key={category.id}
                    category={category}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
            </tbody>
        </table>
    );
};

export default CategoriesTable;

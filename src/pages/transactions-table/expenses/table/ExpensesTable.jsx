﻿import React, {useState} from "react";
import ExpensesTableHeader from "./ExpensesTableHeader.jsx";
import ExpensesTableRow from "./ExpensesTableRow.jsx";

const ExpensesTable = ({ expenses, sortConfig, onSort, onDelete }) => {
    return (
        <table className="table">
            <thead>
            <ExpensesTableHeader sortConfig={sortConfig} onSort={onSort} />
            </thead>
            <tbody>
            {expenses.map((expense) => (
                <ExpensesTableRow
                    key={expense.id}
                    expense={expense}
                    onDelete={onDelete}
                />
            ))}
            </tbody>
        </table>
    );
};

export default ExpensesTable;

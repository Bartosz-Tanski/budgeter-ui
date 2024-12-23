import React, {useState} from "react";
import IncomesTableHeader from "./IncomesTableHeader.jsx";
import IncomesTableRow from "./IncomesTableRow.jsx";

const IncomesTable = ({ incomes, sortConfig, onSort, onDelete }) => {
    return (
        <table className="table">
            <thead>
            <IncomesTableHeader sortConfig={sortConfig} onSort={onSort} />
            </thead>
            <tbody>
            {incomes.map((income) => (
                <IncomesTableRow
                    key={income.id}
                    income={income}
                    onDelete={onDelete}
                />
            ))}
            </tbody>
        </table>
    );
};

export default IncomesTable;

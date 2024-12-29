import React, {useState} from "react";
import IncomesTableHeader from "./IncomesTableHeader.jsx";
import IncomesTableRow from "./IncomesTableRow.jsx";

const IncomesTable = ({ incomes, sortConfig, onSort }) => {
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
                />
            ))}
            </tbody>
        </table>
    );
};

export default IncomesTable;

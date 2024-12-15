﻿import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const AccountsTable = ({ accounts, onEdit, onDelete, onSort, sortConfig, onAccountClick }) => {
    return (
        <table className="accounts-table">
            <thead>
            <TableHeader onSort={onSort} sortConfig={sortConfig} />
            </thead>
            <tbody>
            {accounts.map((account) => (
                <TableRow
                    key={account.id}
                    account={account}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onClick={() => onAccountClick(account)}
                />
            ))}
            </tbody>
        </table>
    );
};

export default AccountsTable;


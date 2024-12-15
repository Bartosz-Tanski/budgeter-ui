import React from "react";

const TableRow = ({ account, onEdit, onDelete, onClick }) => {
    return (
        <tr onClick={onClick}>
            <td>{account.name}</td>
            <td>{account.balance}</td>
            <td>{account.currencyCode}</td>
            <td>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(account);
                    }}
                    className="edit-button"
                >
                    EDIT
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(account.id);
                    }}
                    className="delete-button"
                >
                    DELETE
                </button>
            </td>
        </tr>
    );
};

export default TableRow;

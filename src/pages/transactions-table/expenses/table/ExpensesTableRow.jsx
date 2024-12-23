import React from "react";

const ExpensesTableRow = ({ expense, onDelete }) => {
    const categoryName = expense.category ? expense.category.name : "No category";
    const formattedDate = new Date(expense.date).toLocaleString();

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(expense.id);
    };

    return (
        <tr>
            <td>{expense.title}</td>
            <td>{expense.amount}</td>
            <td>{formattedDate}</td>
            <td>{categoryName}</td>
            <td>{expense.description}</td>
            <td>
                <button onClick={handleDeleteClick} className="delete-button">
                    DELETE
                </button>
            </td>
        </tr>
    );
};

export default ExpensesTableRow;

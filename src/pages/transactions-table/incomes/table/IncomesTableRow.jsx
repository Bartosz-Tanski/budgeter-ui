import React from "react";

const IncomesTableRow = ({ income, onDelete }) => {
    const categoryName = income.category ? income.category.name : "No category";
    const formattedDate = new Date(income.date).toLocaleString();

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(income.id);
    };

    return (
        <tr>
            <td>{income.title}</td>
            <td>{income.amount}</td>
            <td>{formattedDate}</td>
            <td>{categoryName}</td>
            <td>{income.description}</td>
            <td>
                <button onClick={handleDeleteClick} className="delete-button">
                    DELETE
                </button>
            </td>
        </tr>
    );
};

export default IncomesTableRow;

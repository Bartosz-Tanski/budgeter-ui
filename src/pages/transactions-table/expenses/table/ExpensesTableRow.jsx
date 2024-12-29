import React from "react";

const ExpensesTableRow = ({ expense }) => {
    const categoryName = expense.category ? expense.category.name : "No category";
    const formattedDate = new Date(expense.date).toLocaleString();

    return (
        <tr>
            <td>{expense.title}</td>
            <td>{expense.amount}</td>
            <td>{formattedDate}</td>
            <td>{categoryName}</td>
            <td>{expense.description}</td>
        </tr>
    );
};

export default ExpensesTableRow;

import React from "react";

const IncomesTableRow = ({ income }) => {
    const categoryName = income.category ? income.category.name : "No category";
    const formattedDate = new Date(income.date).toLocaleString();

    return (
        <tr>
            <td>{income.title}</td>
            <td>{income.amount}</td>
            <td>{formattedDate}</td>
            <td>{categoryName}</td>
            <td>{income.description}</td>
        </tr>
    );
};

export default IncomesTableRow;

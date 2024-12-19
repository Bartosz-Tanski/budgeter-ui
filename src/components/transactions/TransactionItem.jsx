import React from "react";
import "../../styles/pages/account-overview.css";

const TransactionItem = ({ transaction, type, currencyCode }) => {
    const isIncome = type === "incomes";

    return (
        <div className={`overview-item ${isIncome ? "income" : "expense"}`}>
            <div className="transaction-item-header">
                <h4 className="transaction-item-title">{transaction.title}</h4>
                <span className={`transaction-amount ${isIncome ? "positive" : "negative"}`}>
                    {isIncome ? "+" : "-"}{transaction.amount.toLocaleString()} {currencyCode}
                </span>
            </div>
            <p className="transaction-date">
                {new Date(transaction.date).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                })}
            </p>
            {transaction.description && <p className="transaction-description">{transaction.description}</p>}
        </div>
    );
};

export default TransactionItem;

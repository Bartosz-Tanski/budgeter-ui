import React from "react";
import { Link } from "react-router-dom";

const TransactionSuccessMessage = ({ transactionType, accountId }) => {
    const isIncome = transactionType === "income";

    return (
        <div>
            <h1 className="base-header">
                {isIncome ? (
                    <>
                        <i className="fa-solid fa-arrow-trend-up"></i>
                        Income Created!
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-arrow-trend-down"></i>
                        Expense Created!
                    </>
                )}
            </h1>

            <p>
                Your {isIncome ? "income" : "expense"} has been created successfully.
            </p>

            <Link
                to={`/accounts/${accountId}/${isIncome ? "incomes" : "expenses"}`}
                className="redirection-link"
            >
                Go back to {isIncome ? "Incomes" : "Expenses"} list
            </Link>

            <br />

            <Link
                to={`/accounts/${accountId}/${isIncome ? "incomes" : "expenses"}/create`}
                className="redirection-link"
            >
                Create another {isIncome ? "Income" : "Expense"}
            </Link>
        </div>
    );
};

export default TransactionSuccessMessage;

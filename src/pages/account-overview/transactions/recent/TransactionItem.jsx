import React, {useEffect, useState} from "react";
import "../../../../styles/pages/account-overview.css";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext.jsx";
import {Link, useParams} from "react-router-dom";

const TransactionItem = ({ transaction, type, currencyCode }) => {
    const {accountId} = useParams();
    const [category, setCategory] = useState(null);
    const { token } = useAuth();

    const isIncome = type === "incomes";

    if (transaction.categoryId != null) {
        useEffect(() => {
            const fetchCategory = async () => {
                try {
                    const response = await axios.get(
                        `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/${transaction.categoryId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setCategory(response.data);
                } catch (error) {
                    console.error("Failed to fetch account details:", error);
                }
            };

            fetchCategory();
        }, [accountId, token]);
    }

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
            <div className="transaction-item-bottom">
                <span className="transaction-item-description"> {transaction?.description} </span>
                <span className="transaction-item-category"> <Link className="redirection-link"> {transaction.category?.name} </Link> </span>
            </div>
        </div>
    );
};

export default TransactionItem;

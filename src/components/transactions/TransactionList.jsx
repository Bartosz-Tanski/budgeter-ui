import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TransactionItem from "./TransactionItem";
import { useAuth } from "../../context/AuthContext.jsx";

const TransactionList = ({ accountId, type, currencyCode }) => {
    const [transactions, setTransactions] = useState([]);
    const [totalItems, setTotalItems] = useState(0); // Dodajemy stan dla totalItems
    const { token } = useAuth();
    const endpoint = `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/${type}`;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(endpoint, {
                    params: {
                        PageSize: 5,
                        PageNumber: 1,
                        SortBy: "Date",
                        SortOrder: 1,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTransactions(response.data.items);
                setTotalItems(response.data.totalItems);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, [accountId, type, token]);

    return (
        <>
            <h3 className="middle-section-header">
                {type === "incomes" ? "Recent Incomes" : "Recent Expenses"}
            </h3>
            {transactions.length === 0 ? (
                <p>No {type === "incomes" ? "incomes" : "expenses"} found.</p>
            ) : (
                <div className="transaction-items">
                    {transactions.map((transaction) => (
                        <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            type={type}
                            currencyCode={currencyCode}
                        />
                    ))}
                </div>
            )}

            {totalItems > 5 && (
                <div className="see-all-container">
                    <Link
                        to={`/accounts/${accountId}/${type}`}
                        className="redirection-link"
                    >
                        See All {type === "incomes" ? "Incomes" : "Expenses"}
                    </Link>
                </div>
            )}
        </>
    );
};

export default TransactionList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext.jsx";
import {generateDaysInMonth} from "../../../../common/helpers/dateHelper.js";
import TransactionsOverviewChart from "./TransactionsOverviewChart.jsx";


const MonthlySummary = ({ accountId, currencyCode }) => {
    const { token } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [summary, setSummary] = useState({
        totalIncomes: 0,
        totalExpenses: 0,
        balance: 0,
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
                const endDate = new Date().toISOString();

                const incomesResponse = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/incomes?StartDate=${startDate}&EndDate=${endDate}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const expensesResponse = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses?StartDate=${startDate}&EndDate=${endDate}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const incomes = incomesResponse.data.items.map((income) => ({
                    ...income,
                    type: "income",
                }));

                const expenses = expensesResponse.data.items.map((expense) => ({
                    ...expense,
                    type: "expense",
                }));

                setTransactions([...incomes, ...expenses]);

                // Calculate summary
                const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
                const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
                setSummary({
                    totalIncomes,
                    totalExpenses,
                    balance: totalIncomes - totalExpenses,
                });

                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth();
                setDaysInMonth(generateDaysInMonth(currentYear, currentMonth));
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };

        fetchTransactions();
    }, [accountId, token]);

    return (
        <div className="overview-section">
            <h3 className="middle-section-header">Monthly Summary</h3>

            <p>
                <span className="account-details-label">Total Incomes: </span>
                <span>{" " + summary.totalIncomes.toLocaleString()} {currencyCode} </span>
            </p>

            <p>
                <span className="account-details-label">Total Expenses: </span>
                <span>{" " + summary.totalExpenses.toLocaleString()} {currencyCode}</span>
            </p>

            <p>
                <span className="account-details-label">Balance: </span>
                <span>{" " + summary.balance.toLocaleString()} {currencyCode}</span>
            </p>

            <div className="overview-item">
                <TransactionsOverviewChart
                    daysInMonth={daysInMonth}
                    transactions={transactions}
                    currencyCode={currencyCode} />
            </div>
        </div>
    );
};

export default MonthlySummary;

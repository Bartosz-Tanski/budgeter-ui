﻿import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../../../context/AuthContext.jsx";
import {generateDaysInMonth} from "../../../../common/helpers/dateHelper.js";
import TransactionsOverviewChart from "./TransactionsOverviewChart.jsx";
import {getCurrentMonthRange} from "../../../../common/handlers/categoryHandlers.js";


const TransactionsOverview = ({accountId, currencyCode}) => {
    const {token} = useAuth();
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
                let { startDate, endDate } = getCurrentMonthRange();

                startDate = startDate.toISOString().split('T')[0];
                endDate = endDate.toISOString().split('T')[0];

                const incomesResponse = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/incomes/all?StartDate=${startDate}&EndDate=${endDate}`,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );

                const expensesResponse = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses/all?StartDate=${startDate}&EndDate=${endDate}`,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );

                const incomes = incomesResponse.data.map((income) => ({
                    ...income,
                    type: "income",
                }));

                const expenses = expensesResponse.data.map((expense) => ({
                    ...expense,
                    type: "expense",
                }));

                setTransactions([...incomes, ...expenses]);

                // Calculate overview
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
                console.error("Failed to fetch transactions-table:", error);
            }
        };

        fetchTransactions();
    }, [accountId, token]);

    return (
        <div className="overview-section">
            <h2 className="base-header">Transactions Overview</h2>

            <p>
                <span className="details-label">Total Incomes: </span>
                <span>{" " + summary.totalIncomes.toLocaleString()} {currencyCode} </span>
            </p>

            <p>
                <span className="details-label">Total Expenses: </span>
                <span>{" " + summary.totalExpenses.toLocaleString()} {currencyCode}</span>
            </p>

            <p>
                <span className="details-label">Balance: </span>
                <span>{" " + summary.balance.toLocaleString()} {currencyCode}</span>
            </p>

            <div className="overview-item">
                <div className="transaction-overview-chart">
                    <TransactionsOverviewChart
                        daysInMonth={daysInMonth}
                        transactions={transactions}
                        currencyCode={currencyCode}/>
                </div>
            </div>
        </div>
    );
};

export default TransactionsOverview;

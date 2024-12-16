import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext.jsx";
import MonthlySummaryChart from "./MonthlySummaryChart.jsx";

const MonthlySummary = ({ accountId, currencyCode }) => {
    const { token } = useAuth();
    const [summary, setSummary] = useState({
        totalIncomes: 0,
        totalExpenses: 0,
        balance: 0,
    });

    const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const currentMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const fetchMonthlySummary = async () => {
        try {
            const incomesResponse = await axios.get(
                `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/incomes/total-in-range`,
                {
                    params: {
                        StartDate: currentMonthStart.toISOString().split("T")[0],
                        EndDate: currentMonthEnd.toISOString().split("T")[0],
                    },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const expensesResponse = await axios.get(
                `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses/total-in-range`,
                {
                    params: {
                        StartDate: currentMonthStart.toISOString().split("T")[0],
                        EndDate: currentMonthEnd.toISOString().split("T")[0],
                    },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const incomes = parseFloat(incomesResponse.data) || 0;
            const expenses = parseFloat(expensesResponse.data) || 0;

            setSummary({
                totalIncomes: incomes,
                totalExpenses: expenses,
                balance: incomes - expenses,
            });
        } catch (error) {
            console.error("Error fetching monthly summary:", error);
        }
    };

    useEffect(() => {
        fetchMonthlySummary();
    }, [accountId, token]);

    return (
        <div className="monthly-summary-container">
            <h3 className="middle-section-header">Monthly Summary</h3>
            <ul>
                <li>
                    <strong>Total Incomes:</strong> {summary.totalIncomes.toFixed(2)} {currencyCode}
                </li>
                <li>
                    <strong>Total Expenses:</strong> {summary.totalExpenses.toFixed(2)} {currencyCode}
                </li>
                <li>
                    <strong>Monthly Balance:</strong> {summary.balance.toFixed(2)} {currencyCode}
                </li>
            </ul>
            <MonthlySummaryChart
                totalIncomes={summary.totalIncomes}
                totalExpenses={summary.totalExpenses}
                currencyCode={currencyCode}
            />
        </div>
    );
};

export default MonthlySummary;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext.jsx";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlySummary = ({ accountId, currencyCode }) => {
    const { token } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [summary, setSummary] = useState({
        totalIncomes: 0,
        totalExpenses: 0,
        balance: 0,
    });

    // Fetch transactions and generate days in month
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

                // Generate days for current month
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth();
                setDaysInMonth(generateDaysInMonth(currentYear, currentMonth));
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };

        fetchTransactions();
    }, [accountId, token]);

    // Helper function to generate days in the current month
    const generateDaysInMonth = (year, month) => {
        const days = [];
        const date = new Date(year, month, 1);
        while (date.getMonth() === month) {
            days.push(new Date(date).toISOString().split("T")[0]); // YYYY-MM-DD
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    // Group transactions by date
    const groupTransactionsByDate = (transactions) => {
        return transactions.reduce((acc, transaction) => {
            const date = transaction.date.split("T")[0]; // YYYY-MM-DD
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {});
    };

    const groupedTransactions = groupTransactionsByDate(transactions);

    // Prepare data for incomes and expenses
    const incomesData = daysInMonth.map((day) => {
        const transactionsForDay = groupedTransactions[day]?.filter((t) => t.type === "income") || [];
        return transactionsForDay.reduce((sum, t) => sum + t.amount, 0);
    });

    const expensesData = daysInMonth.map((day) => {
        const transactionsForDay = groupedTransactions[day]?.filter((t) => t.type === "expense") || [];
        return transactionsForDay.reduce((sum, t) => sum + t.amount, 0);
    });

    // Remove dots for days with no transactions
    const incomesPointRadius = incomesData.map((value) => (value === 0 ? 0 : 5));
    const expensesPointRadius = expensesData.map((value) => (value === 0 ? 0 : 5));

    const chartData = {
        labels: daysInMonth,
        datasets: [
            {
                label: "Incomes",
                data: incomesData,
                borderColor: "rgba(45,108,42, 1)",
                backgroundColor: "rgba(45,108,42, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: incomesPointRadius, // Dynamic point radius
            },
            {
                label: "Expenses",
                data: expensesData,
                borderColor: "rgba(255,77,79, 1)",
                backgroundColor: "rgba(255, 77, 79, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: expensesPointRadius, // Dynamic point radius
            },
        ],
    };

    const maxIncome = Math.max(...incomesData);
    const maxExpense = Math.max(...expensesData);
    const maxYValue = Math.max(maxIncome, maxExpense) + 5000;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const dayIndex = context.dataIndex;
                        const totalIncomes = incomesData[dayIndex];
                        const totalExpenses = expensesData[dayIndex];

                        if (context.dataset.label === "Incomes") {
                            return `Incomes: ${totalIncomes.toLocaleString()} ${currencyCode}`;
                        } else if (context.dataset.label === "Expenses") {
                            return `Expenses: ${totalExpenses.toLocaleString()} ${currencyCode}`;
                        }
                        return "";
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                beginAtZero: true,
                suggestedMax: maxYValue,
                title: {
                    display: true,
                    text: `Amount (${currencyCode})`,
                },
            },
        },
    };

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
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default MonthlySummary;

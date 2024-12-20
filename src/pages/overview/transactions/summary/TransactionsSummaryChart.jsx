import {Line} from "react-chartjs-2";
import React from "react";
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
import {groupTransactionsByDate} from "../../../../common/helpers/transactionsHelper.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TransactionsSummaryChart = ({ daysInMonth, transactions, currencyCode }) => {
    const groupedTransactions = groupTransactionsByDate(transactions);

    const incomesData = daysInMonth.map((day) => {
        const transactionsForDay = groupedTransactions[day]?.filter((t) => t.type === "income") || [];
        return transactionsForDay.reduce((sum, t) => sum + t.amount, 0);
    });
    const expensesData = daysInMonth.map((day) => {
        const transactionsForDay = groupedTransactions[day]?.filter((t) => t.type === "expense") || [];
        return transactionsForDay.reduce((sum, t) => sum + t.amount, 0);
    });

    const incomesPointRadius = incomesData.map((value) => (value === 0 ? 0 : 5));
    const expensesPointRadius = expensesData.map((value) => (value === 0 ? 0 : 5));

    const maxIncome = Math.max(...incomesData);
    const maxExpense = Math.max(...expensesData);
    const maxYValue = Math.max(maxIncome, maxExpense) + 5000;

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

    return (<Line data={chartData} options={chartOptions} />)
}

export default TransactionsSummaryChart;
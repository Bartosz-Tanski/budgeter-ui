import React from "react";
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoriesOverviewChart = ({categoryStats, currencyCode}) => {
    const allLabels = Array.from(
        new Set(categoryStats.map((item) => item.categoryName))
    );
    const expensesData = allLabels.map((label) => {
        const expenseItem = categoryStats.find(
            (item) => item.type === "Expense" && item.categoryName === label
        );
        return expenseItem ? expenseItem.totalAmount : 0;
    });

    const incomesData = allLabels.map((label) => {
        const incomeItem = categoryStats.find(
            (item) => item.type === "Income" && item.categoryName === label
        );
        return incomeItem ? incomeItem.totalAmount : 0;
    });

    const chartData = {
        labels: allLabels,
        datasets: [
            {
                label: "Expenses",
                data: expensesData,
                borderColor: "rgba(255, 77, 79, 1)",
                backgroundColor: "rgba(255, 77, 79, 0.6)",
                hoverBackgroundColor: "rgba(255, 77, 79, 1)",
                borderWidth: 1,
            },
            {
                label: "Incomes",
                data: incomesData,
                borderColor: "rgba(45, 108, 42, 1)",
                backgroundColor: "rgba(45, 108, 42, 0.6)",
                hoverBackgroundColor: "rgba(45, 108, 42, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 1,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        return `${context.dataset.label}: ${value.toLocaleString()} PLN`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Categories",
                },
                grid: {
                    display: false,
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: `Amount (${currencyCode})`,
                },
                grid: {
                    color: "rgba(200, 200, 200, 0.2)",
                },
            },
        },
        layout: {
            padding: {
                top: 20,
                bottom: 20,
            },
        },
        categoryPercentage: 0.8,
        barPercentage: 0.9,
    };

    return (
        <Bar data={chartData} options={chartOptions} />
    );
};

export default CategoriesOverviewChart;

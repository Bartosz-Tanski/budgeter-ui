import React from "react";
import {Bar} from "react-chartjs-2";
import {Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlySummaryChart = ({totalIncomes, totalExpenses, currencyCode}) => {
    const data = {
        labels: ["Incomes", "Expenses"],
        datasets: [
            {
                label: "Monthly Transactions",
                data: [totalIncomes, totalExpenses],
                backgroundColor: [
                    "rgba(76, 175, 80, 0.5)",
                    "rgba(244, 67, 54, 0.5)",
                ],
                borderColor: ["rgba(76, 175, 80, 1)", "rgba(244, 67, 54, 1)"],
                borderWidth: 1,
                borderRadius: 8,
                barPercentage: 0.5,
                hoverBackgroundColor: ["rgba(76, 175, 80, 1)", "rgba(244, 67, 54, 1)"],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} ${currencyCode}`;
                    },
                },
                backgroundColor: "#333",
                titleColor: "#fff",
                bodyColor: "#ddd",
                borderColor: "#555",
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#ddd",
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#ddd",
                    font: {
                        size: 14,
                    },
                    callback: function (value) {
                        return value + " " + currencyCode;
                    },
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
            },
        },
        animation: {
            duration: 1000,
            easing: "easeOut",
        },
    };

    return (
        <div className="monthly-summary-chart">
            <Bar data={data} options={options}/>
        </div>
    );
};

export default MonthlySummaryChart;

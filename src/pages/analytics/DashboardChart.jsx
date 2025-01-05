import React from "react";
import {Bar, Line} from "react-chartjs-2";

const DashboardChart = ({ chartData, currencyCode }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 1,
        plugins: {
            title: {
                display: true,
                text: "Daily Incomes & Expenses",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 1000,
                title: { display: true, text: `Amount (${currencyCode})` },
            },
        },
    };

    return (
        <div style={{ height: "400px", width: "100%" }}>
            <Line data={chartData} options={options} />
        </div>);
};

export default DashboardChart;

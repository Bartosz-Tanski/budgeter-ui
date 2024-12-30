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

const ExpensesBarChart = ({expensesData, expandedCategory, currencyCode}) => {
    if (!Array.isArray(expensesData) || expensesData.length === 0) {
        return <p>No data available for expenses bar chart</p>;
    }

    const labels = expensesData.map((item) => item.categoryName);
    const dataValues = expensesData.map((item) => item.totalAmount);

    const data = {
        labels,
        datasets: [
            {
                label: "Expenses by Category",
                data: dataValues,
                barThickness: 40,
                backgroundColor: labels.map((label) =>
                    label === expandedCategory ? "rgb(180,27,27)" : "rgba(180,27,27, 0.2)"
                ),
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 1,
        plugins: {
            legend: {position: false},
            title: {
                display: true,
                text: "Expenses",
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Expense: ${context.formattedValue} ${currencyCode}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {display: true, text: `Amount (${currencyCode})`},
            },
            x: {
                title: {display: true, text: "Category"},
            },
        },
    };

    return (
        <Bar key={expandedCategory} data={data} options={options}/>
    );
};

export default ExpensesBarChart;

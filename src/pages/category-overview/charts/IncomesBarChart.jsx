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

const IncomesBarChart = ({incomesData, expandedCategory, currencyCode}) => {
    if (!Array.isArray(incomesData) || incomesData.length === 0) {
        return <p>No data available for incomes bar chart</p>;
    }


    const labels = incomesData.map((item) => item.categoryName);
    const dataValues = incomesData.map((item) => item.totalAmount);

    const data = {
        labels,
        datasets: [
            {
                label: "Incomes by Category",
                data: dataValues,
                barThickness: 40,
                backgroundColor: labels.map((label) =>
                    label === expandedCategory ? "rgba(97,143,67,1)" : "rgba(97,143,67,0.2)"
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
                text: "Incomes",
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Income: ${context.formattedValue} ${currencyCode}`;
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
        <Bar data={data} options={options}/>
    );
};

export default IncomesBarChart;


import React from "react";
import {Pie} from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesPieChart = ({expensesData, expandedCategory, currencyCode, startDate, endDate}) => {
    if (!Array.isArray(expensesData) || expensesData.length === 0) {
        return <p>{`No data available for expenses pie chart for date: ${startDate} - ${endDate}`}</p>;
    }

    function generateNumber() {
        return Math.floor(Math.random() * 256);
    }

    function generateRandomColor(alpha = 0.2) {
        return `rgba(${generateNumber()}, ${generateNumber()}, ${generateNumber()}, ${alpha})`;
    }

    const labels = expensesData.map((item) => item.categoryName);
    const dataValues = expensesData.map((item) => item.totalAmount);
    const backgroundColors = labels.map(() => generateRandomColor());

    const data = {
        labels,
        datasets: [
            {
                label: "Expenses by Category",
                data: dataValues,
                backgroundColor: labels.map((label, index) =>
                    label === expandedCategory
                        ? "rgb(143,49,49)"
                        : backgroundColors[index]
                ),
                hoverBackgroundColor: labels.map((label, index) =>
                    label === expandedCategory
                        ? "rgb(203,33,33)"
                        : backgroundColors[index].replace(/0.2\)$/, "0.3)")
                ),
                borderColor: "#fff",
                borderWidth: 2,
                offset: (ctx) => {
                    const index = ctx.dataIndex;
                    const cat = labels[index];
                    if (cat === expandedCategory) {
                        return 40;
                    }
                    return 0;
                },
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 1,
        plugins: {
            title: {
                display: true,
                text: `Expenses (${startDate} - ${endDate})`,
            },
            legend: {position: "top"},
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const cat = labels[context.dataIndex];
                        const val = dataValues[context.dataIndex];
                        return `Category: ${cat}, Amount: ${val} ${currencyCode}`;
                    },
                },
            },
        },
    };

    return (
        <Pie data={data} options={options}/>
    );
};

export default ExpensesPieChart;

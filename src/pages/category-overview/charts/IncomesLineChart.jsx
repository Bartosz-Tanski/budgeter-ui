import React from "react";
import {Line} from "react-chartjs-2";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const IncomesLineChart = ({incomesData, expandedCategory, currencyCode}) => {
    const now = new Date();
    const currentYear = now.getFullYear();

    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthlySums = Array(12).fill(0);

    incomesData.forEach((item) => {
        if (item.categoryName !== expandedCategory) return;
        if (!item.date) return;

        const d = new Date(item.date);
        const y = d.getFullYear();
        const m = d.getMonth();

        if (y === currentYear) {
            monthlySums[m] += item.amount ?? 0;
        }
    });

    const data = {
        labels: monthLabels,
        datasets: [
            {
                label: `Incomes in ${currentYear}`,
                data: monthlySums,
                borderColor: "rgba(97,143,67,1)",
                backgroundColor: "rgba(97,143,67,0.2)",
                tension: 0.3,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 1,
        plugins: {
            legend: {position: "top", onClick: null},
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
                suggestedMax: 1000,
                title: {display: true, text: `Amount (${currencyCode})`},
            },
            x: {
                title: {display: true, text: `Month of ${currentYear}`},
            },
        },
    };

    return (
        <Line data={data} options={options}/>
    );
};

export default IncomesLineChart;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
import { useAuth } from "../../../context/AuthContext.jsx";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

// TODO: Consider moving theses analytics to separate page


const ChartsSection = ({ accountId, currencyCode }) => {
    const { token } = useAuth();
    const [categoryData, setCategoryData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [dailyTrend, setDailyTrend] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);

                const now = new Date();
                const currentYear = now.getFullYear();
                const currentMonth = now.getMonth() + 1;
                const startDate = `${currentYear}-${String(currentMonth).padStart(2, "0")}-01`;
                const endDate = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${new Date(
                    currentYear,
                    currentMonth,
                    0
                ).getDate()}`;

                const response = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses/all`,
                    {
                        params: { startDate, endDate },
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const data = response.data;

                const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
                const transactionsByDay = Array(daysInMonth).fill(0);

                data.forEach((transaction) => {
                    const transactionDate = new Date(transaction.date).getDate();
                    transactionsByDay[transactionDate - 1] += transaction.amount;
                });

                setDailyTrend(transactionsByDay);

                const categories = data.reduce((acc, transaction) => {
                    const categoryName = transaction.category?.name || "No category";
                    acc[categoryName] = (acc[categoryName] || 0) + transaction.amount;
                    return acc;
                }, {});
                setCategoryData(categories);

                const monthlyTotals = Array.from({ length: 12 }, (_, i) => {
                    const monthlyTransactions = data.filter((transaction) => {
                        const transactionDate = new Date(transaction.date);
                        return transactionDate.getMonth() + 1 === i + 1 && transactionDate.getFullYear() === currentYear;
                    });
                    return monthlyTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
                });
                setMonthlyData(monthlyTotals);
            } catch (err) {
                console.error("Error fetching chart data:", err);
                setError("Failed to load chart data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [accountId, token]);

    if (loading) return <h3>Loading charts...</h3>;
    if (error) return <p>{error}</p>;

    const tooltipOptions = {
        callbacks: {
            label: (context) => {
                const label = context.dataset.label || '';
                const value = context.raw || 0;
                return `${label}: ${value.toLocaleString()} ${currencyCode}`;
            },
        },
        backgroundColor: '#000',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        borderColor: '#fff',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
    };

    // Dane dla wykresu kołowego
    const pieData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3", "#9c27b0"],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 1,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || "Unknown";
                        const value = context.raw || 0;
                        return `${label}: ${value.toLocaleString()} ${currencyCode}`;
                    },
                },
                backgroundColor: "#1f1f1f",
                titleFont: { size: 14 },
                bodyFont: { size: 14 },
                padding: 10,
                borderWidth: 1,
                borderColor: "#fff",
            },
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#fff",
                    font: { size: 12 },
                },
            },
        },
    };

    // Dane dla wykresu słupkowego
    const barData = {
        labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "long" })),
        datasets: [
            {
                label: "Monthly Expenses",
                data: monthlyData,
                backgroundColor: "#2196f3",
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 1,
        plugins: {
            tooltip: tooltipOptions,
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value.toLocaleString()} ${currencyCode}`,
                },
            },
        },
    };

    // Dane dla wykresu liniowego
    const lineData = {
        labels: Array.from({ length: dailyTrend.length }, (_, i) => {
            const date = new Date();
            date.setDate(i + 1);
            return `${String(i + 1).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}`;
        }),
        datasets: [
            {
                label: "Daily Expenses",
                data: dailyTrend,
                borderColor: "#f44336",
                tension: 0.2,
                fill: false,
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#f44336",
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHitRadius: 100,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 1,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const date = new Date();
                        date.setDate(context.dataIndex + 1);
                        const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
                        const value = context.raw || 0;
                        return `${weekday}: ${value.toLocaleString()} ${currencyCode}`;
                    },
                },
                backgroundColor: "#1f1f1f",
                titleFont: { size: 14 },
                bodyFont: { size: 14 },
                padding: 10,
                borderWidth: 1,
                borderColor: "#fff",
            },
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#fff",
                    font: { size: 12 },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#fff",
                    callback: (value, index) => lineData.labels[index], // Wyświetlanie "01.12", "02.12", ...
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value.toLocaleString()} ${currencyCode}`,
                },
            },
        },
    };

    return (
        <div className="charts-section">
            <h2 className="base-header">Analytics</h2>
            <div className="chart-container">
                <div className="chart">
                    <h3>Expenses by Category</h3>
                    <Pie data={pieData} options={pieOptions} />
                </div>
                <div className="chart">
                    <h3>Monthly Expenses</h3>
                    <Bar data={barData} options={barOptions} />
                </div>
                <div className="chart">
                    <h3>Daily Expense Trends</h3>
                    <Line data={lineData} options={lineOptions} />
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;

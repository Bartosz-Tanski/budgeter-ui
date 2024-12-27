import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
import { useAuth } from "../../../context/AuthContext.jsx";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const ChartsSection = ({ accountId }) => {
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

                const categoryResponse = await axios.get(
                    // `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses/all`,
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const categories = categoryResponse.data.items.reduce((acc, transaction) => {
                    const categoryName = transaction.category.name;
                    acc[categoryName] = (acc[categoryName] || 0) + transaction.amount;
                    return acc;
                }, {});

                setCategoryData(categories);

                const year = new Date().getFullYear();
                const monthlyResponse = await Promise.all(
                    Array.from({ length: 12 }, (_, i) => {
                        const startDate = `${year}-${String(i + 1).padStart(2, "0")}-01`;
                        const endDate = `${year}-${String(i + 1).padStart(2, "0")}-${new Date(year, i + 1, 0).getDate()}`;
                        return axios.get(
                            `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses/total-in-range`,
                            {
                                params: { StartDate: startDate, EndDate: endDate },
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        );
                    })
                );

                setMonthlyData(monthlyResponse.map((res) => res.data));

                const now = new Date();
                const currentMonth = now.getMonth() + 1;
                const currentYear = now.getFullYear();
                const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

                const dailyResponse = await Promise.all(
                    Array.from({ length: daysInMonth }, (_, i) => {
                        const date = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
                        return axios.get(
                            `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses/total-in-range`,
                            {
                                params: { StartDate: date, EndDate: date },
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        );
                    })
                );

                setDailyTrend(dailyResponse.map((res) => res.data));
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

    const pieData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3", "#9c27b0"],
            },
        ],
    };

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

    const lineData = {
        labels: Array.from({ length: dailyTrend.length }, (_, i) => i + 1),
        datasets: [
            {
                label: "Daily Expenses",
                data: dailyTrend,
                borderColor: "#f44336",
                tension: 0.2,
            },
        ],
    };

    return (
        <div className="charts-section">
            <h2>Analytics</h2>
            <div className="chart-container">
                <div className="chart">
                    <h3>Expenses by Category</h3>
                    <Pie data={pieData} />
                </div>
                <div className="chart">
                    <h3>Monthly Expenses</h3>
                    <Bar data={barData} />
                </div>
                <div className="chart">
                    <h3>Daily Expense Trends</h3>
                    <Line data={lineData} />
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;

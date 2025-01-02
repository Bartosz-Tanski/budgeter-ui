import { useState, useCallback } from "react";

export const useAnalyticsData = () => {
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [limitAmount, setLimitAmount] = useState(null);
    const [topCategory, setTopCategory] = useState(null);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const safeFetchJson = async (url, token) => {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 204) {
            return [];
        }
        if (!response.ok) {
            throw new Error(`Fetch error ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    };
    const fetchAnalyticsData = useCallback(async (accountId, start, end, currencyCode) => {
        try {
            const token = localStorage.getItem("accessToken");

            const incomesData = await safeFetchJson(
                `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/incomes/all?StartDate=${start}&EndDate=${end}`,
                token
            );

            const expensesData = await safeFetchJson(
                `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses/all?StartDate=${start}&EndDate=${end}`,
                token
            );

            const limitData = await safeFetchJson(
                `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/limit`,
                token
            );

            const categoryStats = await safeFetchJson(
                `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/stats?TransactionType=expense&StartDate=${start}&EndDate=${end}`,
                token
            );

            const totalInc = Array.isArray(incomesData)
                ? incomesData.reduce((sum, inc) => sum + (inc.amount || 0), 0)
                : 0;
            const totalExp = Array.isArray(expensesData)
                ? expensesData.reduce((sum, exp) => sum + (exp.amount || 0), 0)
                : 0;

            setTotalIncomes(totalInc);
            setTotalExpenses(totalExp);

            if (limitData && typeof limitData.amount === "number") {
                setLimitAmount(limitData.amount);
            } else {
                setLimitAmount(null);
            }

            if (Array.isArray(categoryStats) && categoryStats.length > 0) {
                const sorted = [...categoryStats].sort((a, b) => b.totalAmount - a.totalAmount);
                setTopCategory(sorted[0]);
            } else {
                setTopCategory(null);
            }

            const groupedData = {};
            if (Array.isArray(incomesData)) {
                incomesData.forEach((inc) => {
                    const dateKey = inc.date.split("T")[0];
                    if (!groupedData[dateKey]) {
                        groupedData[dateKey] = { incomes: 0, expenses: 0 };
                    }
                    groupedData[dateKey].incomes += inc.amount;
                });
            }
            if (Array.isArray(expensesData)) {
                expensesData.forEach((exp) => {
                    const dateKey = exp.date.split("T")[0];
                    if (!groupedData[dateKey]) {
                        groupedData[dateKey] = groupedData[dateKey] || { incomes: 0, expenses: 0 };
                    }
                    groupedData[dateKey].expenses += exp.amount;
                });
            }

            const allDates = Object.keys(groupedData).sort();
            setChartData({
                labels: allDates,
                datasets: [
                    {
                        borderColor: "rgba(97,143,67,1)",
                        backgroundColor: "rgba(97,143,67,0.2)",
                        tension: 0.3,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        label: `Incomes (${currencyCode})`,
                        data: allDates.map((d) => groupedData[d].incomes),
                    },
                    {
                        borderColor: "rgb(180,27,27)",
                        backgroundColor: "rgba(180,27,27, 0.2)",
                        tension: 0.3,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        label: `Expenses (${currencyCode})`,
                        data: allDates.map((d) => groupedData[d].expenses),
                    },
                ],
            });
        } catch (error) {
            console.error("Error in fetchAnalyticsData:", error);
        }
    }, []);

    return {
        totalIncomes,
        totalExpenses,
        limitAmount,
        topCategory,
        chartData,
        fetchAnalyticsData,
    };
};

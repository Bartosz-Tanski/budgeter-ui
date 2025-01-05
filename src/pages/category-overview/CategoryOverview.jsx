import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {
    fetchAllCategoriesStats,
    fetchCategoryDetails, fetchCategoryExpenses,
    fetchCategoryIncomes, getCurrentMonthRange
} from "../../common/handlers/categoryHandlers.js";
import {fetchCurrencyByAccountId} from "../../common/helpers/currenciesHelper.js";

import CategoryInformation from "./CategoryInformation.jsx";
import PieCharts from "./PieCharts.jsx";
import LineCharts from "./LineCharts.jsx";

function getCurrentYearRange() {
    const now = new Date();
    const year = now.getFullYear();
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    return { startDate, endDate };
}

const CategoryOverview = () => {
    const {accountId, categoryId} = useParams();
    const {token} = useAuth();

    const [currencyCode, setCurrencyCode] = useState("");
    const [categoryName, setCategoryName] = useState(null);
    const [incomeStats, setIncomeStats] = useState(null);
    const [expenseStats, setExpenseStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [allCategoriesStats, setAllCategoriesStats] = useState([]);
    const [statsLoading, setStatsLoading] = useState(true);

    const [incomesTransactions, setIncomesTransactions] = useState([]);
    const [incomesLoading, setIncomesLoading] = useState(true);
    const [incomesError, setIncomesError] = useState(null);

    const [expensesTransactions, setExpensesTransactions] = useState([]);
    const [expensesLoading, setExpensesLoading] = useState(true);
    const [expensesError, setExpensesError] = useState(null);

    let { startDate, endDate } = getCurrentMonthRange();

    startDate = startDate.toISOString().split('T')[0];
    endDate = endDate.toISOString().split('T')[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    categoryName,
                    incomeStats,
                    expenseStats,
                } = await fetchCategoryDetails(accountId, categoryId, token);

                setCategoryName(categoryName);
                setIncomeStats(incomeStats);
                setExpenseStats(expenseStats);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [accountId, categoryId, token]);

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const currency = await fetchCurrencyByAccountId(accountId, token);
                setCurrencyCode(currency);
            } catch (err) {
                console.error("Failed to fetch currency:", err);
            }
        };
        fetchCurrency();
    }, [accountId, token]);

    useEffect(() => {
        const loadAllStats = async () => {
            // TODO: Display chart for current month

            setStatsLoading(true);
            try {
                const data = await fetchAllCategoriesStats(accountId, token, startDate, endDate);
                setAllCategoriesStats(data);
            } catch (err) {
                console.error("Failed to fetch all categories stats:", err);
            } finally {
                setStatsLoading(false);
            }
        };
        loadAllStats();
    }, [accountId, token]);

    useEffect(() => {
        if (!categoryName) return;

        const loadIncomes = async () => {
            setIncomesLoading(true);
            try {
                const { startDate, endDate } = getCurrentYearRange();
                const data = await fetchCategoryIncomes(
                    accountId,
                    token,
                    startDate,
                    endDate,
                    categoryName
                );
                const mapped = data.map(item => ({
                    amount: item.amount,
                    date: item.date,
                    categoryName: item.category?.name
                }));
                setIncomesTransactions(mapped);
            } catch (err) {
                setIncomesError(err.message);
            } finally {
                setIncomesLoading(false);
            }
        };
        loadIncomes();
    }, [accountId, token, categoryName]);

    useEffect(() => {
        if (!categoryName) return;

        const loadExpenses = async () => {
            setExpensesLoading(true);
            try {
                const { startDate, endDate } = getCurrentYearRange();
                const data = await fetchCategoryExpenses(
                    accountId,
                    token,
                    startDate,
                    endDate,
                    categoryName
                );
                const mapped = data.map(item => ({
                    amount: item.amount,
                    date: item.date,
                    categoryName: item.category?.name
                }));
                setExpensesTransactions(mapped);
            } catch (err) {
                setExpensesError(err.message);
            } finally {
                setExpensesLoading(false);
            }
        };
        loadExpenses();
    }, [accountId, token, categoryName]);

    const allIncomesStats = allCategoriesStats.filter((c) => c.type === "Income");
    const allExpensesStats = allCategoriesStats.filter((c) => c.type === "Expense");

    if (loading) {
        return <div>Loading category details...</div>;
    }
    if (error) {
        return <div style={{ color: "red" }}>Error: {error}</div>;
    }

    return (
        <div className="details-container">
            <CategoryInformation
                accountId={accountId}
                incomeStats={incomeStats}
                expenseStats={expenseStats}
                currencyCode={currencyCode}
                categoryName={categoryName}
            />

            {statsLoading ? (
                <div>Loading all categories stats...</div>
            ) : (
                <>
                    <PieCharts
                        allIncomesStats={allIncomesStats}
                        allExpensesStats={allExpensesStats}
                        categoryName={categoryName}
                        currencyCode={currencyCode}
                        startDate={startDate}
                        endDate={endDate}
                    />

                    {incomesLoading || expensesLoading ? (
                        <p>Loading transactions for chart...</p>
                    ) : incomesError ? (
                        <p style={{ color: "red" }}>Error: {incomesError}</p>
                    ) : expensesError ? (
                        <p style={{ color: "red" }}>Error: {expensesError}</p>
                    ) : (
                        <LineCharts
                            allIncomesStats={allIncomesStats}
                            allExpensesStats={allExpensesStats}
                            categoryName={categoryName}
                            currencyCode={currencyCode}
                            incomesTransactions={incomesTransactions}
                            expensesTransactions={expensesTransactions}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default CategoryOverview;

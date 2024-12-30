import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import CategoryDetails from "./CategoryDetails.jsx";
import {fetchAllCategoriesStats, fetchCategoryDetails} from "../../common/handlers/categoryHandlers.js";
import {fetchCurrencyByAccountId} from "../../common/helpers/currenciesHelper.js";

import IncomesPieChart from "./charts/IncomesPieChart.jsx";
import ExpensesPieChart from "./charts/ExpensesPieChart.jsx";
import IncomesBarChart from "./charts/IncomesBarChart.jsx";
import ExpensesBarChart from "./charts/ExpensesBarChart.jsx";
import CategoryInformation from "./CategoryInformation.jsx";
import PieCharts from "./PieCharts.jsx";
import BarCharts from "./BarCharts.jsx";

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
            setStatsLoading(true);
            try {
                const data = await fetchAllCategoriesStats(accountId, token);
                setAllCategoriesStats(data);
            } catch (err) {
                console.error("Failed to fetch all categories stats:", err);
            } finally {
                setStatsLoading(false);
            }
        };

        loadAllStats();
    }, [accountId, token]);

    const allIncomesStats = allCategoriesStats.filter((c) => c.type === "Income");
    const allExpensesStats = allCategoriesStats.filter((c) => c.type === "Expense");

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
                    />
                    <BarCharts
                        allIncomesStats={allIncomesStats}
                        allExpensesStats={allExpensesStats}
                        categoryName={categoryName}
                        currencyCode={currencyCode}
                    />
                </>
            )}
        </div>
    );
};

export default CategoryOverview;

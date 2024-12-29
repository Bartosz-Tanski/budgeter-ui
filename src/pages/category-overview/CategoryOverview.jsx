import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import CategoryDetails from "./CategoryDetails.jsx";
import {fetchCategoryDetails} from "../../common/handlers/categoryHandlers.js";
import {fetchCurrencyByAccountId} from "../../common/helpers/currenciesHelper.js";

const CategoryOverview = () => {
    const { accountId, categoryId } = useParams();
    const { token } = useAuth();

    const [currencyCode, setCurrencyCode] = useState("");
    const [categoryName, setCategoryName] = useState(null);
    const [incomeStats, setIncomeStats] = useState(null);
    const [expenseStats, setExpenseStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="details-container">
            <div className="upper-section-container">
                <Link to={`/accounts/${accountId}/categories`} className="redirection-link">
                    <i className="fa-solid fa-chevron-left"></i>
                    Categories list
                </Link>
                <h1 className="base-header">
                    <i className="fa-solid fa-chart-pie"></i>
                    <span className="category-name-label">{`${categoryName} `}</span>
                    Category
                    Overview:
                </h1>

                <CategoryDetails incomeStats={incomeStats} expenseStats={expenseStats} currencyCode={currencyCode} />
            </div>
        </div>
    );
};

export default CategoryOverview;

import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {
    getFirstDayOfThisMonth,
    getLastDayOfThisMonth,
} from "../../common/helpers/dateHelper";

import {useAnalyticsData} from "./../../common/hooks/useAnalyticsData.js";
import DashboardDateRange from "./DashboardDateRange";
import DashboardTiles from "./DashboardTiles";
import DashboardChart from "./DashboardChart";
import {fetchCurrencyByAccountId} from "../../common/helpers/currenciesHelper.js";
import {useAuth} from "../../context/AuthContext.jsx";

const AnalyticsDashboard = () => {
    const {accountId} = useParams();
    const {token} = useAuth();

    const [dateRangeOption, setDateRangeOption] = useState("thisMonth");
    const [startDate, setStartDate] = useState(getFirstDayOfThisMonth());
    const [endDate, setEndDate] = useState(getLastDayOfThisMonth());
    const [currencyCode, setCurrencyCode] = useState("");

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const currency = await fetchCurrencyByAccountId(accountId, token);
                setCurrencyCode(currency);
                console.log(currency);
            } catch (err) {
                console.error("Failed to fetch currency:", err);
            }
        };
        fetchCurrency();
    }, [accountId, token]);

    const {
        totalIncomes,
        totalExpenses,
        limitAmount,
        topCategory,
        chartData,
        fetchAnalyticsData,
    } = useAnalyticsData();

    useEffect(() => {
        const start = startDate.toISOString().split("T")[0];
        const end = endDate.toISOString().split("T")[0];
        fetchAnalyticsData(accountId, start, end, currencyCode);
    }, [accountId, dateRangeOption, startDate, endDate, fetchAnalyticsData, currencyCode]);

    return (
        <div className="details-container">
            <div className="details-section">
                <Link to={`/accounts/${accountId}`} className="redirection-link">
                    <i className="fa-solid fa-chevron-left"></i>
                    Account overview
                </Link>
                <h1 className="base-header">ACCOUNT ANALYTICS</h1>
            </div>

            <DashboardDateRange
                dateRangeOption={dateRangeOption}
                setDateRangeOption={setDateRangeOption}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />

            <div className="middle-section-container">
                <div className="tiles-section">
                    <DashboardTiles
                        dateRangeOption={dateRangeOption}
                        totalIncomes={totalIncomes}
                        totalExpenses={totalExpenses}
                        limitAmount={limitAmount}
                        topCategory={topCategory}
                        currencyCode={currencyCode}
                    />
                </div>

                <div className="dashboard-chart">
                    <DashboardChart chartData={chartData}
                                    year={endDate.getFullYear()}
                                    month={String(endDate.getMonth() + 1).padStart(2, "0")}
                                    currencyCode={currencyCode}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;

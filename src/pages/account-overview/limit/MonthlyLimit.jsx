import React, {useState, useEffect} from "react";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import "../../../styles/pages/account-overview.css";
import {useAuth} from "../../../context/AuthContext.jsx";
import LimitOverviewProgressbar from "./LimitOverviewProgressbar.jsx";
import LimitInformation from "./LimitInformation.jsx";
import {Link} from "react-router-dom";

const MonthlyLimit = ({accountId, currencyCode}) => {
    const {token} = useAuth();
    const [limit, setLimit] = useState(null);
    const [spent, setSpent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLimitData = async () => {
            try {
                setLoading(true);

                // Fetch the spending limit-overview
                const limitResponse = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/limit`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const limitAmount = limitResponse.data.amount;
                setLimit(limitAmount || null);

                // Fetch spent amount for the current month
                const now = new Date();
                const startDate = `${now.getFullYear()}-${now.getMonth() + 1}-01`;
                const endDate = `${now.getFullYear()}-${now.getMonth() + 1}-${new Date(
                    now.getFullYear(),
                    now.getMonth() + 1,
                    0
                ).getDate()}`;
                const expensesResponse = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses/total-in-range`,
                    {
                        params: {
                            StartDate: startDate,
                            EndDate: endDate,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setSpent(parseFloat(expensesResponse.data.toFixed(2)));
            } catch (err) {
                console.error(err);
                setError("Error fetching limit-overview or spending data.");
            } finally {
                setLoading(false);
            }
        };

        fetchLimitData();
    }, [accountId, token]);

    if (loading) {
        return (
            <div>
                <h3 className="base-header">Loading Limit...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h3 className="base-header">Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    const remaining = limit - spent;
    const percentage = Math.min((spent / limit) * 100, 100);

    return (
        <div className="overview-section">
            <h2 className="base-header">Monthly Limit</h2>
            {limit ? (
                <>
                    <LimitOverviewProgressbar percentage={percentage} />
                    <LimitInformation limit={limit}
                                      remaining={remaining}
                                      currencyCode={currencyCode}
                                      spent={spent} />
                </>
            ) : (
                <>
                    <p>Limit not set.
                        <Link to={`/accounts/${accountId}/limit/create`} className="redirection-link">
                            {" "} Click here to set limit.
                        </Link>
                    </p>
                </>
            )
            }
        </div>
    );
};

export default MonthlyLimit;

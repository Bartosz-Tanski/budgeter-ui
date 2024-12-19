import React, {useState, useEffect} from "react";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import "../../styles/pages/account-overview.css";
import {useAuth} from "../../context/AuthContext.jsx";
import LimitDetails, {NoLimitSetMessage} from "./LimitDetails.jsx";

const LimitDisplay = ({accountId, currencyCode}) => {
    const {token} = useAuth();
    const [limit, setLimit] = useState(null);
    const [spent, setSpent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLimitData = async () => {
            try {
                setLoading(true);

                // Fetch the spending limit
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
                setError("Error fetching limit or spending data.");
            } finally {
                setLoading(false);
            }
        };

        fetchLimitData();
    }, [accountId, token]);

    if (loading) {
        return (
            <div>
                <h3 className="middle-section-header">Loading Limit...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h3 className="middle-section-header">Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    const remaining = limit - spent;
    const percentage = Math.min((spent / limit) * 100, 100);

    return (
        <div className="overview-section">
            <h3 className="middle-section-header">Monthly Limit</h3>
            {limit ? (
                <LimitDetails limit={limit}
                              remaining={remaining}
                              spent={spent}
                              currencyCode={currencyCode}
                              percentage={percentage}
                />) : (
                <NoLimitSetMessage/>
            )
            }
        </div>
    );
};

export default LimitDisplay;

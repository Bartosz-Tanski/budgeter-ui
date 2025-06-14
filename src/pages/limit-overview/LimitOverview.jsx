import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import LimitProgressBar from "./details/LimitProgressBar.jsx";
import LimitDetails from "./details/LimitDetails.jsx";
import { fetchLimitAndCurrencyData } from "../../common/handlers/limitHandlers.js";

const LimitOverview = () => {
    const [limit, setLimit] = useState(null);
    const [spent, setSpent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currencyCode, setCurrencyCode] = useState("");
    const { token } = useAuth();
    const { accountId } = useParams();

    useEffect(() => {
        fetchLimitAndCurrencyData(
            accountId,
            token,
            setLimit,
            setCurrencyCode,
            setSpent,
            setError,
            setLoading
        );
    }, [accountId, token]);

    if (loading) return <h3>Loading...</h3>;
    if (error) return <p>{error}</p>;

    const remaining = limit !== null ? limit - spent : null;
    const percentage = limit !== null ? Math.min((spent / limit) * 100, 100) : 0;
    const percentageUsed = limit ? Math.min((spent / limit) * 100, 100) : 0;

    const isLimitExceeded = remaining <= 0;

    return (
        <div className="details-container">
            <div className="upper-section-container">
                <Link to={`/accounts/${accountId}`} className="redirection-link">
                    <i className="fa-solid fa-chevron-left"></i>
                    Account overview
                </Link>
                <h1 className="base-header">
                    <i className="fa-regular fa-hourglass-half"></i>
                    Limit Summary
                </h1>
                {limit === null ? (
                    <p className="no-limit-message">No limit is set for this account.</p>
                ) : (
                    <>
                        <LimitProgressBar percentage={percentage} />
                        <LimitDetails
                            limit={limit}
                            spent={spent}
                            remaining={remaining}
                            currencyCode={currencyCode}
                            isLimitExceeded={isLimitExceeded}
                            percentageUsed={percentageUsed}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default LimitOverview;

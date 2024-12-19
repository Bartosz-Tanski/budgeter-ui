import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import React from "react";

const LimitDetails = ({ percentage, currencyCode, limit, spent, remaining }) => {
    return (
        <>
            <CircularProgressbar
                value={percentage}
                text={`${percentage.toFixed(1)}%`}
                styles={buildStyles({
                    pathColor:
                        percentage > 80
                            ? "#f44336"
                            : percentage > 50
                                ? "#ff9800"
                                : "#4caf50",
                    textColor: "#00bcd4",
                    trailColor: "#1f1f1f",
                })}
            />
            <div className="limit-details">
                <p>
                    <span className="account-details-label">Set Limit:</span>
                    <span>{" " + limit.toLocaleString()} {currencyCode}</span>
                </p>
                <p>
                    <span className="account-details-label">Spent This Month:</span>
                    <span >{" " + spent.toLocaleString()} {currencyCode}</span>
                </p>
                <p>
                    <span className="account-details-label">Remaining:</span>
                    <span className={`${remaining === 0 ? "limit-exceeded" : ""}`}>{" " + remaining.toLocaleString()} {currencyCode}</span>
                </p>
            </div>
        </>
    )
}

export const NoLimitSetMessage = () => {
    return (
        <>
        <p>No limit set for this account.</p>
        </>
    )
}

export default LimitDetails;
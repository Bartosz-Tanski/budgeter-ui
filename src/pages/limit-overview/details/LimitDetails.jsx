import React from "react";

const LimitDetails = ({ limit, spent, remaining, currencyCode, forecastedSpending, willExceedLimit, percentageUsed }) => {
    return (
        <div className="details-list">
            <ul className="details-list">
                <li>
                    <span className="details-label">Set Limit:</span>
                    <span className="details-value">{` ${limit.toLocaleString()} ${currencyCode}`}</span>
                </li>
                <li>
                    <span className="details-label">Spent This Month:</span>
                    <span className="details-value">{` ${spent.toLocaleString()} ${currencyCode}`}</span>
                </li>
                <li>
                    <span className="details-label">Remaining:</span>
                    <span
                        className={`${remaining <= 0 ? "limit-exceeded" : ""}`}
                    >{` ${remaining.toLocaleString()} ${currencyCode}`}</span>
                </li>
                <li>
                    <span className="details-label">Forecasted Spending:</span>
                    <span className="details-value">{` ${forecastedSpending.toFixed(2)} ${currencyCode}`}</span>
                </li>
                <li>
                    <span className="details-label">Will you exceed the limit: </span>
                    <span className="details-value"
                          style={{
                              color: willExceedLimit ? "red" : "green",
                              fontWeight: "bold",
                          }}>
                    {willExceedLimit ? "Yes" : "No"}
                </span>
                </li>
            </ul>
        </div>
    );
};

export default LimitDetails;

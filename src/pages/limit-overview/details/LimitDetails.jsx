import React from "react";

const LimitDetails = ({ limit, spent, remaining, currencyCode, isLimitExceeded }) => {
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
                    <span className="details-label">Is limit exceeded: </span>
                    <span className="details-value"
                          style={{
                              color: isLimitExceeded ? "red" : "green",
                              fontWeight: "bold",
                          }}>
                    {isLimitExceeded ? "Yes" : "No"}
                </span>
                </li>
            </ul>
        </div>
    );
};

export default LimitDetails;

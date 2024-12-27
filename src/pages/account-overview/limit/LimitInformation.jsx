import React from "react";

const LimitInformation = ({limit, spent, remaining, currencyCode}) => {
    return (
        <div className="limit-details">
            <p>
                <span className="details-label">Set Limit:</span>
                <span>{" " + limit.toLocaleString()} {currencyCode}</span>
            </p>
            <p>
                <span className="details-label">Spent This Month:</span>
                <span>{" " + spent.toLocaleString()} {currencyCode}</span>
            </p>
            <p>
                <span className="details-label">Remaining:</span>
                <span
                    className={`${remaining === 0 ? "limit-exceeded" : ""}`}>{" " + remaining.toLocaleString()} {currencyCode}</span>
            </p>
        </div>
    )
}

export default LimitInformation;
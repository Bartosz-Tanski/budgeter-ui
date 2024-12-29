import React from "react";

const CategoryDetails = ({incomeStats, expenseStats, currencyCode}) => {
    return (<div className="stats-section">
        <div className="income-stats">
            <h2 className="base-header">Incomes</h2>
            <ul className="details-list">
                <li>
                    <span className="details-label">
                        Total incomes amount:
                    </span>
                    <span className="details-value">
                        {`${incomeStats.total.toFixed(2)} ${currencyCode}`}
                    </span>
                </li>

                <li>
                    <span className="details-label">
                        Average transaction value:
                    </span>
                    <span className="details-value">
                        {`${incomeStats.average} ${currencyCode}`}
                    </span>
                </li>
                <li>
                    <span className="details-label">
                        Number of transactions:
                    </span>
                    <span className="details-value">
                        {incomeStats.transactions}
                    </span>
                </li>
            </ul>
        </div>

        <div className="expense-stats">
            <h2 className="base-header">Expenses</h2>
            <ul className="details-list">
                <li>
                    <span className="details-label">
                        Total expenses amount:
                    </span>
                    <span className="details-value">
                        {`${expenseStats.total.toFixed(2)} ${currencyCode}`}
                    </span>
                </li>
                <li>
                    <span className="details-label">
                        Average transaction value:
                    </span>
                    <span className="details-value">
                        {`${expenseStats.average} ${currencyCode}`}
                    </span>
                </li>
                <li>
                    <span className="details-label">
                        Number of transactions:
                    </span>
                    <span className="details-value">
                        {expenseStats.transactions}
                    </span>
                </li>
            </ul>
        </div>
    </div>)
}

export default CategoryDetails;
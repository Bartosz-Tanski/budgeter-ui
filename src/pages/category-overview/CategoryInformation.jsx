import {Link} from "react-router-dom";
import CategoryDetails from "./CategoryDetails.jsx";
import React from "react";

const CategoryInformation = ({ accountId, incomeStats, expenseStats, currencyCode, categoryName }) => {
    return (
        <div className="details-section">
            <Link to={`/accounts/${accountId}/categories`} className="redirection-link">
                <i className="fa-solid fa-chevron-left"></i>
                Categories list
            </Link>
            <h1 className="base-header">
                <i className="fa-solid fa-chart-pie"></i>
                <span className="category-name-label">{`${categoryName} `}</span>
                Category Details:
            </h1>

            {incomeStats && expenseStats && (
                <CategoryDetails
                    incomeStats={incomeStats}
                    expenseStats={expenseStats}
                    currencyCode={currencyCode}
                />
            )}
        </div>
    );
}

export default CategoryInformation;
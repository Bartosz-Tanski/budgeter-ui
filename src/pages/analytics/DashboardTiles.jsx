import React from "react";

const DashboardTiles = ({
                            dateRangeOption,
                            totalIncomes,
                            totalExpenses,
                            limitAmount,
                            topCategory,
                            currencyCode,
                        }) => {
    return (
        <div className="tiles" style={{width:"100%", flexWrap: "wrap"}}>
            <div className="overview-item" style={{flex: 1, minWidth: "200px"}}>
                <h3 className="account-details-header" style={{fontSize: "18px"}}>
                    INCOMES
                </h3>
                <p style={{fontSize: "16px", color: "#fff"}}>
                    {totalIncomes.toFixed(2)} {currencyCode}
                </p>
            </div>

            <div className="overview-item" style={{flex: 1, minWidth: "200px"}}>
                <h3 className="account-details-header" style={{fontSize: "18px"}}>
                    EXPENSES
                </h3>
                <p style={{fontSize: "16px", color: "#fff"}}>
                    {totalExpenses.toFixed(2)} {currencyCode}
                </p>
            </div>

            <div className="overview-item" style={{flex: 1, minWidth: "200px"}}>
                <h3 className="account-details-header" style={{fontSize: "18px"}}>
                    SPENDING LIMIT
                </h3>
                {limitAmount !== null ? (
                    <>
                        <p style={{fontSize: "16px"}}>{limitAmount.toFixed(2)} {currencyCode}</p>
                        <p style={{fontSize: "14px"}}>
                            Used: {totalExpenses.toFixed(2)} / {limitAmount.toFixed(2)} {currencyCode} (
                            {limitAmount > 0
                                ? ((totalExpenses / limitAmount) * 100).toFixed(2)
                                : 0}
                            %)
                        </p>
                    </>
                ) : (
                    <p>No limit set</p>
                )}
            </div>

            <div className="overview-item" style={{flex: 1, minWidth: "200px"}}>
                <h3 className="account-details-header" style={{fontSize: "18px"}}>
                    TOP EXPENSE CATEGORY
                </h3>
                {topCategory ? (
                    <p style={{fontSize: "16px"}}>
                        {topCategory.categoryName} – {topCategory.totalAmount.toFixed(2)} {currencyCode}
                    </p>
                ) : (
                    <p style={{fontSize: "14px"}}>No data</p>
                )}
            </div>
        </div>
    );
};

export default DashboardTiles;

import IncomesBarChart from "./charts/IncomesBarChart.jsx";
import ExpensesBarChart from "./charts/ExpensesBarChart.jsx";
import React from "react";

const BarCharts = ({ allIncomesStats, allExpensesStats, categoryName, currencyCode }) => {
    return (
        <div className="middle-section-container">
            <div className="left-chart-section">
                <IncomesBarChart
                    incomesData={allIncomesStats}
                    expandedCategory={categoryName}
                    currencyCode={currencyCode}
                />
            </div>
            <div className="right-chart-section">
                <ExpensesBarChart
                    expensesData={allExpensesStats}
                    expandedCategory={categoryName}
                    currencyCode={currencyCode}
                />
            </div>
        </div>
    )
}

export default BarCharts;
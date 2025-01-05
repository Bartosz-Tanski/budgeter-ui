import IncomesPieChart from "./charts/IncomesPieChart.jsx";
import ExpensesPieChart from "./charts/ExpensesPieChart.jsx";
import React from "react";

const PieCharts = ({ allIncomesStats, allExpensesStats, categoryName, currencyCode, startDate, endDate }) => {
    return (
        <div className="middle-section-container">
            <div className="left-chart-section">
                <IncomesPieChart
                    incomesData={allIncomesStats}
                    expandedCategory={categoryName}
                    currencyCode={currencyCode}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
            <div className="right-chart-section">
                <ExpensesPieChart
                    expensesData={allExpensesStats}
                    expandedCategory={categoryName}
                    currencyCode={currencyCode}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        </div>
    )
}

export default PieCharts;
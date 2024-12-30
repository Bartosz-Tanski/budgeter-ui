import IncomesLineChart from "./charts/IncomesLineChart.jsx";
import ExpensesLineChart from "./charts/ExpensesLineChart.jsx";
import React from "react";

const LineCharts = ({
                        allIncomesStats,
                        allExpensesStats,
                        categoryName,
                        currencyCode,
                        incomesTransactions,
                        expensesTransactions
                    }) => {
    return (
        <div className="middle-section-container">
            <div className="left-chart-section">
                <IncomesLineChart
                    incomesData={incomesTransactions}
                    expandedCategory={categoryName}
                    currencyCode={currencyCode}
                />
            </div>
            <div className="right-chart-section">
                <ExpensesLineChart
                    expensesData={expensesTransactions}
                    expandedCategory={categoryName}
                    currencyCode={currencyCode}
                />
            </div>
        </div>
    )
}

export default LineCharts;
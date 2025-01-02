import React, {useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from "../../../context/AuthContext.jsx";
import CategoriesOverviewChart from "./CategoriesOverviewChart.jsx";

const CategoriesOverview = ({accountId, currencyCode}) => {
    const [categoryStats, setCategoryStats] = useState([]);
    const [topExpenses, setTopExpenses] = useState([]);
    const [topIncomes, setTopIncomes] = useState([]);
    const {token} = useAuth();

    useEffect(() => {
        const fetchCategoryStats = async () => {
            const now = new Date();

            try {
                const response = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/stats`,
                    {
                        params: {
                            TransactionType: "all",
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data;
                setCategoryStats(data);

                const expenses = data
                    .filter((item) => item.type === "Expense")
                    .slice(0, 3);

                const incomes = data
                    .filter((item) => item.type === "Income")
                    .slice(0, 3);

                setTopExpenses(expenses);
                setTopIncomes(incomes);
            } catch (error) {
                console.error("Failed to fetch category stats:", error);
            }
        };

        fetchCategoryStats();
    }, [accountId, token]);

    return (
        <div className="overview-section">
            <h2 className="base-header">Categories Overview</h2>

            {topExpenses.length === 0 ?
                (<p>No expenses categories found.</p>) :
                (<div className="top-categories">
                        <h3 className="details-label">Top 3 Expenses</h3>
                        <ol>
                            {topExpenses.map((expense, index) => (
                                <li key={index}>
                                    <span className="details-label">{expense.categoryName}:</span>
                                    <span>{" " + expense.totalAmount} {currencyCode} </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                )
            }

            {topIncomes.length === 0 ?
                (<p>No incomes categories found.</p>) :
                (<div className="top-categories">
                        <h3 className="details-label">Top 3 Incomes</h3>
                        <ol>
                            {topIncomes.map((income, index) => (
                                <li key={index}>
                                    <span className="details-label">{income.categoryName}: </span>
                                    <span> {" " + income.totalAmount.toFixed(2)} {currencyCode} </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                )
            }

            {(topIncomes.length === 0 || topExpenses.length === 0) ?
                (<></>) :
                (<div className="overview-item">
                    <div className="category-overview-chart">
                        <CategoriesOverviewChart categoryStats={categoryStats} currencyCode={currencyCode}/>
                    </div>
                </div>)}
        </div>
    )
        ;
};

export default CategoriesOverview;

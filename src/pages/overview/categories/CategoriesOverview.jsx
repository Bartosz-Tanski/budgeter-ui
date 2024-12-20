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
            try {
                const response = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/stats`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data;
                setCategoryStats(data);

                const expenses = data
                    .filter((item) => item.type === "Expense")
                    .sort((a, b) => b.totalAmount - a.totalAmount)
                    .slice(0, 3);

                const incomes = data
                    .filter((item) => item.type === "Income")
                    .sort((a, b) => b.totalAmount - a.totalAmount)
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
            <h3 className="middle-section-header">Categories Overview</h3>

            {topExpenses.length === 0 ?
                (<p>No expenses categories found.</p>) :
                (<div className="top-categories">
                        <h4>Top 3 Expenses</h4>
                        <ul>
                            {topExpenses.map((expense, index) => (
                                <li key={index}>
                                    {expense.categoryName}: {expense.totalAmount} PLN
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }

            {topIncomes.length === 0 ?
                (<p>No incomes categories found.</p>) :
                (<div className="top-categories">
                        <h4>Top 3 Incomes</h4>
                        <ul>
                            {topIncomes.map((income, index) => (
                                <li key={index}>
                                    {income.categoryName}: {income.totalAmount.toFixed(2)} PLN
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }

            {(topIncomes.length === 0 || topExpenses.length === 0) ?
                (<></>) :
                (<div className="overview-item">
                    <CategoriesOverviewChart categoryStats={categoryStats} currencyCode={currencyCode}/>
                </div>)}
        </div>
    )
        ;
};

export default CategoriesOverview;

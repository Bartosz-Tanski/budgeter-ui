
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginForm from "./pages/user/LoginForm.jsx";
import RegisterForm from "./pages/user/RegisterForm.jsx";
import Menu from "./common/components/Menu.jsx";
import CreateAccount from "./pages/accounts-table/form/CreateAccount.jsx";
import AccountOverview from "./pages/account-overview/AccountOverview.jsx";
import IncomesList from "./pages/transactions-table/incomes/IncomesList.jsx";
import ExpensesList from "./pages/transactions-table/expenses/ExpensesList.jsx";
import Categories from "./pages/categories-table/Categories.jsx";
import CreateCategory from "./pages/categories-table/form/CreateCategory.jsx";
import CategoryOverview from "./pages/category-overview/CategoryOverview.jsx";
import LimitOverview from "./pages/limit-overview/LimitOverview.jsx";
import CreateLimit from "./pages/limit-overview/form/CreateLimit.jsx";
import AccountsList from "./pages/accounts-table/AccountsList.jsx";
import CreateTransaction from "./pages/transactions-table/form/CreateTransaction.jsx";
import AnalyticsDashboard from "./pages/analytics/AnalyticsDashboard.jsx";

const App = () => {
    const { token, setToken } = useAuth();

    const handleLogout = () => {
        setToken(null);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, [setToken]);

    return (
        <div>
            {token && <Menu onLogout={handleLogout} />}
            <Routes>
                {!token ? (
                    <>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route path="/accounts" element={<AccountsList />} />
                        <Route path="/create-account" element={<CreateAccount />} />
                        <Route path="/accounts/:accountId" element={<AccountOverview />} />

                        <Route path="/accounts/:accountId/expenses" element={<ExpensesList />} />
                        <Route
                            path="/accounts/:accountId/expenses/create"
                            element={<CreateTransaction transactionType="expense" />}
                        />

                        <Route path="/accounts/:accountId/incomes" element={<IncomesList />} />
                        <Route
                            path="/accounts/:accountId/incomes/create"
                            element={<CreateTransaction transactionType="income" />}
                        />

                        <Route path="/accounts/:accountId/categories" element={<Categories />} />
                        <Route path="/accounts/:accountId/create-category" element={<CreateCategory />} />
                        <Route path="/accounts/:accountId/categories/:categoryId" element={<CategoryOverview />} />

                        <Route path="/accounts/:accountId/limit" element={<LimitOverview />} />
                        <Route path="/accounts/:accountId/limit/create" element={<CreateLimit />} />

                        <Route path="/accounts/:accountId/analytics" element={<AnalyticsDashboard />}
                        />

                        <Route path="*" element={<Navigate to="/accounts" />} />
                    </>
                )}
            </Routes>
        </div>
    );
};

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginForm from "./pages/user/LoginForm.jsx";
import RegisterForm from "./pages/user/RegisterForm.jsx";
import Menu from "./common/components/Menu.jsx";
import Accounts from "./pages/accounts/Accounts.jsx";
import CreateAccount from "./pages/accounts/form/CreateAccount.jsx";
import AccountOverview from "./pages/overview/AccountOverview.jsx";
import ExpensesList from "./pages/transactions/ExpensesList.jsx";
import IncomesList from "./pages/transactions/IncomesList.jsx";

const App = () => {
    const { token, setToken } = useAuth();

    const handleLogout = () => {
        setToken(null);
    };

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
                        <Route path="/accounts" element={<Accounts />} />
                        <Route path="/accounts/:accountId" element={<AccountOverview />} />
                        <Route path="/create-account" element={<CreateAccount />} />
                        <Route path="/accounts/:accountId/expenses" element={<ExpensesList />} />
                        <Route path="/accounts/:accountId/incomes" element={<IncomesList />} />
                        <Route path="*" element={<Navigate to="/accounts" />} />
                    </>
                )}
            </Routes>
        </div>
    );
};

export default App;

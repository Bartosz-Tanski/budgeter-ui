import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginForm from "./components/user/LoginForm.jsx";
import RegisterForm from "./components/user/RegisterForm.jsx";
import Menu from "./components/layout/Menu.jsx";
import Accounts from "./components/account/Accounts.jsx";
import CreateAccount from "./components/account/form/CreateAccount.jsx";
import AccountDetails from "./components/account/AccountDetails.jsx";
import ExpensesList from "./components/transactions/ExpensesList.jsx";
import IncomesList from "./components/transactions/IncomesList.jsx";

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
                        <Route path="/accounts/:accountId" element={<AccountDetails />} />
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

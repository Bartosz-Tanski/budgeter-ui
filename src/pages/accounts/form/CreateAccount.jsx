import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext.jsx";
import AccountForm from "./AccountForm.jsx";
import SuccessMessage from "./SuccessMessage.jsx";
import currenciesHelper from "../../../common/helpers/currenciesHelper.js";
import handleErrors from "../../../common/handlers/handleErrors.js";

const CreateAccount = () => {
    const { token, refreshAccessToken } = useAuth();
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [currency, setCurrency] = useState("");
    const [currencies, setCurrencies] = useState([]);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        loadCurrencies();
    }, []);

    const loadCurrencies = async () => {
        try {
            const data = await currenciesHelper();
            setCurrencies(data);
        } catch (err) {
            console.error("Failed to fetch currencies:", err);
        }
    };

    const resetForm = () => {
        setName("");
        setBalance(0);
        setCurrency("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await axios.post(
                "https://budgeter-api.azurewebsites.net/api/user/accounts",
                { name, balance, currencyCode: currency },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccess(true);
            const newToken = await refreshAccessToken();
            if (!newToken) {
                throw new Error("Failed to refresh token. Please log in again.");
            }
            resetForm();
        } catch (err) {
            handleErrors(err, setErrors);
        }
    };

    return (
        <div className="form-container">
            <h1 className="base-header" hidden={success}>
                <i className="fa-solid fa-building-columns"></i>
                Create Account
            </h1>

            {success ? (
                <SuccessMessage />
            ) : (
                <AccountForm
                    formType="Create"
                    name={name}
                    setName={setName}
                    balance={balance}
                    setBalance={setBalance}
                    currency={currency}
                    setCurrency={setCurrency}
                    currencies={currencies}
                    errors={errors}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default CreateAccount;

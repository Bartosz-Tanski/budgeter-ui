import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext.jsx";
import SuccessMessage from "../../../common/components/SuccessMessage.jsx";
import handleErrors from "../../../common/handlers/handleErrors.js";
import {useParams} from "react-router-dom";
import LimitForm from "./LimitForm.jsx";

const CreateLimit = () => {
    const { token, refreshAccessToken } = useAuth();
    const { accountId } = useParams();
    const [amount, setAmount] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        setAmount("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await axios.post(
                `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/limit`,
                { amount: amount },
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
                <i className="fa-solid fa-plus"></i>
                Create Limit
            </h1>

            {success ? (
                <SuccessMessage objectTypeName="limit" accountId={accountId} />
            ) : (
                <LimitForm
                    accountId={accountId}
                    formType="Create"
                    amount={amount}
                    setAmount={setAmount}
                    errors={errors}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default CreateLimit;

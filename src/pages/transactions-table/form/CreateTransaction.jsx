// CreateTransaction.jsx
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../../context/AuthContext.jsx";
import TransactionForm from "./TransactionForm.jsx";
import TransactionSuccessMessage from "./TransactionSuccessMessage.jsx";
import {useParams} from "react-router-dom";
import handleErrors from "../../../common/handlers/handleErrors.js";

const CreateTransaction = ({transactionType}) => {
    const {accountId} = useParams();
    const {token} = useAuth();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    // Ładujemy listę kategorii
    useEffect(() => {
        loadCategories();
    }, [accountId, token]);

    const loadCategories = async () => {
        try {
            const response = await axios.get(
                `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCategories(response.data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    const getEndpoint = () => {
        const baseUrl = `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}`;
        if (transactionType === "income") return `${baseUrl}/incomes`;
        return `${baseUrl}/expenses`;
    };

    // Reset pól w formularzu
    const resetForm = () => {
        setTitle("");
        setAmount(0);
        setDescription("");
        setCategoryId("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Gdy user wybierze "No category", ustaw categoryId = null
        const finalCategoryId = categoryId === "no-category" ? null : categoryId;

        try {
            await axios.post(
                getEndpoint(),
                {
                    title,
                    amount,
                    description,
                    categoryId: finalCategoryId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccess(true);
            resetForm();
        } catch (err) {
            handleErrors(err, setErrors);
        }
    };

    if (success) {
        return (
            <div className="form-container">
                <TransactionSuccessMessage transactionType={transactionType} accountId={accountId}/>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h1 className="base-header">
                {transactionType === "income" ? (
                    <>
                        <i className="fa-solid fa-money-check-dollar"></i>
                        Create Income
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-money-check-dollar"></i>
                        Create Expense
                    </>
                )}
            </h1>

            <TransactionForm
                accountId={accountId}
                transactionType={transactionType}
                title={title}
                setTitle={setTitle}
                amount={amount}
                setAmount={setAmount}
                description={description}
                setDescription={setDescription}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                categories={categories}
                errors={errors}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default CreateTransaction;

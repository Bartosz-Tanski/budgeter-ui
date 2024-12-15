import React, { useState, useEffect } from "react";
import AccountForm from "./AccountForm.jsx";
import currenciesHelper from "../../../common/helpers/currenciesHelper.js";
import handleErrors from "../../../common/handlers/handleErrors.js";
import useModalState from "../../../common/hooks/useModalState.js";

const EditModal = ({ isOpen, onClose, account, onSubmit, token }) => {
    const { formData, errors, setErrors, updateFormData, initializeForm } =
        useModalState(account, isOpen);

    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        if (isOpen) {
            initializeForm(account);
        }
    }, [account, isOpen, initializeForm]);

    useEffect(() => {
        const loadCurrencies = async () => {
            try {
                const data = await currenciesHelper();
                setCurrencies(data);
            } catch (err) {
                console.error("Failed to fetch currencies:", err);
            }
        };

        loadCurrencies();
    }, []);

    const handleSave = async () => {
        setErrors({});
        try {
            await onSubmit({
                id: account?.id,
                ...formData,
            });
        } catch (err) {
            handleErrors(err, setErrors);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal modal-form-container">
                <h2>Edit Account</h2>
                <AccountForm
                    formType="Edit"
                    name={formData.name}
                    setName={(value) => updateFormData("name", value)}
                    balance={formData.balance}
                    setBalance={(value) => updateFormData("balance", value)}
                    currency={formData.currencyCode}
                    setCurrency={(value) => updateFormData("currencyCode", value)}
                    currencies={currencies}
                    errors={errors}
                    handleSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                />
                <div className="modal-actions">
                    <button onClick={handleSave} className="edit-button">
                        Save
                    </button>
                    <button onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
import React from "react";
import InputField from "../../../common/components/InputField.jsx";

const AccountForm = ({
                         formType,
                         name,
                         setName,
                         balance,
                         setBalance,
                         currency,
                         setCurrency,
                         currencies,
                         errors,
                         handleSubmit,
                     }) => (
    <form onSubmit={handleSubmit}>
        <InputField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            error={errors.Name}
            required
        />
        <InputField
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            placeholder="Balance"
            error={errors.Balance}
            required
        />
        <div className={`form-group ${errors.CurrencyCode ? "error" : ""}`}>
            {errors.CurrencyCode && (
                <span className="error-message">{errors.CurrencyCode}</span>
            )}
            <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
            >
                <option value="">Select Currency</option>
                {currencies.map((cur) => (
                    <option key={cur.currencyCode} value={cur.currencyCode}>
                        {cur.currencyCode} - {cur.name}
                    </option>
                ))}
            </select>
        </div>
        {errors.general && (
            <div className="form-group error">
                <span className="error-message">{errors.general}</span>
            </div>
        )}
        <button hidden={formType !== "Create"} type="submit">Create Account</button>
    </form>
);

export default AccountForm;

import React from "react";
import InputField from "../../../common/components/InputField.jsx";
import {Link} from "react-router-dom";

const TransactionForm = ({
                             transactionType,
                             title,
                             setTitle,
                             amount,
                             setAmount,
                             description,
                             setDescription,
                             categoryId,
                             setCategoryId,
                             categories,
                             errors,
                             handleSubmit,
                             accountId
                         }) => {
    return (
        <form onSubmit={handleSubmit}>
            <InputField
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                error={errors.Title}
                required
            />

            <InputField
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Amount"
                error={errors.Amount}
                required
            />

            <InputField
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                error={errors.Description}
                required={false}
            />

            <div className={`form-group ${errors.CategoryId ? "error" : ""}`}>
                {errors.CategoryId && <span className="error-message">{errors.CategoryId}</span>}
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="no-category">No category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {errors.general && (
                <div className="form-group error">
                    <span className="error-message">{errors.general}</span>
                </div>
            )}

            <button type="submit">
                {transactionType === "income" ? "Create Income" : "Create Expense"}
            </button>

            <Link className="redirection-link"
                  to={`/accounts/${accountId}/${transactionType === "income" ? "incomes" : "expenses"}`}>
                <p>Back</p>
            </Link>
        </form>
    );
};

export default TransactionForm;

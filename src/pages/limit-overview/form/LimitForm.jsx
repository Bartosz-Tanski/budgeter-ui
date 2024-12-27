import React from "react";
import InputField from "../../../common/components/InputField.jsx";
import {Link} from "react-router-dom";

const LimitForm = ({
                          formType,
                          amount,
                          setAmount,
                          errors,
                          handleSubmit,
                          accountId,
                      }) => (
    <form onSubmit={handleSubmit}>
        <InputField
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
            error={errors.Amount}
            required
        />
        {errors.general && (
            <div className="form-group error">
                <span className="error-message">{errors.general}</span>
            </div>
        )}
        <button hidden={formType !== "Create"} type="submit">Create Limit</button>
        <Link className="redirection-link" to={`/accounts/${accountId}/limit`} >
            {formType === "Edit" ? ("") : (<p> Back </p>)}
        </Link>
    </form>
);

export default LimitForm;

import React from "react";
import InputField from "../../../common/components/InputField.jsx";
import {Link} from "react-router-dom";

const CategoryForm = ({
                          formType,
                          name,
                          setName,
                          errors,
                          handleSubmit,
                          accountId,
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
        {errors.general && (
            <div className="form-group error">
                <span className="error-message">{errors.general}</span>
            </div>
        )}
        <button hidden={formType !== "Create"} type="submit">Create Category</button>
        <Link className="redirection-link" to={`/accounts/${accountId}/categories`} >
            {formType === "Edit" ? ("") : (<p> Back </p>)}
        </Link>
    </form>
);

export default CategoryForm;

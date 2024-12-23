import React from "react";
import { Link } from "react-router-dom";

const SuccessMessage = () => (
    <div>
        <h1 className="base-header">
            <i className="fa-solid fa-building-columns"></i>
            Account Created!
        </h1>
        <p>
            Your bank account has been created successfully.{" "}
            <Link to="/accounts" className="redirection-link">
                You can now start managing your finances!
            </Link>
        </p>
    </div>
);

export default SuccessMessage;

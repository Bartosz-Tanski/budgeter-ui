import React from "react";
import { Link } from "react-router-dom";

const SuccessMessage = () => (
    <div>
        <h2>Account Created!</h2>
        <p>
            Your bank account has been created successfully.{" "}
            <Link to="/accounts" className="redirection-link">
                You can now start managing your finances!
            </Link>
        </p>
    </div>
);

export default SuccessMessage;

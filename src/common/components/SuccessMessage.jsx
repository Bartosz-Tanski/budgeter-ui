import React from "react";
import {Link} from "react-router-dom";

const displayMessage = (objectTypeName, accountId) => {
    switch (objectTypeName) {
        case "account": {
            return (
                <Link to="/accounts" className="redirection-link">
                    You can now start managing your finances!
                </Link>
            )
        }

        case "category": {
            return (
                <Link to={`/accounts/${accountId}/categories`} className="redirection-link">
                    Go back to categories list.
                </Link>
            )
        }

        case "limit": {
            return (
                <Link to={`/accounts/${accountId}/limit`} className="redirection-link">
                    Go back to limit overview.
                </Link>
            )
        }
    }
}

const displayIcon = (objectTypeName) => {
    switch (objectTypeName) {
        case "account": {
            return <i className="fa-solid fa-building-columns"></i>
        }

        case "category": {
            return <i className="fa-solid fa-folder-plus"></i>
        }

        case "limit": {
            return <i className="fa-solid fa-check"></i>
        }
    }
}

const SuccessMessage = ({objectTypeName, accountId}) => (
    <div>
        <h1 className="base-header">
            {displayIcon(objectTypeName)}
            {objectTypeName} Created!
        </h1>
        <p>
            Your {objectTypeName} has been created successfully. {" "}
            {displayMessage(objectTypeName, accountId)}
        </p>
    </div>
);

export default SuccessMessage;

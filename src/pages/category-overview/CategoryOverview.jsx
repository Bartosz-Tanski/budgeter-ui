import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";

const CategoryOverview = () => {
    const {accountId} = useParams();
    const {categoryId} = useParams();
    const [account, setAccount] = useState(null);
    const [currencyName, setCurrencyName] = useState("");
    const {token} = useAuth();

    return (
        <div className="account-details-container">
            <div className="upper-section-container">
                <h1 className="base-header">
                    <i className="fa-solid fa-chart-pie"></i>
                    Category Overview
                </h1>

                <ul className="account-details-list">
                    <li>
                        <span className="account-details-label">Name:</span>
                        <span className="account-details-value">Placeholder</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CategoryOverview;
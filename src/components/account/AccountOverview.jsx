import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.jsx";
import TransactionList from "../transactions/TransactionList.jsx";
import "../../styles/pages/account-overview.css";
import {fetchCurrency} from "../../common/helpers/currenciesHelper.js";
import LimitDisplay from "../limit/LimitDisplay.jsx";
import MonthlySummary from "../../pages/overview/transactions/summary/MonthlySummary.jsx";

const AccountOverview = () => {
    const {accountId} = useParams();
    const [account, setAccount] = useState(null);
    const [currencyName, setCurrencyName] = useState("");
    const {token} = useAuth();

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const response = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/accounts/${accountId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAccount(response.data);
                const currencyDetails = await fetchCurrency(response.data.currencyCode);
                setCurrencyName(currencyDetails.name);
            } catch (error) {
                console.error("Failed to fetch account details:", error);
            }
        };

        fetchAccountDetails();
    }, [accountId, token]);

    if (!account) {
        return <p>Loading account details...</p>;
    }

    return (
        <div className="account-details-container">
            <div className="upper-section-container">
                <h2 className="account-details-header">Account Overview</h2>
                <ul className="account-details-list">
                    <li>
                        <span className="account-details-label">Name:</span>
                        <span className="account-details-value">{account.name}</span>
                    </li>
                    <li>
                        <span className="account-details-label">Balance:</span>
                        <span className="account-details-value">
                    {account.balance.toLocaleString()} {account.currencyCode}
                </span>
                    </li>
                    <li>
                        <span className="account-details-label">Currency:</span>
                        <span className="account-details-value">{currencyName}</span>
                    </li>
                </ul>
            </div>

            <div className="middle-section-container">
                <div className="transactions-container">
                    <TransactionList accountId={accountId} type="expenses" currencyCode={account.currencyCode}/>
                    <TransactionList accountId={accountId} type="incomes" currencyCode={account.currencyCode}/>
                </div>

                <div className="limit-container">
                    <LimitDisplay accountId={accountId} currencyCode={account.currencyCode}/>
                </div>
            </div>

            <div className="bottom-section-container">
                <div className="transactions-details-container">
                    <MonthlySummary accountId={accountId} currencyCode={account.currencyCode}/>
                </div>

                <div className="categories-overview-container">
                    <div className="overview-section">
                        <h3 className="middle-section-header">Categories Details</h3>
                        <p>Work in progress...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountOverview;

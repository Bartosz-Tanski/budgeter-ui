import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.jsx";
import "../../styles/pages/account-overview.css";
import {fetchCurrency} from "../../common/helpers/currenciesHelper.js";
import TransactionList from "./transactions/recent/TransactionList.jsx";
import MonthlyLimit from "./limit/MonthlyLimit.jsx";
import TransactionsOverview from "./transactions/overview/TransactionsOverview.jsx";
import CategoriesOverview from "./categories/CategoriesOverview.jsx";

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
        <div className="details-container">
            <div className="upper-section-container">
                <h1 className="base-header">
                    <i className="fa-solid fa-chart-pie"></i>
                    Account Overview
                </h1>

                <ul className="details-list">
                    <li>
                        <span className="details-label">Name:</span>
                        <span className="details-value">{account.name}</span>
                    </li>
                    <li>
                        <span className="details-label">Balance:</span>
                        <span className="details-value">
                    {account.balance.toLocaleString()} {account.currencyCode}
                </span>
                    </li>
                    <li>
                        <span className="details-label">Currency:</span>
                        <span className="details-value">{currencyName}</span>
                    </li>
                </ul>
            </div>

            <div className="middle-section-container">
                <div className="transactions-container">
                    <TransactionList accountId={accountId} type="expenses" currencyCode={account.currencyCode}/>
                    <TransactionList accountId={accountId} type="incomes" currencyCode={account.currencyCode}/>
                </div>

                <div className="limit-container">
                    <MonthlyLimit accountId={accountId} currencyCode={account.currencyCode}/>
                </div>
            </div>

            <div className="bottom-section-container">
                <div className="transactions-details-container">
                    <TransactionsOverview accountId={accountId} currencyCode={account.currencyCode} />
                </div>

                <div className="categories-overview-container">
                    <CategoriesOverview accountId={accountId} currencyCode={account.currencyCode} />
                </div>
            </div>
        </div>
    );
};

export default AccountOverview;

import axios from "axios";

const currenciesHelper = async () => {
    const response = await axios.get(
        "https://budgeter-api.azurewebsites.net/api/currencies"
    );
    return response.data;
};

const fetchCurrency = async (currencyCode) => {
    const response = await axios.get(
        `https://budgeter-api.azurewebsites.net/api/currencies/${currencyCode.toLowerCase()}`
    );
    return response.data;
};

export const fetchCurrencyByAccountId = async (accountId, token) => {
    const accountResponse = await axios.get(
        `https://budgeter-api.azurewebsites.net/api/user/accounts/${accountId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return accountResponse.data.currencyCode;
};

export { currenciesHelper, fetchCurrency };

export default currenciesHelper;

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

export { currenciesHelper, fetchCurrency };

export default currenciesHelper;

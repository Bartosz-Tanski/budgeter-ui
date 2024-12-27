import axios from "axios";

export const fetchLimitAndCurrencyData = async (accountId, token, setLimit, setCurrencyCode, setSpent, setError, setLoading) => {
    try {
        setLoading(true);

        const limitResponse = await axios.get(
            `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/limit`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const limitAmount = limitResponse.data.amount;
        setLimit(limitAmount || null);

        const accountResponse = await axios.get(
            `https://budgeter-api.azurewebsites.net/api/user/accounts/${accountId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setCurrencyCode(accountResponse.data.currencyCode);

        const now = new Date();
        const startDate = `${now.getFullYear()}-${now.getMonth() + 1}-01`;
        const endDate = `${now.getFullYear()}-${now.getMonth() + 1}-${new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0
        ).getDate()}`;

        const expensesResponse = await axios.get(
            `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses/total-in-range`,
            {
                params: {
                    StartDate: startDate,
                    EndDate: endDate,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setSpent(expensesResponse.data);
    } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
    } finally {
        setLoading(false);
    }
};

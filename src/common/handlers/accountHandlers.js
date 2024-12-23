// accountHandlers.js
import axios from "axios";

export const fetchAccounts = async ({
                                        token,
                                        pageNumber,
                                        pageSize,
                                        searchQuery,
                                        sortConfig,
                                        setAccounts,
                                        setTotalPages,
                                    }) => {
    try {
        const response = await axios.get(
            `https://budgeter-api.azurewebsites.net/api/user/accounts`,
            {
                headers: {Authorization: `Bearer ${token}`},
                params: {
                    PageSize: pageSize,
                    PageNumber: pageNumber,
                    SearchQuery: searchQuery || undefined,
                    SortBy: sortConfig.key,
                    SortOrder: sortConfig.direction,
                },
            }
        );
        setAccounts(response.data.items);
        setTotalPages(response.data.totalPages);
    } catch (err) {
        console.error("Error fetching accounts-table:", err);
    }
};

export const deleteAccount = async ({
                                        accountIdToDelete,
                                        token,
                                        fetchAccounts,
                                        setModalOpen,
                                        setAccountIdToDelete,
                                    }) => {
    if (!accountIdToDelete) {
        console.error("No valid account ID selected for deletion");
        return;
    }

    try {
        await axios.delete(
            `https://budgeter-api.azurewebsites.net/api/user/accounts/${accountIdToDelete}`,
            {headers: {Authorization: `Bearer ${token}`}}
        );
        fetchAccounts();
        setModalOpen(false);
        setAccountIdToDelete(null);
    } catch (err) {
        console.error("Error deleting account:", err);
    }
};

export const updateAccount = async ({
                                        updatedAccount,
                                        token,
                                        fetchAccounts,
                                        setEditModalOpen,
                                        setAccountToEdit,
                                    }) => {
    try {
        await axios.patch(
            `https://budgeter-api.azurewebsites.net/api/user/accounts/${updatedAccount.id}`,
            updatedAccount,
            {headers: {Authorization: `Bearer ${token}`}}
        );
        fetchAccounts();
        setEditModalOpen(false);
        setAccountToEdit(null);
    } catch (err) {
        console.error("Error updating account:", err);
        if (err.response) {
            if (typeof err.response.data === "string") {
                setAccountToEdit((prev) => ({
                    ...prev,
                    errors: {Name: err.response.data},
                }));
            } else if (err.response.data.errors) {
                setAccountToEdit((prev) => ({
                    ...prev,
                    errors: err.response.data.errors,
                }));
            }
        }
    }
};
import axios from "axios";

export async function fetchCategories({
                                          token,
                                          accountId,
                                          pageNumber = 1,
                                          pageSize = 10,
                                          searchQuery = "",
                                          sortConfig = { key: "Name", direction: 0 },
                                      }) {
    const sortOrder = sortConfig.direction === 0 ? "Ascending" : "Descending";

    const params = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SearchQuery: searchQuery,
        SortBy: sortConfig.key,
        SortOrder: sortOrder,
    };

    const response = await axios.get(
        `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        }
    );

    return response.data;
}

export async function deleteCategory({
                                         categoryId,
                                         accountId,
                                         token,
                                         fetchCategories,
                                         setModalOpen,
                                         setCategoryIdToDelete,
                                     }) {
    try {
        await axios.delete(
            `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/${categoryId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        await fetchCategories();

        setModalOpen(false);
        setCategoryIdToDelete(null);
    } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category. Please try again later.");
    }
}

export const updateCategory = async ({
                                         accountId,
                                         updatedCategory,
                                         token,
                                         fetchCategories,
                                         setEditModalOpen,
                                         setCategoryToEdit,
                                     }) => {
    try {
        await axios.patch(
            `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/${updatedCategory.id}`,
            updatedCategory,
            {headers: {Authorization: `Bearer ${token}`}}
        );
        fetchCategories();
        setEditModalOpen(false);
        setCategoryToEdit(null);
    } catch (err) {
        console.error("Error updating account:", err);
        if (err.response) {
            if (typeof err.response.data === "string") {
                setCategoryToEdit((prev) => ({
                    ...prev,
                    errors: {Name: err.response.data},
                }));
            } else if (err.response.data.errors) {
                setCategoryToEdit((prev) => ({
                    ...prev,
                    errors: err.response.data.errors,
                }));
            }
        }
    }
};

export const fetchCategoryDetails = async (accountId, categoryId, token) => {
    try {
        const categoryResponse = await fetch(
            `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/${categoryId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!categoryResponse.ok) {
            throw new Error("Failed to fetch category details");
        }

        const categoryData = await categoryResponse.json();

        const statsResponse = await fetch(
            `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/stats`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!statsResponse.ok) {
            throw new Error("Failed to fetch category stats");
        }

        const statsData = await statsResponse.json();

        const incomes = statsData.filter(
            (item) =>
                item.categoryName === categoryData.name && item.type === "Income"
        );
        const expenses = statsData.filter(
            (item) =>
                item.categoryName === categoryData.name && item.type === "Expense"
        );

        const totalIncome = incomes.reduce((sum, item) => sum + item.totalAmount, 0);
        const totalExpense = expenses.reduce((sum, item) => sum + item.totalAmount, 0);

        const incomeTransactions = incomes.reduce(
            (count, item) => count + item.numberOfTransactions,
            0
        );
        const expenseTransactions = expenses.reduce(
            (count, item) => count + item.numberOfTransactions,
            0
        );

        const averageIncome =
            incomeTransactions > 0
                ? (totalIncome / incomeTransactions).toFixed(2)
                : 0;
        const averageExpense =
            expenseTransactions > 0
                ? (totalExpense / expenseTransactions).toFixed(2)
                : 0;

        return {
            categoryName: categoryData.name,
            incomeStats: {
                total: totalIncome,
                transactions: incomeTransactions,
                average: averageIncome,
            },
            expenseStats: {
                total: totalExpense,
                transactions: expenseTransactions,
                average: averageExpense,
            },
        };
    } catch (err) {
        throw new Error(err.message);
    }
};
export const fetchAllCategoriesStats = async (accountId, token) => {
    const response = await fetch(
        `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/stats`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch all categories stats");
    }
    return await response.json();
};



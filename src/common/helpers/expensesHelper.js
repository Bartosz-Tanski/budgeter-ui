import axios from "axios";

export async function fetchCategories({ token, accountId }) {
    const response = await axios.get(
        `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories/all`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
}

export async function fetchExpenses({
                                       token,
                                       accountId,
                                       pageNumber,
                                       pageSize,
                                       searchQuery,
                                       sortConfig,
                                       startDate,
                                       endDate,
                                       selectedCategory,
                                   }) {
    const sortBy = sortConfig.key;
    const sortOrder = sortConfig.direction === 0 ? "Ascending" : "Descending";

    let categoryNameParam;
    if (selectedCategory === "No category") {
        categoryNameParam = "uncategorized";
    } else if (
        selectedCategory !== "" &&
        selectedCategory !== "All categories"
    ) {
        categoryNameParam = selectedCategory;
    }

    const params = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SearchQuery: searchQuery,
        SortBy: sortBy,
        SortOrder: sortOrder,
    };

    if (startDate) {
        params.StartDate = startDate;
    }
    if (endDate) {
        params.EndDate = endDate;
    }
    if (categoryNameParam !== undefined) {
        params.CategoryName = categoryNameParam;
    }

    const response = await axios.get(
        `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        }
    );

    return response.data;
}

export async function deleteExpense({
                                       accountId,
                                       expenseIdToDelete,
                                       token,
                                       fetchExpenses,
                                       setModalOpen,
                                       setExpenseIdToDelete,
                                   }) {
    try {
        await axios.delete(
            `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/expenses/${expenseIdToDelete}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        await fetchExpenses();
    } catch (error) {
        console.error("Error deleting expense:", error);
    } finally {
        setModalOpen(false);
        setExpenseIdToDelete(null);
    }
}

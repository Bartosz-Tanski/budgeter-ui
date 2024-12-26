import axios from "axios";

export async function fetchCategoriesList({ token, accountId }) {
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

export async function fetchIncomes({
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
        `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/incomes`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        }
    );

    return response.data;
}

export async function deleteIncome({
                                       accountId,
                                       incomeIdToDelete,
                                       token,
                                       fetchIncomes,
                                       setModalOpen,
                                       setIncomeIdToDelete,
                                   }) {
    try {
        await axios.delete(
            `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/incomes/${incomeIdToDelete}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        await fetchIncomes();
    } catch (error) {
        console.error("Error deleting income:", error);
    } finally {
        setModalOpen(false);
        setIncomeIdToDelete(null);
    }
}

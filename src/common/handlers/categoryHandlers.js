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

    console.log(response.data);
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

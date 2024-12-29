// src/common/hooks/useTransactionsList.js
import { useEffect, useState } from "react";

export function useTransactionsList({
                                        fetchCategories,
                                        fetchTransactions,
                                        token,
                                        accountId,
                                        defaultSortKey = "Date",
                                        defaultSortDirection = 1,
                                        defaultPageSize = 10,
                                    }) {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const [sortConfig, setSortConfig] = useState({
        key: defaultSortKey,
        direction: defaultSortDirection,
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const loadAllCategories = async () => {
        try {
            const data = await fetchCategories({ token, accountId });
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const loadItems = async () => {
        try {
            const response = await fetchTransactions({
                token,
                accountId,
                pageNumber,
                pageSize,
                searchQuery,
                sortConfig,
                startDate,
                endDate,
                selectedCategory,
            });
            setItems(response.items);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error while fetching transactions:", error);
        }
    };

    useEffect(() => {
        if (token && accountId) {
            loadAllCategories();
            loadItems();
        }
    }, [token, accountId]);

    useEffect(() => {
        if (token && accountId) {
            loadItems();
        }
    }, [pageNumber, pageSize, searchQuery, sortConfig, startDate, endDate, selectedCategory]);

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key !== key) {
                return { key, direction: 0 };
            }
            return { key, direction: prev.direction === 0 ? 1 : 0 };
        });
    };

    return {
        items,
        categories,
        totalPages,
        pageNumber,
        setPageNumber,
        pageSize,
        setPageSize,
        sortConfig,
        handleSort,

        searchQuery,
        setSearchQuery,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedCategory,
        setSelectedCategory,
    };
}

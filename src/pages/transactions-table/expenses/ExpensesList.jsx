import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import Pagination from "../../../common/components/table/Pagination.jsx";
import ExpensesTable from "./table/ExpensesTable.jsx";
import FilterPanel from "./../../../common/components/table/FilterPanel.jsx";

import { fetchCategoriesList, fetchExpenses } from "./../../../common/helpers/expensesHelper.js";
import ConfirmModal from "../../../common/components/table/ConfirmModal.jsx";

const ExpensesList = () => {
    const { accountId } = useParams();
    const { token } = useAuth();

    const [expenses, setExpenses] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [modalOpen, setModalOpen] = useState(false);
    const [expenseIdToDelete, setExpenseIdToDelete] = useState(null);

    const [sortConfig, setSortConfig] = useState({
        key: "Date",
        direction: 1,
    });


    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");


    const [categories, setCategories] = useState([]);

    const loadCategories = async () => {
        try {
            const data = await fetchCategoriesList({
                token,
                accountId,
            });
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const loadExpensesData = async () => {
        try {
            const response = await fetchExpenses({
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
            setExpenses(response.items);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error while fetching expenses:", error);
        }
    };

    useEffect(() => {
        if (token && accountId) {
            loadCategories();
            loadExpensesData();
        }
    }, [token, accountId]);

    useEffect(() => {
        if (token && accountId) {
            loadExpensesData();
        }
    }, [
        pageNumber,
        pageSize,
        searchQuery,
        sortConfig,
        startDate,
        endDate,
        selectedCategory,
    ]);

    const handleDeleteExpense = (expenseId) => {
        setExpenseIdToDelete(expenseId);
        setModalOpen(true);
    };
    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key !== key) {
                return { key, direction: 0 };
            }
            return { key, direction: prev.direction === 0 ? 1 : 0 };
        });
    };

    return (
        <div className="table-container">
            <Link to={`/accounts/${accountId}`} className="redirection-link">
                <i className="fa-solid fa-chevron-left"></i>
                Account overview
            </Link>
            <h1 className="base-header">
                <i className="fa-solid fa-arrow-trend-down"></i>
                Expenses
            </h1>

            <FilterPanel
                searchQuery={searchQuery}
                onSearchChange={(val) => {
                    setSearchQuery(val);
                    setPageNumber(1);
                }}
                startDate={startDate}
                onStartDateChange={(val) => {
                    setStartDate(val);
                    setPageNumber(1);
                }}
                endDate={endDate}
                onEndDateChange={(val) => {
                    setEndDate(val);
                    setPageNumber(1);
                }}
                selectedCategory={selectedCategory}
                onCategoryChange={(val) => {
                    setSelectedCategory(val);
                    setPageNumber(1);
                }}
                categories={categories}
            />

            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <>
                    <ExpensesTable
                        expenses={expenses}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        onDelete={handleDeleteExpense}
                    />
                    <Pagination
                        currentPage={pageNumber}
                        totalPages={totalPages}
                        onPageChange={setPageNumber}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                    />

                    <ConfirmModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onConfirm={() => {
                            deleteExpense({
                                accountId,
                                expenseIdToDelete,
                                token,
                                fetchExpenses,
                                setModalOpen,
                                setExpenseIdToDelete,
                            });
                        }}
                        objectTypeName="expense"
                    />
                </>
            )}
        </div>
    );
};

export default ExpensesList;

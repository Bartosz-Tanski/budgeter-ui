import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import Pagination from "../../../common/components/table/Pagination.jsx";
import IncomesTable from "./table/IncomesTable.jsx";
import FilterPanel from "../../../common/components/table/FilterPanel.jsx";

import { fetchCategories, fetchIncomes } from "./../../../common/helpers/incomesHelper.js";
import ConfirmModal from "../../../common/components/table/ConfirmModal.jsx";

const IncomesList = () => {
    const { accountId } = useParams();
    const { token } = useAuth();

    const [incomes, setIncomes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [modalOpen, setModalOpen] = useState(false);
    const [incomeIdToDelete, setIncomeIdToDelete] = useState(null);

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
            const data = await fetchCategories({
                token,
                accountId,
            });
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const loadIncomesData = async () => {
        try {
            const response = await fetchIncomes({
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
            setIncomes(response.items);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error while fetching incomes:", error);
        }
    };

    useEffect(() => {
        if (token && accountId) {
            loadCategories();
            loadIncomesData();
        }
    }, [token, accountId]);

    useEffect(() => {
        if (token && accountId) {
            loadIncomesData();
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

    const handleDeleteIncome = (incomeId) => {
        setIncomeIdToDelete(incomeId);
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
            <h1 className="base-header">
                <i className="fa-solid fa-arrow-trend-up"></i>
                Incomes
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

            {incomes.length === 0 ? (
                <p>No incomes found.</p>
            ) : (
                <>
                    <IncomesTable
                        incomes={incomes}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        onDelete={handleDeleteIncome}
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
                            deleteIncome({
                                accountId,
                                incomeIdToDelete,
                                token,
                                fetchIncomes,
                                setModalOpen,
                                setIncomeIdToDelete,
                            });
                        }}
                        objectTypeName="income"
                    />
                </>
            )}
        </div>
    );
};

export default IncomesList;

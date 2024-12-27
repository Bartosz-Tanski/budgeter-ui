import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import SearchBar from "../../common/components/table/SearchBar.jsx";
import Pagination from "../../common/components/table/Pagination.jsx";
import CategoriesTable from "./table/CategoriesTable.jsx";
import ConfirmModal from "../../common/components/table/ConfirmModal.jsx";
import {deleteCategory, fetchCategories, updateCategory} from "../../common/handlers/categoryHandlers.js";
import EditCategoryModal from "./form/EditCategoryModal.jsx";

const Categories = () => {
    const { token, refreshAccessToken } = useAuth();
    const { accountId } = useParams();
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "Name", direction: 0 });
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);


    const loadCategories = async () => {
        try {
            const response = await fetchCategories({
                token,
                accountId,
                pageNumber,
                pageSize,
                searchQuery,
                sortConfig,
            });

            setCategories(response.items);

            setTotalPages(response.totalPages);
        } catch (err) {
            console.error("Error loading categories:", err);
            if (err.message.includes("Session expired")) {
                alert("Session expired. Please log in again.");
            }
        }
    };


    useEffect(() => {
        if (accountId) {
            loadCategories();
        }
    }, [token, accountId, pageNumber, pageSize, searchQuery, sortConfig]);

    return (
        <div className="table-container">
            <h1 className="base-header">
                <i className="fa-solid fa-folder"></i>
                Categories
            </h1>

            <div className="filter-section">
                <SearchBar
                    value={searchQuery}
                    onChange={(query) => setSearchQuery(query)}
                />
            </div>

            {categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <CategoriesTable
                    categories={categories}
                    onEdit={(category) => {
                        setCategoryToEdit(category);
                        setEditModalOpen(true);
                    }}
                    onDelete={(categoryId) => {
                        setCategoryIdToDelete(categoryId);
                        setModalOpen(true);
                    }}
                    onSort={setSortConfig}
                    sortConfig={sortConfig}
                />
            )}

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
                    deleteCategory({
                        categoryId: categoryIdToDelete,
                        accountId,
                        token,
                        fetchCategories: loadCategories,
                        setModalOpen,
                        setCategoryIdToDelete,
                    });
                }}
                objectTypeName="category"
            />

            <EditCategoryModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                category={categoryToEdit}
                onSubmit={(updatedCategory) => {
                    updateCategory({
                        accountId,
                        updatedCategory,
                        token,
                        fetchCategories: loadCategories,
                        setEditModalOpen,
                        setCategoryToEdit,
                    });
                }}
                token={token}
            />
        </div>
    );
};

export default Categories;

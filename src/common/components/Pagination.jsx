import React from "react";

const Pagination = ({
                        currentPage,
                        totalPages,
                        onPageChange,
                        pageSize,
                        onPageSizeChange,
                        loading,
                        totalItems,
                    }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const handlePageSizeChange = (e) => {
        onPageSizeChange(Number(e.target.value));
        onPageChange(1);
    };

    return (
        <div className="pagination-container">
            <div className="pagination">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1 || loading}
                >
                    Previous Page
                </button>
                <span>
                    Page {currentPage} of {totalPages || 1}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages || loading}
                >
                    Next Page
                </button>
            </div>
            <div className="page-size-select">
                Per page:
                <select
                    id="pageSize"
                    disabled={totalItems === 0 || loading}
                    value={pageSize}
                    onChange={handlePageSizeChange}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;

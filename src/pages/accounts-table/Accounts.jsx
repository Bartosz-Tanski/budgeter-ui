import React from "react";
import {Link, useNavigate} from "react-router-dom";
import SearchBar from "../../common/components/SearchBar.jsx";
import AccountsTable from "./table/AccountsTable.jsx";
import Pagination from "../../common/components/Pagination.jsx";
import ConfirmModal from "./form/ConfirmModal.jsx";
import {deleteAccount, fetchAccounts, updateAccount} from "../../common/handlers/accountHandlers.js";
import EditModal from "./form/EditModal.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";

const Accounts = () => {
    const { token, refreshAccessToken } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "Name", direction: 0 });
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [accountIdToDelete, setAccountIdToDelete] = useState(null);
    const [accountToEdit, setAccountToEdit] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const navigate = useNavigate();

    const handleAccountSelect = (account) => {
        setSelectedAccount(account);
        navigate(`/accounts/${account.id}`);
    };

    const loadAccounts = async () => {
        try {
            await fetchAccounts({
                token,
                refreshAccessToken,
                pageNumber,
                pageSize,
                searchQuery,
                sortConfig,
                setAccounts,
                setTotalPages,
            });
        } catch (err) {
            if (err.message.includes("Session expired")) {
                alert("Session expired. Please log in again.");
            }
        }
    };

    useEffect(() => {
        loadAccounts();
    }, [token, pageNumber, pageSize, searchQuery, sortConfig]);

    return (
        <div className="table-container">
            <h1 className="base-header">
                <i className="fa-solid fa-house"></i>
                Your Accounts
            </h1>
            {selectedAccount && (
                <p>
                    Chosen Account: {selectedAccount.name}, {selectedAccount.balance}{" "}
                    {selectedAccount.currencyCode}
                </p>
            )}
            <SearchBar
                value={searchQuery}
                onChange={(query) => setSearchQuery(query)}
            />
            {accounts.length === 0 ? (
                <p>
                    No accounts found. Please{" "}
                    <Link to="/create-account" className="redirection-link">
                        create a new account.
                    </Link>
                </p>
            ) : (
                <AccountsTable
                    accounts={accounts}
                    onEdit={(account) => {
                        setAccountToEdit(account);
                        setEditModalOpen(true);
                    }}
                    onDelete={(accountId) => {
                        setAccountIdToDelete(accountId);
                        setModalOpen(true);
                    }}
                    onAccountClick={handleAccountSelect}
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
                    deleteAccount({
                        accountIdToDelete,
                        token,
                        fetchAccounts: loadAccounts,
                        setModalOpen,
                        setAccountIdToDelete,
                    });
                }}
            />
            <EditModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                account={accountToEdit}
                onSubmit={(updatedAccount) => {
                    updateAccount({
                        updatedAccount,
                        token,
                        fetchAccounts: loadAccounts,
                        setEditModalOpen,
                        setAccountToEdit,
                    });
                }}
                token={token}
            />
        </div>
    );
};

export default Accounts;

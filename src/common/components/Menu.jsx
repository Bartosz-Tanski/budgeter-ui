﻿// Menu.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = ({ onLogout }) => {
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const accountId = location.pathname.split("/")[2]; // Wyciąga accountId z URL

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
    };

    const toggleSubmenu = (submenuName) => {
        setOpenSubmenu((prev) => (prev === submenuName ? null : submenuName));
    };

    const isActiveAccount = Boolean(accountId);

    return (
        <div className="menu-container">
            <div className="menu-bar">
                {/* Accounts Dropdown */}
                <div
                    className="menu-item"
                    onMouseEnter={() => setOpenDropdown("accounts")}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onClick={() => toggleDropdown("accounts")}
                >
                    <span className="menu-label">
                        Accounts
                        <i className={`fas fa-chevron-down ${openDropdown === "accounts" ? "rotated" : ""}`}></i>
                    </span>
                    {openDropdown === "accounts" && (
                        <div className="dropdown">
                            <Link to="/accounts" className="dropdown-item">
                                View Accounts
                            </Link>
                            <Link to="/create-account" className="dropdown-item">
                                Create Account
                            </Link>
                        </div>
                    )}
                </div>

                {/* Transactions Dropdown */}
                {isActiveAccount && (
                    <div
                        className="menu-item"
                        onMouseEnter={() => setOpenDropdown("transactions")}
                        onMouseLeave={() => setOpenDropdown(null)}
                        onClick={() => toggleDropdown("transactions")}
                    >
                        <span className="menu-label">
                            Transactions <i className={`fas fa-chevron-down ${openDropdown === "transactions" ? "rotated" : ""}`}></i>
                        </span>
                        {openDropdown === "transactions" && (
                            <div className="dropdown">
                                {/* Incomes Submenu */}
                                <div
                                    className="dropdown-item nested"
                                    onMouseEnter={() => setOpenSubmenu("incomes")}
                                    onMouseLeave={() => setOpenSubmenu(null)}
                                    onClick={() => toggleSubmenu("incomes")}
                                >
                                    <span className="menu-label">
                                        Incomes <i className={`fas fa-chevron-right ${openSubmenu === "incomes" ? "rotated" : ""}`}></i>
                                    </span>
                                    {openSubmenu === "incomes" && (
                                        <div className="nested-dropdown">
                                            <Link to="/accounts" className="dropdown-item">
                                                View Incomes
                                            </Link>
                                            <Link to="/accounts" className="dropdown-item">
                                                Create Income
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                {/* Expenses Submenu */}
                                <div
                                    className="dropdown-item nested"
                                    onMouseEnter={() => setOpenSubmenu("expenses")}
                                    onMouseLeave={() => setOpenSubmenu(null)}
                                    onClick={() => toggleSubmenu("expenses")}
                                >
                                    <span className="menu-label">
                                        Expenses <i className={`fas fa-chevron-right ${openSubmenu === "expenses" ? "rotated" : ""}`}></i>
                                    </span>
                                    {openSubmenu === "expenses" && (
                                        <div className="nested-dropdown">
                                            <Link to="/accounts" className="dropdown-item">
                                                View Expenses
                                            </Link>
                                            <Link to="/accounts" className="dropdown-item">
                                                Create Expense
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Categories Dropdown */}
                {isActiveAccount && (
                    <div
                        className="menu-item"
                        onMouseEnter={() => setOpenDropdown("categories")}
                        onMouseLeave={() => setOpenDropdown(null)}
                        onClick={() => toggleDropdown("categories")}
                    >
                        <span className="menu-label">
                            Categories <i className={`fas fa-chevron-down ${openDropdown === "categories" ? "rotated" : ""}`}></i>
                        </span>
                        {openDropdown === "categories" && (
                            <div className="dropdown">
                                <Link to="/accounts" className="dropdown-item">
                                    View Categories
                                </Link>
                                <Link to="/accounts" className="dropdown-item">
                                    Create Category
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Limit Dropdown */}
                {isActiveAccount && (
                    <div
                        className="menu-item"
                        onMouseEnter={() => setOpenDropdown("limit")}
                        onMouseLeave={() => setOpenDropdown(null)}
                        onClick={() => toggleDropdown("limit")}
                    >
                        <span className="menu-label">
                            Limit <i className={`fas fa-chevron-down ${openDropdown === "limit" ? "rotated" : ""}`}></i>
                        </span>
                        {openDropdown === "limit" && (
                            <div className="dropdown">
                                <Link to="/accounts" className="dropdown-item">
                                    View Limits
                                </Link>
                                <Link to="/accounts" className="dropdown-item">
                                    Create Limit
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Logout Button */}
                <button
                    className="logout-button"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Menu;

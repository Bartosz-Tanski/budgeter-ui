import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.menu-item')) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="menu-container">
            <div className="menu-bar">
                <div className="menu-item" onClick={toggleDropdown} style={{ userSelect: 'none' }}>
                    <span>Accounts ▾</span>
                    {isDropdownOpen && (
                        <div className="dropdown">
                            <Link to="/accounts" className="dropdown-item">View Accounts</Link>
                            <Link to="/create-account" className="dropdown-item">Create Account</Link>
                        </div>
                    )}
                </div>
                <button className="logout-button" onClick={onLogout} style={{ userSelect: 'none' }}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Menu;

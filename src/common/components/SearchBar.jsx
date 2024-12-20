import React from "react";

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
                className="search-input"
                type="text"
                placeholder="Search by name..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;

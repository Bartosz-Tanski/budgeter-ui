import React from "react";

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="search-container">
            <i className="fa fa-search search-icon"></i>
            <input
                className="search-input"
                type="text"
                placeholder="Search..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;

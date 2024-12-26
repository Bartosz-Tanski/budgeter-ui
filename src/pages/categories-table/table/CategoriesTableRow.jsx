import React from "react";

const CategoriesTableRow = ({ category, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{category.name}</td>
            <td>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(category);
                    }}
                    className="edit-button"
                >
                    EDIT
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(category.id);
                    }}
                    className="delete-button"
                >
                    DELETE
                </button>
            </td>
        </tr>
    );
};

export default CategoriesTableRow;

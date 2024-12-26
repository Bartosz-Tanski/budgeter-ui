import React, { useState, useEffect } from "react";
import handleErrors from "../../../common/handlers/handleErrors.js";
import {useCategoryModalState} from "../../../common/hooks/useModalState.js";
import CategoryForm from "./CategoryForm.jsx";

const EditModal = ({ isOpen, onClose, category, onSubmit, token }) => {
    const { formData, errors, setErrors, updateFormData, initializeForm } =
        useCategoryModalState(category, isOpen);

    useEffect(() => {
        if (isOpen) {
            initializeForm(category);
        }
    }, [category, isOpen, initializeForm]);

    const handleSave = async () => {
        setErrors({});
        try {
            await onSubmit({
                id: category?.id,
                ...formData,
            });
        } catch (err) {
            handleErrors(err, setErrors);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal modal-form-container">
                <h1 className="base-header">
                    <i className="fa-solid fa-pen-to-square"></i>
                    Edit Category
                </h1>
                <CategoryForm
                    formType="Edit"
                    name={formData.name}
                    setName={(value) => updateFormData("name", value)}
                    errors={errors}
                    handleSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                />
                <div className="modal-actions">
                    <button onClick={handleSave} className="edit-button">
                        Save
                    </button>
                    <button onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
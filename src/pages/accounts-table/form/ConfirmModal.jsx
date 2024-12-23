import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, objectTypeName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>Are you sure you want to delete this {objectTypeName}?</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="delete-button">
                        Confirm
                    </button>
                    <button onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;

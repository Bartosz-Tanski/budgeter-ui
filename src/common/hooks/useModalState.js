import { useState, useCallback } from "react";

const useAccountModalState = (account, isOpen) => {
    const [formData, setFormData] = useState({
        name: "",
        balance: "",
        currencyCode: "",
    });
    const [errors, setErrors] = useState({});

    const initializeForm = useCallback((account) => {
        if (account && isOpen) {
            setFormData({
                name: account.name || "",
                balance: account.balance || "",
                currencyCode: account.currencyCode || "",
            });
            setErrors(account.errors || {});
        }
    }, [isOpen]);

    const updateFormData = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return { formData, errors, setErrors, updateFormData, initializeForm };
};

export const useCategoryModalState = (category, isOpen) => {
    const [formData, setFormData] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({});

    const initializeForm = useCallback((category) => {
        if (category && isOpen) {
            setFormData({
                name: category.name || "",
            });
            setErrors(category.errors || {});
        }
    }, [isOpen]);

    const updateFormData = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return { formData, errors, setErrors, updateFormData, initializeForm };
};

export default useAccountModalState;

import React from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import useInputHandlers from "../hooks/useInputHandlers.js";

const hasError = (error) => {
    return Array.isArray(error) ? error.length > 0 : Boolean(error);
};

const InputField = ({ type, value, onChange, placeholder, error, required }) => {
    const { isFocused, handleFocus, handleBlur } = useInputHandlers(value, onChange);

    return (
        <div className={`form-group ${hasError(error) ? "error" : ""}`}>
            {Array.isArray(error)
                ? error.map((errMsg, idx) => <ErrorMessage key={idx} message={errMsg} />)
                : <ErrorMessage message={error} />}
            <input
                type={type}
                step="0.01"
                value={isFocused && (value === 0 || value === "0") ? "" : value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={hasError(error) ? "error" : ""}
                onFocus={type === "number" ? handleFocus : undefined}
                onBlur={type === "number" ? handleBlur : undefined}
            />
        </div>
    );
};

export default InputField;

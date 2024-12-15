import { useState } from "react";

const useInputHandlers = (value, onChange) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);

        if (value === 0 || value === "0") {
            onChange({ target: { value: "" } });
        }
    };

    const handleBlur = (e) => {
        setIsFocused(false);

        if (e.target.value === "") {
            onChange({ target: { value: 0 } });
        }
    };

    return { isFocused, handleFocus, handleBlur };
};

export default useInputHandlers;

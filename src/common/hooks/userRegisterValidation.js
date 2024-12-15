import { useEffect, useState } from "react";

const useRegisterValidation = (password, confirmPassword) => {
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    useEffect(() => {
        setIsConfirmPasswordValid(confirmPassword === "" || password === confirmPassword);
    }, [password, confirmPassword]);

    return {
        isConfirmPasswordValid,
    };
};

export default useRegisterValidation;

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InputField from "../common/InputField.jsx";
import useRegisterValidation from "../../common/hooks/userRegisterValidation.js";
import generateErrors from "../../common/helpers/generateErrors";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const { isConfirmPasswordValid } = useRegisterValidation(password, confirmPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!isConfirmPasswordValid) {
            setErrors({ ConfirmPassword: "Passwords do not match" });
            return;
        }

        try {
            await axios.post("https://budgeter-api.azurewebsites.net/api/user/register", {
                email,
                password,
            });
            setSuccess(true);
        } catch (err) {
            setErrors(generateErrors(err, email));
        }
    };

    if (success) {
        return (
            <div className="form-container">
                <h2>Registration Successful!</h2>
                <p>
                    Your account has been created.{" "}
                    <Link to="/" className="redirection-link">
                        Log in
                    </Link>{" "}
                    to start managing your finances!
                </p>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    error={errors.DuplicateUserName}
                />
                <InputField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    error={[
                        errors.PasswordTooShort,
                        errors.PasswordRequiresNonAlphanumeric,
                        errors.PasswordRequiresDigit,
                        errors.PasswordRequiresUpper,
                    ].filter(Boolean)}
                />
                <InputField
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your Password"
                    error={!isConfirmPasswordValid ? "Passwords do not match" : errors.ConfirmPassword}
                />
                <button type="submit">Sign up</button>
            </form>
            <p className="form-footer">
                Already have an account?{" "}
                <Link to="/" className="redirection-link">
                    Log in!
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;

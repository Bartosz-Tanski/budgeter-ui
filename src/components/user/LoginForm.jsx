import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../common/InputField.jsx";
import ErrorMessage from "../common/ErrorMessage";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
    const { setToken, setRefreshToken } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                "https://budgeter-api.azurewebsites.net/api/user/login",
                { email, password }
            );
            const { accessToken, refreshToken } = response.data;

            setToken(accessToken);
            setRefreshToken(refreshToken);

            navigate("/accounts");
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <ErrorMessage message={error} />
            <form onSubmit={handleSubmit}>
                <InputField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    required
                />
                <InputField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    required
                />
                <button type="submit">Log in</button>
            </form>
            <p className="form-footer">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="redirection-link">
                    Sign up!
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;

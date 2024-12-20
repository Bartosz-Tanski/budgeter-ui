import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setTokenState] = useState(localStorage.getItem("accessToken") || null);
    const [refreshToken, setRefreshTokenState] = useState(localStorage.getItem("refreshToken") || null);

    const setToken = (newToken) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem("accessToken", newToken);
        } else {
            localStorage.removeItem("accessToken");
        }
    };

    const setRefreshToken = (newRefreshToken) => {
        setRefreshTokenState(newRefreshToken);
        if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
        } else {
            localStorage.removeItem("refreshToken");
        }
    };

    const refreshAccessToken = async () => {
        if (!refreshToken) {
            console.error("No refresh token available.");
            return null;
        }

        try {
            const response = await axios.post(
                "https://budgeter-api.azurewebsites.net/api/user/refresh",
                { refreshToken }
            );
            const newAccessToken = response.data.accessToken;
            setToken(newAccessToken);
            return newAccessToken;
        } catch (err) {
            console.error("Error refreshing access token:", err);
            setToken(null);
            setRefreshToken(null);
            return null;
        }
    };

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedAccessToken) {
            setToken(storedAccessToken);
        }

        if (storedRefreshToken) {
            setRefreshToken(storedRefreshToken);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                refreshToken,
                setRefreshToken,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

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
            return null;
        }
    };

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

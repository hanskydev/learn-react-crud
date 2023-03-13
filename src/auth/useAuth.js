// React
import { createContext, useContext, useMemo, useState, useCallback } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// API
import api from "../services/api";

const AuthContext = createContext();

export const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const getTokenFromLocalStorage = () => {
    const user = getUserFromLocalStorage();
    return user ? user.token : null;
};

export const getRefreshTokenFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.refreshToken : null;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const navigate = useNavigate();

    const signin = useCallback(
        async (username, password) => {
            try {
                const response = await api.post(
                    "/auth/signin",
                    { username, password },
                    { headers: { "Content-Type": "application/json" } }
                );

                const data = response.data;
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);

                if (data.role === "admin") {
                    navigate("/admin/dashboard", { replace: true });
                } else if (data.role === "user") {
                    navigate("/user/dashboard", { replace: true });
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        [navigate]
    );

    const signup = useCallback(
        async (username, password, email, nama) => {
            try {
                const response = await api.post(
                    "/auth/signup",
                    { username, password, email, nama },
                    { headers: { "Content-Type": "application/json" } }
                );

                if (response.status === 200) {
                    navigate("/signin");
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        [navigate]
    );

    const signout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
    }, [navigate]);

    const value = useMemo(
        () => ({
            user,
            signin,
            signup,
            signout,
        }),
        [user, signin, signup, signout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

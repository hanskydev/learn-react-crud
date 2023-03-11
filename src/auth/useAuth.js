import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APP_BASE_URL } from "../configs/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const navigate = useNavigate();

    const signin = useCallback(
        async (username, password) => {
            try {
                const response = await axios.post(
                    `${APP_BASE_URL}/auth/signin`,
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
                const response = await axios.post(
                    `${APP_BASE_URL}/auth/signup`,
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

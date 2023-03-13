// Axios
import axios from "axios";

// Auth Manager
import { getTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from "../auth/useAuth";

// Configs
import { API_BASE_URL } from "../configs/constants";

const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = getTokenFromLocalStorage();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },

    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/auth/signin" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const refreshToken = getRefreshTokenFromLocalStorage();
                    const rs = await instance.post("/auth/refreshToken", {
                        refreshToken,
                    });

                    localStorage.setItem("user", JSON.stringify(rs.data));
                    return instance(originalConfig);
                } catch (error) {
                    localStorage.removeItem("user");
                    window.location = "/signin";
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;

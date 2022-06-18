import { useState, createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearLocalUserInfo, getLocalUserInfo, setLocalUserInfo } from "../services/storage.service";
import { mock_auth } from "../services/auth.service";
import { mock_user } from "../services/user.service";
import config from '../config'
import axios from "axios";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const { LocalToken } = getLocalUserInfo();
    const [token, setToken] = useState(LocalToken);

    const [user, setUser] = useState(null);

    const [authLoading, setAuthLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const fetchData = async (token) => {
            try {

                setAuthLoading(true);

                const result = await axios({
                    method: "GET",
                    url: config.api_url + 'users/self',
                    headers: config.headers(token)
                });

                setUser(result.data);
                setAuthenticated(true);
                setAuthLoading(false)
            } catch (e) {

                clearLocalUserInfo();
                setUser(null);
                setToken(null);
                setAuthenticated(false);
                setAuthLoading(false);
            }
        };

        if (token) {
            fetchData(token);
        } else {
            setAuthenticated(false);
            setAuthLoading(false);
        }
    }, [])

    const handleLogin = async (email, pass) => {
        try {
            setAuthLoading(true);

            const result = await axios({
                method: "POST",
                url: config.api_url + 'auth/login',
                data: {
                    email: email,
                    pass: pass
                }
            });

            const { token: newToken, ...user } = result.data;

            setToken(newToken);
            setUser(user);
            setAuthenticated(true);
            setLocalUserInfo(newToken);
            setAuthLoading(false);

            const origin = location.state?.from?.pathname || '/feed';
            navigate(origin);

        } catch (e) {

            setAuthLoading(false);
            clearLocalUserInfo();
            setAuthenticated(false);
            setUser(null);
            setToken(null);
        }

    };

    const handleLogout = () => {
        clearLocalUserInfo();
        setAuthenticated(false);
        setToken(null);
        setUser(null);
    };

    const value = {
        token,
        user,
        authLoading,
        authenticated,
        login: handleLogin,
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
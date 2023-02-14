import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'

import { getToken, setToken } from "../services/storage.service";
import api from '../services/axios.service';
import config from '../config'


const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        fetchSelf();
    }, []);

    const fetchSelf = useCallback(async () => {
        setAuthLoading(true);

        try {
            const res = await api({
                method: "GET",
                url: 'users/self',
                headers: config.headers(getToken())
            });

            setUser(res.data);
            setAuthenticated(true);

        } catch (e) {
            setAuthenticated(false);
            setUser(null);
            setToken(null);
        }
        setAuthLoading(false);
    }, [])

    const handleLogin = useCallback(async (email, pass) => {
        try {
            setAuthLoading(true);

            const res = await axios({
                method: "POST",
                url: config.api_url + 'auth/login',
                withCredentials: true,
                data: {
                    email: email,
                    pass: pass
                }
            });

            const { access_token, ...stripped } = res.data;

            setUser(stripped);
            setToken(access_token);
            setAuthenticated(true);

            const origin = location.state?.from?.pathname || '/feed';
            navigate(origin);

        } catch (e) {
            setAuthenticated(false);
            setUser(null);
            setToken(null);
        }

        setAuthLoading(false);
    }, []);

    const handleSignup = useCallback(async (user) => {
        setAuthLoading(true);

        try {
            const res = await axios({
                method: "POST",
                url: config.api_url + 'auth/signup',
                data: user
            });

            const { access_token, ...stripped } = res.data;

            setUser(stripped);
            setToken(access_token);
            setAuthenticated(true);

            const origin = location.state?.from?.pathname || '/feed';
            navigate(origin);

        } catch (e) {
            setUser(null);
            setToken(null);
            setAuthenticated(false);
        }
        setAuthLoading(false);
    }, []);

    const handleLogout = useCallback(async () => {
        setAuthLoading(true);

        try {
            await api({
                method: "GET",
                url: config.api_url + 'auth/logout',
                headers: config.headers(getToken()),
                withCredentials: true
            });

            setAuthenticated(false);
            setToken(null);
            setUser(null);
        } catch {
            console.log()
        }
        setAuthLoading(false);
    }, [])

    const value = {
        user,
        authLoading,
        authenticated,
        login: handleLogin,
        logout: handleLogout,
        signup: handleSignup
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
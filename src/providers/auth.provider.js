import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'

import { getToken, setToken } from "../services/storage.service";
import { useError } from "./error.provider";
import api from '../services/axios.service';
import config from '../config'


const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(null);

    const { setError } = useError();

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
            setError(e.response.data.message || 'Unknown error during login');
        }

        setAuthLoading(false);
    }, []);

    const handleSignup = useCallback(async (user) => {
        setAuthLoading(true);

        try {
            console.log('sending')
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
            setError(e.response.data.message || 'Unknown error during signup');
        }
        setAuthLoading(false);
    }, []);

    const handleLogout = useCallback(async (voluntary) => {
        setAuthLoading(true);

        if(!voluntary){
            setAuthenticated(false);
            setToken(null);
            setUser(null);
            setAuthLoading(false);
            return
        }

        try {
            await axios({
                method: "GET",
                url: config.api_url + 'auth/logout',
                headers: config.headers(getToken()),
                withCredentials: true
            });

            setAuthenticated(false);
            setToken(null);
            setUser(null);
        } catch(e) {
            if (e.response.status == 401){
                const res = await axios({
                    method: "GET",
                    url: config.api_url + 'auth/refresh',
                    withCredentials: true
                });

                if (res.data.refreshed_token) {
                    setToken(res.data.refreshed_token);
                }

                try {
                    await axios({
                        method: "GET",
                        url: config.api_url + 'auth/logout',
                        headers: config.headers(getToken()),
                        withCredentials: true
                    });
        
                    setAuthenticated(false);
                    setToken(null);
                    setUser(null);
                } catch (e){
                    console.error(e);
                }
            }
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
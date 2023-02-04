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
    const [authLoading, setAuthLoading] = useState(null);
    const [authenticated, setAuthenticated] = useState(null);

    const fetchUser = useCallback(async () => {
        try {

            setAuthLoading(true);

            const res = await api({
                method: "GET",
                url: 'users/self',
                headers: config.headers(getToken())
            });

            setUser({
                ...res.data,
                isAdmin: false} // hardcode for now
                );

            setAuthenticated(true);

        } catch (e) {
            setUser(null);
            setToken(null);
            setAuthenticated(false);
        }
        setAuthLoading(false);
    })

    useEffect(() => {
        if (!config.unauthedRoutes.includes(location.pathname)){
            fetchUser();
        }
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

            setToken(res.data.access_token);

            fetchUser();

            const origin = location.state?.from?.pathname || '/feed';
            navigate(origin);

        } catch (e) {
            console.log(e); 
            setAuthenticated(false);
            setUser(null);
            setToken(null);
        }
    }, []);

    const handleLogout = () => {
        setAuthenticated(false);
        setToken(null);
        setUser(null);
    };

    const value = {
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
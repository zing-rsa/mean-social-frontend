import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from '../services/axios.service';
import config from '../config'
import axios from 'axios'


const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [token, setToken] = useState(null);

    const [user, setUser] = useState(null);

    const [authLoading, setAuthLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const fetchUser = useCallback(async (new_token = null) => {
        try {

            setAuthLoading(true);

            const res = await api({
                method: "GET",
                url: 'users/self',
                headers: config.headers(new_token ? new_token : token)
            });

            if (res.refreshed_token) {
                setToken(res.refreshed_token)
            } else if (new_token) {
                setToken(new_token);
            }

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
        fetchUser();
    }, [])

    const handleLogin = async (email, pass) => {
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

            fetchUser(res.data.access_token);

            const origin = location.state?.from?.pathname || '/feed';
            navigate(origin);

        } catch (e) {
            console.log(e); 
            setAuthenticated(false);
            setUser(null);
            setToken(null);
        }
    };

    const handleLogout = () => {
        setAuthenticated(false);
        setToken(null);
        setUser(null);
    };

    const value = {
        token,
        setToken,
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
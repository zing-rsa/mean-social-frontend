import { clearLocalUserInfo, getLocalUserInfo, setLocalUserInfo } from "../services/storage.service";
import { useState, createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from '../config'
import axios from "axios";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const { LocalToken } = getLocalUserInfo();
    const [token, setToken] = useState(LocalToken);

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin ] = useState(false);

    const [authLoading, setAuthLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {

                setAuthLoading(true);

                const res = await axios({
                    method: "GET",
                    url: config.api_url + 'users/self',
                    headers: config.headers(token)
                });

                setUser(res.data);
                setAuthenticated(true);
                setAuthLoading(false)

                if (res.data.roles.includes('admin')){
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (e) {

                clearLocalUserInfo();
                setUser(null);
                setIsAdmin(false);
                setToken(null);
                setAuthenticated(false);
                setAuthLoading(false);
            }
        };

        if (token) {
            fetchData();
        } else {
            setAuthenticated(false);
            setAuthLoading(false);
        }
    }, [])

    const handleLogin = async (email, pass) => {
        try {
            setAuthLoading(true);

            const res = await axios({
                method: "POST",
                url: config.api_url + 'auth/login',
                data: {
                    email: email,
                    pass: pass
                }
            });

            console.log('loggin in')
            const { token: newToken, ...user } = res.data;

            setToken(newToken);
            setUser(user);

            if (user.roles.includes('admin')){
                setIsAdmin(true);
            }

            setAuthenticated(true);
            setLocalUserInfo(newToken);
            setAuthLoading(false);

            const origin = location.state?.from?.pathname || '/feed';
            navigate(origin);

        } catch (e) {
            console.log(e); 
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
        setIsAdmin(false)
    };

    const value = {
        token,
        user,
        isAdmin,
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
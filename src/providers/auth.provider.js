import { useState, createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearLocalUserInfo, getLocalUserInfo, setLocalUserInfo } from "../services/storage.service";
import { mock_auth } from "../services/auth.service";
import { mock_user } from "../services/user.service";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const { LocalToken } = getLocalUserInfo();

    const [token, setToken] = useState(LocalToken);
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const fetchData = async (token) => {
            const data = await mock_user(token);
            setUser(data);
            setAuthenticated(true);
        };

        if (token) {
            try {
                fetchData(token);
            } catch (e) {
                clearLocalUserInfo();
                setUser(null);
                setToken(null);
                setAuthenticated(false);
            }
        }
    }, [])

    const handleLogin = async () => {
        try {
            const { token, ...user } = await mock_auth();

            setToken(token);
            setUser(user);
            setAuthenticated(true);
            setLocalUserInfo(token);
        } catch (e) {
            clearLocalUserInfo();
            setAuthenticated(false);
            setUser(null);
            setToken(null);
        }

        const origin = location.state?.from?.pathname || '/feed';
        navigate(origin);
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
        authenticated,
        onLogin: handleLogin,
        onLogout: handleLogout,
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
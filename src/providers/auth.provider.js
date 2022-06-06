import { useState, createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearLocalUserInfo, getLocalUserInfo, setLocalUserInfo } from "../services/storage.service";
import { fakeAuth } from "../services/auth.service";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const { LocalToken } = getLocalUserInfo();

    const [token, setToken] = useState(LocalToken);
    // const [user, setUser] = useState(LocalUser);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { token, ...user } = await fakeAuth();
        
        setToken(token);
        setLocalUserInfo(token);

        const origin = location.state?.from?.pathname || '/feed';
        navigate(origin);
    };

    const handleLogout = () => {
        clearLocalUserInfo();
        setToken(null);
    };

    const value = {
        token,
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
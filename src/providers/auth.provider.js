import { useState, createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fakeAuth } from "../services/auth.service";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const token = await fakeAuth();

        setToken(token);
        
        const origin = location.state?.from?.pathname || '/feed';
        navigate(origin);
    };

    const handleLogout = () => {
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
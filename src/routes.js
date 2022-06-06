import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Feed, Login, Signup } from './views'
import { useAuth } from './providers/auth.provider'

function RouteHandler() {
    return (
        <Routes>
            <Route index element={<Navigate replace to="/feed" />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/feed' element={
                <ProtectedRoute>
                    <Feed />
                </ProtectedRoute>} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    );
}

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" replace state={{from: location }}/>;
    }

    return children;
};

export default RouteHandler;

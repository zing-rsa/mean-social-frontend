import { Routes, Route, Navigate, useLocation, Outlet, useParams } from 'react-router-dom';
import { Feed, Login, Signup, Profile } from './views'
import { useAuth } from './providers/auth.provider'
import Loader from './components/loader/loader';

function RouteHandler() {
    return (
        <Routes>
            <Route index element={<Navigate replace to="/feed" />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            {/* <Route path='/feed' element={
                <ProtectedRoute>
                    <Feed />
                </ProtectedRoute>} 
            /> */}
            <Route path='/profile/:id' element={
                <ProtectedRoute component={(props) => <Profile {...props} key={props.id}/>} />
            } />
                
            <Route path='/feed' element={
                <ProtectedRoute component={(props) => <Feed {...props}/>} />
            } />

            {/* <Route path='/admin' element={
                <AdminRoute>
                    <Route path='/dashboard' element={<AdminDashboard />}></Route>
                    <Route path='/users' element={<AdminUsers />}></Route>
                </AdminRoute>
            } /> */}
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    );
}

const ProtectedRoute = ({component, ...rest}) => {
    const { authenticated, authLoading } = useAuth();
    const { id } = useParams();

    if (authLoading){
        return <Loader />
    }

    if (!authenticated) {
        let remark = 'Please log in to continue...'
        return <Navigate to="/login" replace state={{ remark }}/>;
    }

    return component({ ...rest, id });
};

// const ProtectedRoute = ({ children }) => {
//     const { authenticated, authLoading } = useAuth();
//     const location = useLocation();

//     if (authLoading){
//         return <Loader />
//     }

//     if (!authenticated) {
//         return <Navigate to="/login" replace state={{from: location }}/>;
//     }

//     return children ? children : <Outlet />;
// };

const AdminRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" replace state={{from: location }}/>;
    }
    
    // if (!user.roles.includes('admin')){
    //     return <Navigate to="/feed" replace />;
    // }

    return children ? children : <Outlet />;
};

export default RouteHandler;

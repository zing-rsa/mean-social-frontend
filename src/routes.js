import { Routes, Route, Navigate, useLocation, Outlet, useParams } from 'react-router-dom';
import { Feed, Login, Signup, Profile, Dashboard, Users } from './views'
import { useAuth } from './providers/auth.provider'
import NoAuth from './views/unauthorized/unauthorized';
import Loader from './components/loader/loader';

function RouteHandler() {
    return (
        <Routes>
            <Route index element={<Navigate replace to="/feed" />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route path='/feed' element={
                <ProtectedRoute component={(props) => <Feed {...props} />} />
            } />
            <Route path='/profile/:id' element={
                <ProtectedRoute component={(props) => <Profile {...props} key={props.id} />} />
            } />

            <Route path='/admin'>

                <Route index element={
                    <Navigate to='dashboard'/>}
                />
                <Route index path='dashboard' element={
                    <AdminRoute component={(props) => <Dashboard {...props} />}/> }
                />
                <Route path='users' element={
                    <AdminRoute component={(props) => <Users {...props} />}/> }
                />
            </Route>


            {/* 
            <Route path='/admin' element={
                <ProtectedRoute component={(props) =>    
                    <AdminRoute>
                        <Route path='dashboard' element={<Dashboard {...props}/> }/>
                        <Route path='users'     element={<Users     {...props}/> }/>
                    </AdminRoute>
                } />
            } /> */}
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    );
}

const ProtectedRoute = ({ component, ...rest }) => {
    const { authenticated, authLoading } = useAuth();
    const { id } = useParams();

    if (authLoading) {
        return <Loader />
    }

    if (!authenticated) {
        let remark = 'Please log in to continue...'
        return <Navigate to="/login" replace state={{ remark }} />;
    }

    return component({ ...rest, id });
};

const AdminRoute = ({ component, ...rest }) => {
    const {authenticated, authLoading, isAdmin } = useAuth();

    if (authLoading) {
        return <Loader />
    }

    if (!authenticated) {
        let remark = 'Please log in to continue...'
        return <Navigate to="/login" replace state={{ remark }} />;
    }

    if (isAdmin){
        return component(rest);
    } else {
        return <NoAuth />
    }

};

export default RouteHandler;

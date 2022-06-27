
import { useEffect } from 'react';
import { useUsers } from '../../services/user.service';
import './users.css'
import Loader from '../../components/loader/loader'
import Error from '../../components/error/error'
import AdminView_User from './adminview-user/user';

function Users() {

    const { users, isLoading, isError, fetchUsers } = useUsers();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className='users-container'>
            <h2 className='header'>Manage users</h2>
            <div className='users-list'>
                {users &&
                    users.map((user) =>
                        <AdminView_User key={user._id} refresh={fetchUsers} {...user} />)
                }
                
                {isLoading &&
                    <Loader />
                }

                {isError && 
                    <Error />
                }
            </div>
        </div>
    )
}


export default Users;
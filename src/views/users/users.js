
import { useEffect } from 'react';
import { useProfiles } from '../../services/user.service';
import './users.css'
import Loader from '../../components/loader/loader'
import Error from '../../components/error/error'
import AdminView_User from './adminview-user/user';

function Users() {

    const { profiles, isLoading, isError, fetchProfiles } = useProfiles();

    useEffect(() => {
        fetchProfiles();
    }, [fetchProfiles]);

    return (
        <div className='users-container'>
            <h2 className='header'>Manage users</h2>
            <div className='users-list'>
                {profiles &&
                    profiles.map((profile) =>
                        <AdminView_User key={profile._id} refresh={fetchProfiles} {...profile} />)
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
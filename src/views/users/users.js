
import { useEffect } from 'react';
import { useProfiles } from '../../services/user.service';
import './users.css'
import Loader from '../../components/loader/loader'
import Error from '../../components/error/error'
import AdminView_User from './adminview-user/user';

function Users() {

    const { profiles, isLoading, isError, fetchProfiles, deleteProfile } = useProfiles();

    useEffect(() => {
        fetchProfiles();
    }, [fetchProfiles]);

    return (
        <div className='users-container'>
            <div className='users-header'>Manage users</div>
            <div className='users-list'>
                {profiles &&
                    profiles.map((profile) =>
                        <AdminView_User key={profile._id} delete={() => deleteProfile(profile._id)} {...profile} />)
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
import { useEffect } from 'react';

import { useProfiles } from '../../services/user.service';
import AdminViewUser from './adminview-user/user';
import { Loader } from '../../components/';
import './users.css'

function Users() {

    const { profiles, isLoading, fetchProfiles, deleteProfile } = useProfiles();

    useEffect(() => {
        fetchProfiles();
    }, [fetchProfiles]);

    return (
        <div className='users-container'>
            <div className='users-header'>Manage users</div>
            <div className='users-list'>

                {isLoading &&
                    <Loader classes={'users-loader'} />
                }

                {!isLoading && profiles &&
                    profiles.map((profile) =>
                        <AdminViewUser key={profile._id} delete={() => deleteProfile(profile._id)} {...profile} />)
                }

            </div>
        </div>
    )
}


export default Users;
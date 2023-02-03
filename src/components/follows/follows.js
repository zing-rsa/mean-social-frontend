import { useEffect } from 'react';

import { useFollows } from '../../services/follows.service';
import { getToken } from '../../services/storage.service';
import api from '../../services/axios.service';
import Loader from '../loader/loader';
import Error from '../error/error'
import config from '../../config';
import './follows.css'


function Follows(props) {

    const { isLoading, isError, follows, follow, unfollow, fetchFollows } = useFollows();

    useEffect(() => {
        fetchFollows(props._id);
    }, [fetchFollows, props])

    return (
        <>
            {
                follows && !isLoading &&
                    <div className='follows'>
                        <div className='follow-display'>{follows.followerCount + ' Followers'}</div>
                        <div className='follow-display'>{follows.followingCount + ' Following'}</div>
                        <div className='follow-button'>
                            {
                                follows.isFollowed ?
                                    <button onClick={() => {unfollow(props._id)}}>Unfollow</button>
                                    :
                                    <button onClick={() => {follow(props._id)}}>Follow</button>
                            }
                        </div>
                    </div>
            }
            { isLoading && <Loader />}
            { isError && !isLoading && <Error/>}
        </>


    )
}

export default Follows;

import { useFollows } from '../../services/follows.service';
import { useEffect } from 'react';
import Loader from '../loader/loader';

import './follows.css'
import axios from 'axios';
import config from '../../config';
import { useAuth } from '../../providers/auth.provider';

function Follows(props) {

    const { follows, isLoading, isError, fetchFollows } = useFollows(props._id);
    const { token } = useAuth();

    useEffect(() => {
        fetchFollows();
    }, [fetchFollows])

    const follow = async () => {
        try {
            const result = await axios({
                method: 'POST',
                url: config.api_url + 'follows/follow',
                headers: config.headers(token),
                data: {
                    user_id: props._id
                }
            })

            if (fetchFollows) {
                fetchFollows();
            }

        } catch (e) {
            console.log(e);
        }
    }

    const unfollow = async () => {
        try {
            const result = await axios({
                method: 'POST',
                url: config.api_url + 'follows/unfollow',
                headers: config.headers(token),
                data: {
                    user_id: props._id
                }
            })

            if (fetchFollows) {
                fetchFollows();
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            {
                follows ?

                    <div className='follows'>
                        <div className='follow-display'>{follows.followerCount + ' Followers'}</div>
                        <div className='follow-display'>{follows.followingCount + ' Following'}</div>
                        <div className='follow-button'>
                            {
                                follows.isFollowed ?
                                    <button onClick={unfollow}>Unfollow</button>
                                    :
                                    <button onClick={follow}>Follow</button>
                            }
                        </div>
                    </div>
                    :
                    <Loader />
            }
        </>


    )
}

export default Follows;

import { useEffect } from 'react';

import { useFollows } from '../../services/follows.service';
import { getToken } from '../../services/storage.service';
import api from '../../services/axios.service';
import Loader from '../loader/loader';
import config from '../../config';
import './follows.css'


function Follows(props) {

    const { follows, fetchFollows } = useFollows();

    useEffect(() => {
        fetchFollows(props._id);
    }, [fetchFollows, props])

    const follow = async () => {
        try {
            await api({
                method: 'POST',
                url: config.api_url + 'follows/follow',
                headers: config.headers(getToken()),
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
            await api({
                method: 'POST',
                url: config.api_url + 'follows/unfollow',
                headers: config.headers(getToken()),
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

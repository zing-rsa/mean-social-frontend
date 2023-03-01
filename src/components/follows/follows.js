import { useEffect } from 'react';

import SecondaryButton from '../button-secondary/button-secondary';
import { useFollows } from '../../services/follows.service';
import Loader from '../loader/loader';
import './follows.css'


function Follows(props) {

    const { isLoading, follows, follow, unfollow, fetchFollows } = useFollows();

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
                    {
                        follows.isFollowed ?
                            <SecondaryButton classes={'follow-button'} onClick={() => { unfollow(props._id) }} text={'Unfollow'} />
                            :
                            <SecondaryButton classes={'follow-button'} onClick={() => { follow(props._id) }} text={'Follow'} />
                    }
                </div>
            }
            {isLoading && <Loader />}
        </>


    )
}

export default Follows;

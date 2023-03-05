import { useEffect } from 'react';

import SecondaryButton from '../button-secondary/button-secondary';
import { useFollows } from '../../services/follows.service';
import Loader from '../loader/loader';
import './follows.css'


function Follows(props) {

    const { isLoading, follows, follow, unfollow, fetchFollows } = useFollows();

    useEffect(() => {
        fetchFollows(props._id);
    }, [fetchFollows])

    return (
        <div className='follows'>

            {isLoading &&
                <>
                    <div className='follow-button'></div>

                    <div className='follow-display'>
                        <div className='follow-display-count'>
                            <Loader classes={'follow-loader'}/>
                        </div>
                        <div className='follow-display-label'>Followers</div>
                    </div>

                    <div className='follow-display'>
                        <div className='follow-display-count'>
                            <Loader classes={'follow-loader'}/>
                        </div>
                        <div className='follow-display-label'>Following</div>
                    </div>
                </>
            }

            { !isLoading && follows &&
                <>
                    {
                        follows.isFollowed ?
                            <SecondaryButton classes={'follow-button'} onClick={() => { unfollow(props._id) }} text={'Unfollow'} />
                            :
                            <SecondaryButton classes={'follow-button'} onClick={() => { follow(props._id) }} text={'Follow'} />
                    }

                    <div className='follow-display'>
                        <div className='follow-display-count'>{follows.followerCount}</div>
                        <div className='follow-display-label'>Followers</div>
                    </div>

                    <div className='follow-display'>
                        <div className='follow-display-count'>{follows.followingCount}</div>
                        <div className='follow-display-label'>Following</div>
                    </div>
                </>
            }

        </div>

    )
}

export default Follows;

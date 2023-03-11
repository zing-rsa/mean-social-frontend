import { useEffect } from 'react';

import { useLikes } from '../../services/likes.service';
import { Loader } from '../';
import './post-interactions.css';

function PostInteractions(props) {

    const { likes, setLikes, like, unlike, isLoading: likeLoading } = useLikes();

    useEffect(() => {
        if (props.likes) {
            setLikes(props.likes);
        }
    }, []);

    return (
        <>
            {likes &&
                <div className='interactions-container'>
                    <div className='likes'>

                        {likeLoading ?
                            <Loader classes={'like-loader'}/>
                            :
                            <>
                                <span>{likes.likeCount}</span>
                                {likes.isLiked ?
                                    <i className="fa-solid fa-heart like" onClick={() => unlike(props.post_id)}></i>
                                    :
                                    <i className="fa-regular fa-heart like" onClick={() => like(props.post_id)}></i>
                                }
                            </>
                        }

                    </div>
                </div>
            }
        </>

    )
}

export default PostInteractions;
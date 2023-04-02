import ReactTimeAgo from 'react-time-ago'
import { useCallback, useRef} from 'react';
import { Link } from 'react-router-dom';

import { PostInteractions, DeleteButton, Comments, Avatar, Loader } from '../';
import { useAuth } from '../../providers/auth.provider';
import config from '../../config';
import './post.css'

const timestamp = (input) => {
    let date = input.split('T')[0]
    let time = input.split('T')[1]
    return date + ' ' + time.slice(0, 5)
}

function Post(props) {

    const { user } = useAuth();

    const imagePlaceholder = useRef();
    const image = useRef();

    const swapPlaceholder = useCallback(() => {
        setTimeout(() => {
            // waits 500ms for image to be fully rendered to screen then swaps loader and image immediately.
            // necessary because the onLoad event of <img> only fires when the img element is actually in 
            // the dom, so you can't render the element conditionally
            image.current.style.display = 'block';
            imagePlaceholder.current.style.display = 'none';
        }, 500);
    }, []);

    return (
        <div className='post-container' id={props._id}>
            { props.isDeleting && <div className='post-deleting-cover'></div>}
            <div className='post'>

                {props.image &&
                    <div className='post-image'>
                        <div ref={imagePlaceholder} className='image-placeholder'>
                            <div className='image-placeholder-animation'></div>
                        </div>

                        <img ref={image} onLoad={swapPlaceholder} src={config.media_url(props.image)} />
                    </div>
                }
                <div className='post-body'>
                    <div className='post-details'>
                        <div className='post-details-text'>

                            <div className='post-author'>
                                <Link to={`/profile/${props.owner._id}`}>{props.owner.name}&nbsp;{props.owner.surname}</Link>
                            </div>

                            <div className='post-meta'>
                                <div>{props.owner.username}</div>
                                <ReactTimeAgo date={props.timestamp} timeStyle="twitter"></ReactTimeAgo>
                            </div>

                        </div>
                        {(user.isAdmin || user._id === props.owner._id) &&
                            <div className='post-details-delete'>
                                {props.isDeleting && <Loader classes={'post-details-delete-loader'}/>}
                                {!props.isDeleting && <DeleteButton classes={'post-details-delete-button'} title={'Delete post'} cb={props.delete} />}
                            </div>
                        }
                        <div className='post-details-img'>
                            <Avatar classes={'author-avatar'} src={props.owner.avatar} link={`/profile/${props.owner._id}`} />
                        </div>
                    </div>

                    <div className='post-text-body'>
                        <span>{props.text}</span>
                    </div>

                    <div className='post-interactions'>
                        <PostInteractions post_id={props._id} likes={props.likes} />
                    </div>

                    <Comments preFetchedComments={props.comments} parentPost={props._id} />

                </div>
            </div>
        </div>

    )
}

export default Post;
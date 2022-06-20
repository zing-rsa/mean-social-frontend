import { usePostComments } from '../../services/comment.service'
import CommentCompose from '../comment-composer/comment-composer';
import Comment from '../comment/comment'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './post.css'
import Loader from '../loader/loader';

function Post(props) {

    const { comments, isLoading, isError, fetchComments } = usePostComments(props._id);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return (
        <div className='post-container'>
            <div className='post'>
                <div className='post-details'>
                    <div className='post-author'>
                        <Link to={`/profile/${props.owner._id}`}>{props.owner.name}&nbsp;{props.owner.surname}</Link>
                    </div>
                    <div className='post-meta'>
                        <span>{props.timestamp}</span>
                    </div>
                </div>
                <div className='post-body'>
                    <span>{props.text}</span>
                </div>
            </div>
            <CommentCompose parent={props._id} refresh={fetchComments} />
            {comments && !isError &&
                comments.map((item, index) =>
                    <Comment key={item._id} {...item} />)
            }
            {isLoading && !isError &&
                <Loader />
            }
            {isError &&
                <div>
                    Oops
                </div>
            }
        </div>

    )
}

export default Post;
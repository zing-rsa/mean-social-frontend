import { usePostComments } from '../../services/comment.service'
import CommentCompose from '../comment-composer/comment-composer';
import Comment from '../comment/comment'
import { useEffect } from 'react';
import './post.css'

function Post(props) {

    // think about lazy loading 
    // comments per post rendered to the screen 

    const { comments, isLoading, isError, fetchComments } = usePostComments(props._id);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return (
        <div className='post-container'>
            <div className='post'>
                <div className='post-details'>
                    <div className='post-author'>
                        <span>{props.owner.name}&nbsp;{props.owner.surname}</span>
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
            {comments &&
                comments.map((item, index) =>
                    <Comment key={item._id} {...item} />)
            }
        </div>

    )
}

export default Post;
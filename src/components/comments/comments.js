import { useEffect, useRef } from 'react';

import { usePostComments } from '../../services/comment.service';
import { Comment, CommentCompose } from '../';

import './comments.css'

function Comments(props) {

    const { comments, setComments, commentCreating, commentDeleting, deleteComment, createComment } = usePostComments();

    const commentSizeTracker = useRef();

    useEffect(() => {
        if (props.preFetchedComments) {
            setComments(props.preFetchedComments);
        }
    }, []);
    return (
        <>
            <CommentCompose parent={props.parentPost} create={createComment} createLoading={commentCreating}/>

            <div ref={commentSizeTracker}>

                { comments &&
                        comments.map((item) =>
                            <Comment key={item._id} isDeleting={commentDeleting && commentDeleting === item._id} delete={() => deleteComment(item._id, props.parentPost)} {...item} />)
                }
            </div>
        </>

    )
}

export default Comments;
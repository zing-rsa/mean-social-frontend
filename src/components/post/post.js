import './post.css'
import Comment from '../comment/comment'
import CommentCompose from '../comment-composer/comment-composer';

function Post(props) {
    return (
        <div className='post-container'>
            <div className='post'>
                <div className='post-details'>
                    <div className='post-author'>
                        <span>{props.owner}</span>
                    </div>
                    <div className='post-meta'>
                        <span>{props.timestamp}</span>
                    </div>
                </div>
                <div className='post-body'>
                    <span>{props.text}</span>
                </div>
            </div>
            <CommentCompose parent={props._id} />
            {
                props.comments.map((item, index) =>
                    <Comment key={item._id} {...item} />)
            }
        </div>

    )
}

export default Post;
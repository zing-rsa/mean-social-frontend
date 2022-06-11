import './comment-composer.css'

function CommentCompose(props) {
    return (
        <div className='comment-composer'>
            <textarea className='comment-composer-body' placeholder="reply..."></textarea>
            <button className='submit-comment'>Reply</button>
        </div>
    )
}

export default CommentCompose;
import './comment.css'

function Comment(props) {
    return (
        <div className='comment'>
            <div className='comment-meta'>
                <div className='author'>{props.owner}</div>
                :&nbsp;
                <div className='timestamp'>{props.timestamp}</div>
            </div>
            <div className='comment-body'>
                <span>{props.text}</span>
            </div>
        </div>
    )
}

export default Comment;
import { useAuth } from '../../providers/auth.provider';
import './comment.css'


function Comment(props) {

    const { user } = useAuth()

    return (
        <div className='comment'>
            <div className='comment-meta'>
                <div className='author'>{props.owner.name}</div>
                :&nbsp;
                <div className='timestamp'>{props.timestamp}</div>
            </div>
            <div className='comment-body'>
                <span>{props.text}</span>
                {(user.isAdmin || user._id === props.owner._id) &&
                    <button onClick={props.delete} >Delete</button>
                }
            </div>
        </div>
    )
}

export default Comment;
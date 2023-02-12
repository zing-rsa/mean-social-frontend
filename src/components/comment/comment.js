import profilePlaceholder from '../../assets/profile-placeholder.png'
import { useAuth } from '../../providers/auth.provider';
import config from '../../config';
import './comment.css'


function Comment(props) {

    const { user } = useAuth()

    return (
        <div className='comment'>
            <img className='comment-avatar' src={props.owner.avatar ? config.media_url + 'avatar/' + props.owner.avatar : profilePlaceholder} />
            <div className='comment-text'>

                <div className='author'>
                    <span>{'@' + props.owner.username + " wrote:"}</span>

                    {(user.isAdmin || user._id === props.owner._id) &&
                        <button className='comment-delete' onClick={props.delete}>Delete</button>
                    }
                </div>
                <div className='comment-body'>
                    <span>{props.text}</span>
                </div>
            </div>

        </div>

    )
}

export default Comment;
import profilePlaceholder from '../../assets/profile-placeholder.png'
import DeleteButton from '../delete-button/delete-button'
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


                </div>
                <div className='comment-body'>
                    <span>{props.text}</span>
                </div>
            </div>

            {(user.isAdmin || user._id === props.owner._id) &&
                <DeleteButton title={'Delete comment'} classes='comment-delete' cb={props.delete} />
            }

        </div>

    )
}

export default Comment;
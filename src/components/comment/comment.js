import DeleteButton from '../delete-button/delete-button'
import { useAuth } from '../../providers/auth.provider';
import Avatar from '../avatar/avatar';
import './comment.css'


function Comment(props) {

    const { user } = useAuth()

    return (
        <div className='comment'>
            <Avatar classes={'comment-avatar'} src={props.owner.avatar} link={`/profile/${props.owner._id}`} />
            <div className='comment-text'>

                <div className='author'>
                    <span>{props.owner.username + " wrote:"}</span>
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
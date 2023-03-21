import { useAuth } from '../../providers/auth.provider';
import { DeleteButton, Avatar, Loader} from '../'
import './comment.css'


function Comment(props) {

    const { user } = useAuth()

    return (
        <div className='comment'>
            {props.isDeleting && <div className='comment-deleting-cover'></div>}
            <Avatar classes={'comment-avatar'} src={props.owner.avatar} link={`/profile/${props.owner._id}`} />
            <div className='comment-text'>

                <div className='author'>
                    <span>{props.owner.username + " wrote:"}</span>
                </div>
                <div className='comment-body'>
                    <span>{props.text}</span>
                </div>
            </div>

            {!props.isDeleting && (user.isAdmin || user._id === props.owner._id)  &&
                <DeleteButton title={'Delete comment'} classes='comment-delete' cb={props.delete} />
            }

            {props.isDeleting &&
                <div className='comment-deleting-loader-container'>
                    <Loader classes={'comment-deleting-loader'}/>
                </div>
            }

        </div>

    )
}

export default Comment;
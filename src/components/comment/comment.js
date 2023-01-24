import { getToken } from '../../services/storage.service';
import { useAuth } from '../../providers/auth.provider';
import api from '../../services/axios.service';
import config from '../../config';
import './comment.css'


function Comment(props) {

    const { user } = useAuth()

    const deleteComment = async () => {
        try {
            await api({
                method: "DELETE",
                url: 'comments/delete',
                headers: config.headers(getToken()),
                data: {
                    _id: props._id
                }
            });

            if (props.refresh) {
                props.refresh(props.parent);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='comment'>
            <div className='comment-meta'>
                <div className='author'>{props.owner.name}</div>
                :&nbsp;
                <div className='timestamp'>{props.timestamp}</div>
            </div>
            <div className='comment-body'>
                <span>{props.text}</span>
                {user.isAdmin &&
                    <button onClick={deleteComment} >Delete</button>
                }
            </div>
        </div>
    )
}

export default Comment;
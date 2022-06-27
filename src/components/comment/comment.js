import { useAuth } from '../../providers/auth.provider';
import axios from 'axios';
import config from '../../config';

import './comment.css'

function Comment(props) {

    const {token} = useAuth();

    const deleteComment = async () => {
        try {
            const res = await axios({
                method: "DELETE",
                url: config.api_url + 'comments/delete',
                headers: config.headers(token),
                data: {
                    _id: props._id
                }
            });

            if (props.refresh) {
                props.refresh();
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
                <button onClick={deleteComment} >Delete</button>
            </div>
        </div>
    )
}

export default Comment;
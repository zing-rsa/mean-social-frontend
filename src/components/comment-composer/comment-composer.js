import { getToken } from '../../services/storage.service';
import api from '../../services/axios.service'
import config from '../../config'
import './comment-composer.css'


function CommentCompose({ parent, refresh }) {

    const createComment = async (text) => {
        try {
            await api({
                method: "POST",
                url: 'comments/create',
                headers: config.headers(getToken()),
                data: {
                    text: text,
                    parent: parent
                }
            })

            if (refresh) {
                refresh();
            }

        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        createComment(e.target.comment.value);

        e.target.reset();
    }

    return (
        <div className='comment-composer'>
            <form onSubmit={handleSubmit}>
                <input type='text' name='comment' className='comment-composer-body' placeholder="reply..."></input>
                <button className='submit-comment'>Reply</button>
            </form>
        </div>
    )
}

export default CommentCompose;
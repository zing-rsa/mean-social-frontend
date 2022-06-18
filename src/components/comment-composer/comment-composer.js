import { useAuth } from '../../providers/auth.provider';
import { useState } from 'react';
import axios from 'axios'
import config from '../../config'
import './comment-composer.css'

function CommentCompose({parent, refresh}) {

    const { token } = useAuth();
    const [text, setText] = useState('');

    const createComment = async () => {
        try {
            await axios({
                method: "POST",
                url: config.api_url + 'comments/create',
                headers: config.headers(token),
                data: {
                    text: text,
                    parent: parent
                }
            })

            if (refresh){
                refresh();
            }

        } catch (e) {
            console.log(e);
        }
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
    }


    return (
        <div className='comment-composer'>
            <textarea className='comment-composer-body' placeholder="reply..." onChange={handleTextChange}></textarea>
            <button className='submit-comment' onClick={createComment}>Reply</button>
        </div>
    )
}

export default CommentCompose;
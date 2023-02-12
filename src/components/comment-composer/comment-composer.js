import { useCallback, useRef } from 'react';

import SecondaryButton from '../button-secondary/button-secondary'
import { getToken } from '../../services/storage.service';
import api from '../../services/axios.service'
import config from '../../config'
import './comment-composer.css'


function CommentCompose({ parent, refresh }) {

    const postButton = useRef(null);

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
                refresh(parent);
            }

        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        createComment(e.target.comment.value);

        e.target.reset();
    }, []);

    const updateButton = (show) => {
        postButton.current.style.opacity = show ? '1' : '0'; 
    }

    return (
        <div className='comment-composer'>
            <form onSubmit={handleSubmit}>
                <input type='text' name='comment' className='comment-composer-body' placeholder="reply..." 
                onFocus={() => updateButton(true)} onBlur={() => updateButton(false)}></input>

                <SecondaryButton refs={postButton} classes={'submit-comment'} text={'Post'} />
            </form>
        </div>
    )
}

export default CommentCompose;
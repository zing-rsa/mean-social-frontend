import { useAuth } from '../../providers/auth.provider';
import { useState } from 'react';
import axios from 'axios'
import config from '../../config'
import './comment-composer.css'
import { getToken } from '../../services/storage.service';

function CommentCompose({ parent, refresh }) {


    const createComment = async (text) => {
        try {
            await axios({
                method: "POST",
                url: config.api_url + 'comments/create',
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
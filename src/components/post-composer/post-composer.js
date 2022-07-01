import { useAuth } from '../../providers/auth.provider'
import { useState } from 'react';
import config from '../../config'
import './post-composer.css'
import axios from 'axios';

function PostCompose({ refresh }) {

    const { token } = useAuth();

    const createPost = async (text) => {
        try {
            await axios({
                method: "POST",
                url: config.api_url + 'posts/create',
                headers: config.headers(token),
                data: {
                    text: text
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

        createPost(e.target.post.value);

        e.target.reset();
    }

    return (
        <div className='post-compose'>
            <form onSubmit={handleSubmit}>
                <input type='text' name='post' className='compose-body' placeholder='Post something...' />
                <div className='compose-operations'>
                    <button className='submit-post'>Post</button>
                </div>
            </form>
        </div>
    )
}

export default PostCompose;
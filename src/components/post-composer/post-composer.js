import { useAuth } from '../../providers/auth.provider'
import { useState } from 'react';
import config from '../../config'
import './post-composer.css'
import axios from 'axios';

function PostCompose({ refresh }) {

    const { token } = useAuth();
    const [text, setText] = useState('');

    const createPost = async () => {
        try {
            await axios({
                method: "POST",
                url: config.api_url + 'posts/create',
                headers: config.headers(token),
                data: {
                    text: text
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
        <div className='post-compose'>
            <textarea className='compose-body' placeholder='Post something...' onChange={handleTextChange} />
            <div className='compose-operations'>
                <button onClick={createPost} className='submit-post'>Post</button>
            </div>
        </div>
    )
}

export default PostCompose;
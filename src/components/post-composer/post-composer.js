import axios from 'axios';
import { useState } from 'react';
import './post-composer.css'
import config from '../../config'
import { useAuth } from '../../providers/auth.provider'

function PostCompose() {

    const { token } = useAuth();
    const [text, setText] = useState('');

    const onCreate = () => {

        console.log('creating post: ', text);

        const createPost = async () => {
            try {
                const result = await axios({
                    method: "POST",
                    url: config.api_url + 'posts/create',
                    headers: config.headers(token),
                    data: {
                        text: text
                    }
                })


            } catch (e) {
                console.log(e);
            }
        }

        createPost();
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    return (
        <div className='post-compose'>
            <textarea className='compose-body' placeholder='Post something...' onChange={handleTextChange} />
            <div className='compose-operations'>
                <button onClick={onCreate} className='submit-post'>Post</button>
            </div>
        </div>
    )
}

export default PostCompose;
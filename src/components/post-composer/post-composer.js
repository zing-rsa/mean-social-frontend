import { useState } from 'react';
import './post-composer.css'

function PostCompose() {

    const [text, setText] = useState('');

    const createPost = () => {
        //create post
        console.log('creating post: ', text);
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
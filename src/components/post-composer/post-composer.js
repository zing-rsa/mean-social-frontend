import { getToken } from '../../services/storage.service';
import api from '../../services/axios.service';
import config from '../../config'
import './post-composer.css'


function PostCompose({ create }) {
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const post = new FormData();

        if (e.target.image.files[0])
            post.append('image', e.target.image.files[0]);

        post.append('text', e.target.text.value);

        create(post);

        e.target.reset();
    }

    return (
        <div className='post-compose'>
            <form onSubmit={handleSubmit}>
                <input type='text' name='text' className='compose-body' placeholder='Post something...' />
                <input type='file' name='image' />
                <div className='compose-operations'>
                    <button className='submit-post'>Post</button>
                </div>
            </form>
        </div>
    )
}

export default PostCompose;
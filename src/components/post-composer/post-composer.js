import { getToken } from '../../services/storage.service';
import api from '../../services/axios.service';
import config from '../../config'
import './post-composer.css'


function PostCompose({ refresh, user_id}) {

    const createPost = async (post) => {
        try {
            await api({
                method: "POST",
                url: 'posts/create',
                headers: config.headers(getToken()),
                data: post
            })

            if (refresh) {
                refresh(user_id);
            }

        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const post = new FormData();

        if (e.target.image.files[0])
            post.append('image', e.target.image.files[0]);

        post.append('text', e.target.text.value);

        createPost(post);

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
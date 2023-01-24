import { getToken } from '../../services/storage.service';
import api from '../../services/axios.service';
import config from '../../config'
import './post-composer.css'


function PostCompose({ refresh, user_id}) {

    const createPost = async (text) => {
        try {
            await api({
                method: "POST",
                url: 'posts/create',
                headers: config.headers(getToken()),
                data: { 
                    text: text
                }
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
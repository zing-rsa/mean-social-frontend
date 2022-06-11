import PostCompose from "../../components/post-composer/post-composer";
import { mock_posts } from "../../services/post.service";
import Loader from "../../components/loader/loader";
import { useEffect, useState } from "react";
import Post from '../../components/post/post'
import './feed.css'

function Feed() {

    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {

        const fetchPosts = async () => {
            const data = await mock_posts();
            setPosts(data);
            setIsLoading(false);
        };

        try {
            setIsLoading(true);
            fetchPosts();
        } catch (e) {
            setIsLoading(false);
            setFetchError(true);
            console.log('error while loading post info')
        }
    }, []);

    return (
        <div className='feed-container'>

            {posts && 
            <div className='posts-list'>
                <PostCompose />
                {posts && posts.map((item, index) =>
                    <Post key={item._id} {...item} />)}
            </div>
            }

            {isLoading &&
                <div className='feed-loader'>
                    <Loader />
                </div>
            }
        </div>
    )
}

export default Feed;
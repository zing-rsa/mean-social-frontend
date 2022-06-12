import PostCompose from "../../components/post-composer/post-composer";
import { getFeedPosts } from "../../services/post.service";
import { useAuth } from "../../providers/auth.provider";
import Loader from "../../components/loader/loader";
import { useEffect, useState } from "react";
import Post from '../../components/post/post'
import './feed.css'

function Feed() {
    const { token } = useAuth();
    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {

        const fetchPosts = async () => {
            const data = await getFeedPosts(token);
            setPosts(data);
            setIsLoading(false);
        };
        console.log('starting to fetch posts')
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
                <Loader />
            }
        </div>
    )
}

export default Feed;
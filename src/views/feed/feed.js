import PostCompose from "../../components/post-composer/post-composer";
import { useFeedPosts } from "../../services/post.service";
import Loader from "../../components/loader/loader";
import { useEffect } from "react";
import Post from '../../components/post/post'
import Error from "../../components/error/error";
import './feed.css'

function Feed() {

    const { posts, isLoading, isError, fetchPosts } = useFeedPosts();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <div className='feed-container'>

            {posts &&
                <div className='posts-list'>
                    <PostCompose refresh={fetchPosts} />
                    {posts && 
                        posts.map((item, index) =>
                            <Post key={item._id} refresh={fetchPosts} {...item}  /> 
                        )
                    }
                </div>
            }

            {isLoading &&
                <Loader />
            }

            {isError && !isLoading &&
                <Error />
            }
        </div>
    )
}

export default Feed;
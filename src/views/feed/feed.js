import PostCompose from "../../components/post-composer/post-composer";
import { useFeedPosts } from "../../services/post.service";
import Loader from "../../components/loader/loader";
import { useEffect } from "react";
import Post from '../../components/post/post'
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
                            <Post key={item._id} {...item} /> 
                        )
                    }
                </div>
            }

            {isLoading &&
                <Loader />
            }

            {isError && !isLoading &&
                <div>
                    Oops
                </div>
            }
        </div>
    )
}

export default Feed;
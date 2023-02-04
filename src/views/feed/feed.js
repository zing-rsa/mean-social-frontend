import PostCompose from "../../components/post-composer/post-composer";
import { usePosts } from "../../services/post.service";
import Loader from "../../components/loader/loader";
import { useEffect } from "react";

import Error from "../../components/error/error";
import Post from '../../components/post/post'
import './feed.css'

function Feed() {

    const { posts, isLoading, isError, fetchPosts, createPost, deletePost } = usePosts();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <div className='feed-container'>

            {posts &&
                <div className='posts-list'>
                    <PostCompose create={createPost} />
                    {posts && 
                        posts.map((item) =>
                            <Post key={item._id} delete={deletePost} {...item}  /> 
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
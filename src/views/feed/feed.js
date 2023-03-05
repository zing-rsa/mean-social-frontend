import PostCompose from "../../components/post-composer/post-composer";
import { usePosts } from "../../services/post.service";
import Loader from "../../components/loader/loader";
import { useEffect } from "react";

import Error from "../../components/error/error";
import Post from '../../components/post/post';
import './feed.css';

function Feed() {

    const { posts, isLoading, fetchPosts, createPost, deletePost } = usePosts();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <div className='feed-container'>

            <div className='posts-list'>
                <PostCompose create={createPost} />

                {isLoading &&
                    <Loader classes={'feed-loader'} />
                }

                {!isLoading && posts &&
                    <>
                        {posts.map((item) =>
                            <Post key={item._id} delete={() => deletePost(item._id)} {...item} />
                        )}
                        <div className='feed-end'>
                            {posts.length === 0 ? "Nothing to see here..." : "Thats all for now..."}
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export default Feed;
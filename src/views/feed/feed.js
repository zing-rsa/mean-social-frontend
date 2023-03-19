import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import { PostComposer, Post, Loader } from "../../components";
import { usePosts } from "../../services/post.service";
import './feed.css';

function Feed() {

    const { posts, isLoading, postDeleting, postCreating, fetchPosts, createPost, deletePost } = usePosts();

    const location = useLocation();
    const postList = useRef();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        if(posts && location?.state?.scrollTo ) {
            let post = document.getElementById(location.state.scrollTo)

            if(post) {
                post.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
                post.style.boxShadow = 'rgba(100, 100, 111, 0.9) 0px 7px 29px 0px'
                setTimeout(() => post.style.boxShadow = 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', 1000)
            }
        }
    }, [posts, location]);

    return (
        <div className='feed-container'>

            <div className='posts-list' ref={postList}>
                <PostComposer create={createPost} isCreating={postCreating} />

                {isLoading &&
                    <Loader classes={'feed-loader'} />
                }

                {!isLoading && posts &&
                    <>
                        {posts.map((item) =>
                            <Post key={item._id} isDeleting={postDeleting && postDeleting === item._id} delete={() => deletePost(item._id)} {...item} />
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
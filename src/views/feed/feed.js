import PostCompose from "../../components/post-composer/post-composer";
import { getFeedPosts, useFeedPosts } from "../../services/post.service";
import { useAuth } from "../../providers/auth.provider";
import Loader from "../../components/loader/loader";
import { useEffect, useState } from "react";
import Post from '../../components/post/post'
import './feed.css'

function Feed() {

    const { posts, isLoading, isError } = useFeedPosts();

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

            {isError && !isLoading &&
                <div>
                    Oops
                </div>
            }
        </div>
    )
}

export default Feed;
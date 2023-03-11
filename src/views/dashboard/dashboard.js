import { useEffect } from 'react';

import { usePosts } from '../../services/post.service';
import { Loader, Post } from '../../components';
import './dashboard.css'

function Dashboard() {

    const { posts, postsLoading, fetchPosts, deletePost } = usePosts();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (

        <div className='dash-container'>


            <div className='dash-header'>
                <div className='dash-header-header'><span>Dashboard</span></div>
                <div><span>Num users: 3</span></div>
                <div><span>Daily active users: 2</span></div>
                <div><span>New users: 1</span></div>
                <div><span>Posts per user: 1</span></div>
            </div>
            <div className='dash-body'>
                <div className='dash-body-header'>
                    <span>Latest activity:</span>
                </div>

                <div className='dash-posts-list'>

                    {postsLoading &&
                        <Loader classes={'dash-loader'} />
                    }

                    {!postsLoading && posts && (posts.length === 0) &&
                        <div>--- No posts ---</div>
                    }

                    {!postsLoading && posts && 
                        posts.map((item) =>
                            <Post key={item._id} delete={() => deletePost(item._id)} {...item} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
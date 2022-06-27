import './dashboard.css'
import { useFeedPosts } from '../../services/post.service';
import { useEffect } from 'react';
import Post from '../../components/post/post';
import Loader from '../../components/loader/loader';

function Dashboard() {

    const { posts, postsLoading, postsError, fetchPosts } = useFeedPosts();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);


    return (
        <div className='dash-container'>
            <div className='dash-header'>
                <div><h1>Dashboard</h1></div>
                <div><span>Num users: 3</span></div>
                <div><span>Daily active users: 2</span></div>
                <div><span>New users: 1</span></div>
                <div><span>Posts per user: 1</span></div>
            </div>
            <div className='dash-body'>

                <h2>Latest activity:</h2>

                {posts &&
                    <div className='dash-posts-list'>
                        {(posts.length === 0) &&
                            <div>--- No posts ---</div>
                        }

                        {posts && posts.map((item, index) =>
                            <Post key={item._id} refresh={fetchPosts} {...item} />)}

                    </div>
                }

                {postsLoading &&
                    <Loader />
                }

                {postsError &&
                    <div>
                        Oops
                    </div>
                }


            </div>
        </div>
    )
}

export default Dashboard;
import PostCompose from '../../components/post-composer/post-composer';
import { useUserPosts } from '../../services/post.service'
import { useFollows } from '../../services/follows.service'
import avatar from '../../assets/profile-placeholder.png'
import { useAuth } from "../../providers/auth.provider"
import Follows from '../../components/follows/follows'
import Loader from '../../components/loader/loader';
import Post from '../../components/post/post';
import { useEffect } from "react";
import './profile.css'

function Profile() {
    const { user } = useAuth();

    const { posts, isLoading, isError, fetchUserPosts } = useUserPosts(user._id);

    useEffect(() => {
        fetchUserPosts();
    }, [fetchUserPosts]);

    return (
        <div className='profile-container'>
            <div className='profile-cover'>
                {/* <img>  */}
            </div>
            <div className='profile-avatar'>
                <img src={avatar} />
            </div>
            <div className='profile-details'>
                <div className='profile-details-header'>
                    <div className='profile-details-name'>
                        <span>{`${user.name} ${user.surname}`}</span>
                    </div>
                    <div className='follower-container'>
                        <Follows _id={user._id} />
                    </div>
                </div>
                <div className='profile-details-footer'>
                    <div className='profile-details-bio'>
                        <span>{user.bio}</span>
                    </div>
                </div>
            </div>

            {posts &&
                <div className='profile-posts-list'>
                    <PostCompose refresh={fetchUserPosts} />
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

export default Profile;
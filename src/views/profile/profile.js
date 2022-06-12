import PostCompose from '../../components/post-composer/post-composer';
import { mock_userPosts } from '../../services/post.service'
import avatar from '../../assets/profile-placeholder.png'
import { useAuth } from "../../providers/auth.provider"
import Loader from '../../components/loader/loader';
import Post from '../../components/post/post';
import { useEffect, useState } from "react";
import './profile.css'

function Profile() {
    const { user } = useAuth();

    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const fetchUserPosts = async (userId) => {
            const data = await mock_userPosts(userId);
            setPosts(data);
            setIsLoading(false);
        };

        try {
            setIsLoading(true);
            fetchUserPosts(user._id);
        } catch (e) {
            setIsLoading(false);
            setFetchError(true);
            console.log('error while loading post info')
        }
    }, [])

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
                    <div className='profile-details-followers'>
                        <div className='follow-display'>{'103 Followers'}</div>
                        <div className='follow-display'>{'Following 1003'}</div>
                    </div>
                    <div className='follow-button'>
                        <button>Follow</button>
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

export default Profile;
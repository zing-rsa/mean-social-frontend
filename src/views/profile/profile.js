import PostCompose from '../../components/post-composer/post-composer';
import { useUserPosts } from '../../services/post.service'
import { useFollows } from '../../services/follows.service'
import { useUser } from '../../services/user.service'
import avatar from '../../assets/profile-placeholder.png'
import { useAuth } from "../../providers/auth.provider"
import Follows from '../../components/follows/follows'
import Loader from '../../components/loader/loader';
import Post from '../../components/post/post';
import { useEffect } from "react";
import { useParams } from 'react-router-dom'
import './profile.css'

function Profile() {
    const { user } = useAuth();
    const { id: viewed_user_id } = useParams();

    const { user: viewed_user, isLoading: userLoading, isError: userError, fetchUser } = useUser(viewed_user_id);
    const { posts: posts, isLoading: postsLoading, isError: postsError, fetchUserPosts } = useUserPosts(viewed_user_id);

    const profileLoadError = userError || postsError;

    useEffect(() => {
        fetchUser();
        fetchUserPosts();
    }, [fetchUser, fetchUserPosts]);

    return (
        <div className='profile-container'>

            {viewed_user && !profileLoadError &&
                <>
                    <div className='profile-cover'>
                        {/* <img>  */}
                    </div>
                    <div className='profile-avatar'>
                        <img src={avatar} />
                    </div>
                    <div className='profile-details'>
                        <div className='profile-details-header'>
                            <div className='profile-details-name'>
                                <span>{`${viewed_user.name} ${viewed_user.surname}`}</span>
                            </div>
                            <div className='follower-container'>
                                <Follows _id={viewed_user._id} />
                            </div>
                        </div>
                        <div className='profile-details-footer'>
                            <div className='profile-details-bio'>
                                <span>{viewed_user.bio}</span>
                            </div>
                        </div>
                    </div>
                </>
            }

            {userLoading && !profileLoadError &&
                <Loader />
            }

            {posts && !profileLoadError &&
                <div className='profile-posts-list'>

                    {
                        viewed_user._id == user._id && <PostCompose refresh={fetchUserPosts} />
                    }

                    {posts && posts.map((item, index) =>
                        <Post key={item._id} {...item} />)}
                </div>
            }

            {postsLoading && !profileLoadError &&
                <Loader />
            }

            {profileLoadError &&
                <div>
                    Oops
                </div>
            }
        </div>
    )
}

export default Profile;
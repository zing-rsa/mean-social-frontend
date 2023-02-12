import { useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom'

import PostCompose from '../../components/post-composer/post-composer';
import { usePosts } from '../../services/post.service'
import { useProfiles } from '../../services/user.service'
import avatar from '../../assets/profile-placeholder.png'
import { useAuth } from "../../providers/auth.provider"
import Follows from '../../components/follows/follows'
import Loader from '../../components/loader/loader';
import Post from '../../components/post/post';
import Error from '../../components/error/error';
import config from '../../config';
import './profile.css'

function Profile() {
    const { user } = useAuth();
    const { id: viewed_user_id } = useParams();

    const { posts, isLoading: postsLoading, isError: postsError, fetchProfilePosts, createPost, createProfilePost, deleteProfilePost } = usePosts();
    const { profile: viewed_user, isLoading: userLoading, isError: userError, fetchProfile } = useProfiles();

    const populateProfileData = useCallback(async () => {
        await fetchProfile(viewed_user_id);
        await fetchProfilePosts(viewed_user_id);
    }, [fetchProfile, fetchProfilePosts, user]);

    useEffect(() => {
        populateProfileData();
    }, [populateProfileData]);

    return (
        <div className='profile-container'>

            {viewed_user && !userError && !userLoading &&
                <>
                <div className='profile-header'>
                    <div className='profile-cover'>
                        { viewed_user.banner && <img alt='' src={config.media_url + 'banner/' + viewed_user.banner} /> }
                    </div>
                    <div className='profile-avatar'>
                        <img alt='' src={viewed_user.avatar ? config.media_url + 'avatar/' + viewed_user.avatar : avatar} />
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
                </div>

                    {posts &&
                        <div className='profile-posts-list'>

                            { viewed_user._id === user._id && 
                                <PostCompose create={createProfilePost} profile_id={viewed_user._id} />
                            }

                            {posts && 
                                posts.map((item, index) =>
                                    <Post key={item._id} delete={(post_id) => deleteProfilePost(post_id, user._id)} {...item} />)
                            }
                        </div>
                    }

                    {postsLoading &&
                        <Loader />
                    }

                    {postsError &&
                        <Error />
                    }
                </>
            }

            {userLoading &&
                <Loader />
            }

            {userError && !userLoading &&
                <div>
                    Oops
                </div>
            }
        </div>
    )
}

export default Profile;
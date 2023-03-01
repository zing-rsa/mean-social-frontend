import { useEffect, useCallback, useRef } from "react";
import { useParams } from 'react-router-dom'

import PostCompose from '../../components/post-composer/post-composer';
import { usePosts } from '../../services/post.service'
import { useProfiles } from '../../services/user.service'
import { useAuth } from "../../providers/auth.provider"
import Follows from '../../components/follows/follows'
import Loader from '../../components/loader/loader';
import Avatar from "../../components/avatar/avatar";
import Post from '../../components/post/post';
import Error from '../../components/error/error';
import config from '../../config';
import './profile.css'

function Profile() {
    const { user } = useAuth();
    const { id: viewed_user_id } = useParams();

    const { posts, isLoading: postsLoading, isError: postsError, fetchProfilePosts, createPost, createProfilePost, deleteProfilePost } = usePosts();
    const { profile: viewed_user, isLoading: userLoading, isError: userError, fetchProfile, updateProfile } = useProfiles();

    const form = useRef(null);

    const populateProfileData = useCallback(async () => {
        await fetchProfile(viewed_user_id);
        await fetchProfilePosts(viewed_user_id);
    }, [fetchProfile, fetchProfilePosts, user]);

    useEffect(() => {
        populateProfileData();
    }, [populateProfileData]);

    const handleProfileUpdate = () => {
        form.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
        )
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('_id', user._id);

        if (e.target.avatar?.files[0])
            data.append('avatar', e.target.avatar.files[0]);
        if (e.target.banner?.files[0])
            data.append('banner', e.target.banner.files[0]);

        await updateProfile(data);

        if (e.target.avatar?.files[0])
            window.location.reload();
    }, []);

    return (
        <div className='profile-container'>

            {viewed_user && !userError && !userLoading &&
                <>
                    <div className='profile-scroller'>

                        <div className='profile-header'>
                            <form ref={form} onSubmit={handleSubmit} onChange={handleProfileUpdate}>

                                {viewed_user._id === user._id &&
                                    <div className='update-cover'>
                                        <label>
                                            <input type='file' name='banner' />
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </label>
                                    </div>
                                }
                                <div className='profile-cover'>
                                    {viewed_user.banner && <img alt='' src={config.media_url + 'banner/' + viewed_user.banner} />}
                                </div>

                                {viewed_user._id === user._id &&
                                    <div className='update-avatar'>
                                        <label>
                                            <input type='file' name='avatar' />
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </label>
                                    </div>
                                }

                                <div className='profile-avatar'>
                                    <Avatar classes={'profile-avatar-img'} src={viewed_user.avatar} />
                                </div>
                            </form>
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

                        <div className='profile-post-container'>
                            {viewed_user._id === user._id &&
                                <PostCompose create={createProfilePost} profile_id={viewed_user._id} />
                            }

                            {posts &&
                                posts.map((item) =>
                                    <Post key={item._id} delete={() => deleteProfilePost(item._id, user._id)} {...item} />)
                            }
                        </div>
                    </div>

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
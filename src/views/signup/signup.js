import { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton, Loader } from '../../components';
import { useAuth } from '../../providers/auth.provider'
import './signup.css';

function Signup() {

    const { signup, authenticated } = useAuth();
    const navigate = useNavigate();

    const [bannerLoading, setBannerLoading] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);

    const avatarPreview = useRef(null);
    const avatarPreviewContainer = useRef(null);

    const bannerPreview = useRef(null);
    const bannerPreviewContainer = useRef(null);

    useEffect(() => {
        if (authenticated)
            navigate('/feed');
    }, [authenticated]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        if (e.target.avatar.files[0])
            data.append('avatar', e.target.avatar.files[0]);
        if (e.target.banner.files[0])
            data.append('banner', e.target.banner.files[0]);

        data.append('name', e.target.name.value);
        data.append('surname', e.target.surname.value);
        data.append('email', e.target.email.value);
        data.append('username', e.target.username.value);
        data.append('pass', e.target.pass.value);
        data.append('bio', e.target.bio.value);

        signup(data);
    }

    const handleAvatarUpload = useCallback((e) => {
        setAvatarLoading(true);
        if (e.target.files) {
            var reader = new FileReader();

            reader.onload = (e) => {
                setAvatarLoading(false);
                avatarPreview.current.setAttribute('src', e.target.result);
            }

            avatarPreviewContainer.current.style.display = 'block';
            reader.readAsDataURL(e.target.files[0]);
        }
    }, []);

    const handleBannerUpload = useCallback((e) => {
        setBannerLoading(true);
        if (e.target.files) {
            var reader = new FileReader();

            reader.onload = (e) => {
                setBannerLoading(false);
                bannerPreview.current.setAttribute('src', e.target.result);
            }

            bannerPreviewContainer.current.style.display = 'block';
            reader.readAsDataURL(e.target.files[0]);
        }
    }, []);

    return (
        <div className='signup-container' >
            <form className='signup-form' onSubmit={handleSubmit}>
                <div className='signup-header'>Sign up</div>
                <div className='signup-form-top'>
                    <div className='grid-item signup-upload'>
                        <label>
                            <input type='file' name='avatar' onChange={(e) => handleAvatarUpload(e)} />
                            Upload avatar
                            <div ref={avatarPreviewContainer} className='upload-preview-container'>
                                { avatarLoading && <Loader classes={'signup-upload-loader'} />}
                                <img ref={avatarPreview} className='upload-preview' />
                            </div>
                        </label>
                    </div>
                    <div className='grid-item signup-upload'>
                        <label>
                            <input type='file' name='banner' onChange={(e) => handleBannerUpload(e)} />
                            Upload banner

                            <div ref={bannerPreviewContainer} className='upload-preview-container'>
                                { bannerLoading && <Loader classes={'signup-upload-loader'} /> }
                                <img ref={bannerPreview} className='upload-preview' />
                            </div>
                        </label>
                    </div>
                    <input className='grid-item signup-text' type='text' name='name' placeholder='name'></input>
                    <input className='grid-item signup-text' type='text' name='surname' placeholder='surname'></input>
                    <textarea className='grid-item bio-compose' type='text' name='bio' placeholder='tell us about yourself...'></textarea>
                </div>
                <div className='signup-form-bottom'>
                    <input className='grid-item signup-text' type='text' name='email' placeholder='email'></input>
                    <span className='grid-item signup-text'>@<input type='text' name='username' placeholder='username'></input></span>
                    <input className='grid-item signup-text' type='password' name='pass' placeholder='pass'></input>
                </div>

                <PrimaryButton classes={'signup-button'} text={'Sign up'} />
            </form>
        </div >
    )
}

export default Signup;
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

    const [avatarInvalid, setAvatarInvalid] = useState(false);
    const [bannerInvalid, setBannerInvalid] = useState(false);
    const [nameInvalid, setNameInvalid] = useState(false);
    const [surnameInvalid, setSurnameInvalid] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [usernameInvalid, setUsernameInvalid] = useState(false);
    const [passInvalid, setPassInvalid] = useState(false);

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
        if (e.target.files[0]) {
            avatarPreview.current.removeAttribute('src')
            avatarPreviewContainer.current.style.display = 'none';

            if (e.target.files[0].size > 2000000) {
                setAvatarInvalid(true)
                return;
            } else {
                setAvatarInvalid(false);
            }

            setAvatarLoading(true);

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
        if (e.target.files[0]) {

            if (e.target.files[0].size > 2000000) {
                setBannerInvalid(true);
                return;
            } else {
                setAvatarInvalid(false);
            }

            setBannerLoading(true);

            var reader = new FileReader();

            reader.onload = (e) => {
                setBannerLoading(false);
                bannerPreview.current.setAttribute('src', e.target.result);
            }

            bannerPreviewContainer.current.style.display = 'block';
            reader.readAsDataURL(e.target.files[0]);
        }
    }, []);

    const validateUserInput = useCallback((value, field) => {

        switch (field) {
            case 'name':
                setNameInvalid(!/^[A-Za-z]{2,}$/.test(value));
                break;
            case 'surname':
                setSurnameInvalid(!/^[A-Za-z]{2,}$/.test(value));
                break;
            case 'email':
                setEmailInvalid(!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(value));
                break;
            case 'username':
                setUsernameInvalid(!/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/.test(value));
                break;
            case 'pass':
                setPassInvalid(!/^[a-zA-Z0-9_!\-.@*#$^&]{5,16}$/.test(value));
                break;
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
                                {avatarLoading && <Loader classes={'signup-upload-loader'} />}
                                <img ref={avatarPreview} className='upload-preview' />
                            </div>
                        </label>
                    </div>
                    {avatarInvalid &&
                        <div className='validation-error-container'>
                            <div className='validation-error'>Max 2MB</div>
                        </div>
                    }
                    <div className='grid-item signup-upload'>
                        <label>
                            <input type='file' name='banner' onChange={(e) => handleBannerUpload(e)} />
                            Upload banner

                            <div ref={bannerPreviewContainer} className='upload-preview-container'>
                                {bannerLoading && <Loader classes={'signup-upload-loader'} />}
                                <img ref={bannerPreview} className='upload-preview' />
                            </div>
                        </label>
                    </div>
                    {bannerInvalid &&
                        <div className='validation-error-container'>
                            <div className='validation-error'>Max 2MB</div>
                        </div>
                    }
                    <input className='grid-item signup-text' type='text' name='name' placeholder='name'
                        onBlur={(e) => validateUserInput(e.target.value, 'name')}></input>
                    {nameInvalid &&
                        <div className='validation-error-container'>
                            <div className='validation-error'>Invalid name</div>
                        </div>
                    }
                    <input className='grid-item signup-text' type='text' name='surname' placeholder='surname'
                        onBlur={(e) => validateUserInput(e.target.value, 'surname')}></input>
                    {surnameInvalid &&
                        <div className='validation-error-container'>
                            <div className='validation-error'>Invalid surname</div>
                        </div>
                    }
                    <textarea className='grid-item bio-compose' type='text' name='bio' placeholder='write a bio...'></textarea>
                </div>
                <div className='signup-form-bottom'>
                    <input className='grid-item signup-text' type='text' name='email' placeholder='email'
                        onBlur={(e) => validateUserInput(e.target.value, 'email')}></input>
                    {emailInvalid &&
                        <div className='validation-error-container'>
                            <div className='validation-error'>Invalid email</div>
                        </div>
                    }
                    <div className='grid-item signup-text username-container'>
                        <span className='username-at'>@</span>
                        <input type='text' name='username' placeholder='username'
                            onBlur={(e) => validateUserInput(e.target.value, 'username')}></input>
                    
                    </div>
                    {usernameInvalid &&
                        <div className='validation-error-container'>
                            <div className='validation-error'>(3-20) Allowed: <b>_ - .</b> </div>
                        </div>
                    }
                    <input className='grid-item signup-text' type='password' name='pass' placeholder='pass'
                        onBlur={(e) => validateUserInput(e.target.value, 'pass')}></input>
                    {passInvalid &&
                        <div className='validation-error-container'>
                            <div className='validation-error'>(5-16)</div>
                        </div>
                    }
                </div>

                <PrimaryButton classes={'signup-button'} text={'Sign up'} />
            </form>
        </div >
    )
}

export default Signup;
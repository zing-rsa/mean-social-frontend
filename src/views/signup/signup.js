import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAuth } from '../../providers/auth.provider'
import Loader from '../../components/loader/loader';
import { useState } from 'react';
import config from '../../config'
import axios from 'axios';
import './signup.css';
import PrimaryButton from '../../components/button-primary/button-primary';

function Signup() {

    const { login, authLoading, authenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

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
        data.append('pass', e.target.pass.value);
        data.append('bio', e.target.bio.value);

        postUser(data);

    }

    const postUser = async (user) => {
        setIsLoading(true);

        try {
            const res = await axios({
                method: "POST",
                url: config.api_url + 'auth/signup',
                data: user
            });

            if (res.status === 201) {

                await login(user.get('email'), user.get('pass'));
            }
        } catch (e) {
            setIsError(true);
            setIsLoading(false);
            console.log(e);
        }

    }

    return (
        <>
            {!authLoading && !isLoading &&
                <div className='signup-container'>
                    <form className='signup-form' onSubmit={handleSubmit}>
                        <div className='signup-header'>Sign up</div>
                        <div className='signup-form-top'>
                            <div className='grid-item signup-upload'><label><input type='file' name='avatar' />Upload avatar</label></div>
                            <div className='grid-item signup-upload'><label><input type='file' name='banner' />Upload banner</label></div>
                            <input className='grid-item signup-text' type='text' name='name' placeholder='name'></input>
                            <input className='grid-item signup-text' type='text' name='surname' placeholder='surname'></input>
                            <textarea className='bio-compose' type='text' name='bio' placeholder='bio'></textarea>
                        </div>
                        <div className='signup-form-bottom'>
                            <input className='grid-item signup-text' type='text' name='email' placeholder='email'></input>
                            <input className='grid-item signup-text' type='password' name='pass' placeholder='pass'></input>
                        </div>
                        
                        <PrimaryButton classes={'signup-button'} type='submit' text={'Sign up'}/>
                    </form>
                </div>
            }
            {
                (authLoading || isLoading) &&
                <Loader />
            }
        </>

    )
}

export default Signup;
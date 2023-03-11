import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import PrimaryButton from '../../components/button-primary/button-primary';
import { useAuth } from '../../providers/auth.provider'
import './signup.css';

function Signup() {

    const { signup, authenticated } = useAuth();

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
        data.append('username', e.target.username.value);
        data.append('pass', e.target.pass.value);
        data.append('bio', e.target.bio.value);

        signup(data);
    }

    return (
        <div className='signup-container' >
            <form className='signup-form' onSubmit={handleSubmit}>
                <div className='signup-header'>Sign up</div>
                <div className='signup-form-top'>
                    <div className='grid-item signup-upload'><label><input type='file' name='avatar' />Upload avatar</label></div>
                    <div className='grid-item signup-upload'><label><input type='file' name='banner' />Upload banner</label></div>
                    <input className='grid-item signup-text' type='text' name='name' placeholder='name'></input>
                    <input className='grid-item signup-text' type='text' name='surname' placeholder='surname'></input>
                    <textarea className='grid-item bio-compose' type='text' name='bio' placeholder='bio'></textarea>
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
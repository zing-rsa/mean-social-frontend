import { useAuth } from '../../providers/auth.provider'
import Loader from '../../components/loader/loader';
import { useState } from 'react';
import config from '../../config'
import axios from 'axios';
import './signup.css';

function Signup() {

    const { login, authLoading } = useAuth();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            'name': e.target.name.value,
            'surname': e.target.surname.value,
            'email': e.target.email.value,
            'pass': e.target.pass.value,
            'bio': e.target.bio.value
        }

        postUser(user);

    }

    const postUser = async (user) => {
        setIsLoading(true);

        console.log('signup user:', user);

        try {
            const res = await axios({
                method: "POST",
                url: config.api_url + 'auth/signup',
                data: user
            });
            
            if (res.status === 201) {
                console.log('trying to log in')
                login(user.email, user.pass);
            }
        } catch (e) {
            setIsError(true);
            setIsLoading(false);
            console.log(e);
        }

        console.log('complete post user');
    }

    return (
        <div className='signup-container'>

            {
                !authLoading && !isLoading &&
                <>
                    Sign up
                    <form onSubmit={handleSubmit}>
                        <input type='text' name='name' placeholder='name'></input>
                        <input type='text' name='surname' placeholder='surname'></input>
                        <input type='text' name='bio' placeholder='bio'></input>
                        <input type='text' name='email' placeholder='email'></input>
                        <input type='password' name='pass' placeholder='pass'></input>
                        <button type='submit'>Sign up</button>
                    </form>
                </>
            }
            {
                (authLoading || isLoading) &&
                <Loader />
            }

        </div>

    )
}

export default Signup;
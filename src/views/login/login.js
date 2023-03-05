import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SecondaryButton from '../../components/button-secondary/button-secondary'
import PrimaryButton from '../../components/button-primary/button-primary'
import { useAuth } from "../../providers/auth.provider";
import logo from '../../assets/logo.svg'
import './login.css'


function Login(props) {

    const { login, authenticated } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        login(e.target.email.value, e.target.pass.value);
    }, []);

    useEffect(() => {
        if (authenticated)
            navigate('/feed');
    }, [authenticated]);

    return (
        <div className='login-container'>
            <img className='logo' src={logo} />
            <form onSubmit={handleSubmit} className='login-form'>
                <label>Email</label>
                <input type="text" name="email" className='login-text email' />
                <label>Password</label>
                <input type="password" name="pass" className='login-text pass' />
                <PrimaryButton classes={'login'} text={"Log in"} />
            </form>
            <SecondaryButton classes={'signup'} text={"Sign up"} onClick={() => navigate('/signup')} />
        </div>
    )
}

export default Login;
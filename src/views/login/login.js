import { useState } from "react";
import { Link } from 'react-router-dom'
import { useAuth } from "../../providers/auth.provider";

function Login() {

    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }

    const onLogin = () => {
        console.log(email, pass);
        login(email, pass);
    }

    return (
        <>

            <form >
                <label>
                    <p>Email:</p>
                    <input type="text" onChange={handleEmailChange} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={handlePassChange} />
                </label>
                <div>
                    <button type="button" onClick={onLogin}>Submit</button>
                </div>
            </form>
            <div>
                <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}

export default Login;
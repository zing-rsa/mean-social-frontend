import { Link, useLocation } from 'react-router-dom'
import { useAuth } from "../../providers/auth.provider";

function Login(props) {

    const { login } = useAuth();
    const { state } = useLocation();
    const { remark } = state || '';

    const handleSubmit = (e) => {
        e.preventDefault();

        login(e.target.email.value, e.target.pass.value);
    }

    return (
        <>
            { remark &&
                <span>{remark}</span>
            }
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email:</p>
                    <input type="text" name="email" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" name="pass" />
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <div>
                <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}

export default Login;
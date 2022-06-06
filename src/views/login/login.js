import { useAuth } from "../../providers/auth.provider";

function Login() {

    const { onLogin } = useAuth();

    return (
        <form >
            <label>
                <p>Email:</p>
                <input type="text" />
            </label>
            <label>
                <p>Password</p>
                <input type="password" />
            </label>
            <div>
                <button type="button" onClick={onLogin}>Submit</button>
            </div>
        </form>
    )
}

export default Login;
import profilePlaceholder from '../../assets/profile-placeholder.png'
import { useAuth } from "../../providers/auth.provider";
import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar() {

    const { onLogout, token, user } = useAuth();

    return (
        <div className='navbar'>
            <ul className='nav-list'>
                <li className='nav-item'>
                    <Link to="/feed">Feed</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/signup">signup</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/login">login</Link>
                </li>
                {token && (
                    <>
                        <li className='nav-item end profile'>
                            <div className='username'>
                                <Link to="/profile">
                                    {token[1]}
                                </Link>
                            </div>
                            <img height="50px" width="50px" src={profilePlaceholder} />
                        </li>
                        <button type="button" onClick={onLogout}>
                            Sign Out
                        </button>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Navbar;
import profilePlaceholder from '../../assets/profile-placeholder.png'
import { useAuth } from "../../providers/auth.provider";
import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar() {

    const { logout, authenticated, user } = useAuth();

    return (
        <div className='navbar'>
            <ul className='nav-list'>
                <li className='nav-item'>
                    <Link to="/feed">Feed</Link>
                </li>

                {authenticated ?
                    (
                        <>
                            <li className='nav-item end profile'>
                                <div className='username'>
                                    <Link to="/profile">
                                        {user.name}
                                    </Link>
                                </div>
                                <img height="50px" width="50px" src={profilePlaceholder} />
                            </li>
                            <button type="button" onClick={logout}>
                                Sign Out
                            </button>
                        </>
                    )
                    :
                    <li className='nav-item login'>
                        <Link to="/login">login</Link>
                    </li>}
            </ul>
        </div>
    )
}

export default Navbar;
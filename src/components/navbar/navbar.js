import { Link } from 'react-router-dom'

import profilePlaceholder from '../../assets/profile-placeholder.png'
import { useAuth } from "../../providers/auth.provider";
import config from '../../config';
import './navbar.css'

function Navbar() {

    const { logout, authenticated, user } = useAuth();

    return (
        <div className='navbar'>
            <ul className='nav-list'>
                <li className='nav-item'>
                    <Link to="/feed">Feed</Link>
                </li>

                {user && user.isAdmin &&
                    <>
                        <li className='nav-item'>
                            <Link to="/admin/dashboard">Dash</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/admin/users">Users</Link>
                        </li>
                    </>
                }

                {authenticated ?
                    (
                        <>
                            <li className='nav-item end profile'>
                                <div className='username'>
                                    <Link to={`/profile/${user._id}`}>
                                        {user.name}
                                    </Link>
                                </div>
                                <img height="50px" width="50px" alt='' src={user.avatar ? config.media_url + '/avatar/' + user.avatar : profilePlaceholder} />
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
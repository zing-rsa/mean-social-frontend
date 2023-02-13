import { Link, useNavigate } from 'react-router-dom'
import { useCallback } from 'react';

import SecondaryButton from '../button-secondary/button-secondary';
import profilePlaceholder from '../../assets/profile-placeholder.png'
import { useAuth } from "../../providers/auth.provider";
import config from '../../config';
import './navbar.css'

function Navbar() {

    const { logout, authenticated, user } = useAuth();

    const navigate = useNavigate();

    const routeToLogin = useCallback(() => {
        navigate('/login');
    }, []);

    return (
        <div className='navbar'>
            <ul className='nav-list'>

                {authenticated ?
                    (
                        <>
                            <li className='nav-item'>
                                <Link to="/feed">Feed</Link>
                            </li>

                            {user.isAdmin &&
                                <>
                                    <li className='nav-item'>
                                        <Link to="/admin/dashboard">Dash</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to="/admin/users">Users</Link>
                                    </li>
                                </>
                            }

                            <li className='nav-item end profile'>
                                <div className='username'>
                                    <Link to={`/profile/${user._id}`}>
                                        {user.name}
                                    </Link>
                                </div>
                                <img className='nav-avatar' alt='' src={user.avatar ? config.media_url + '/avatar/' + user.avatar : profilePlaceholder} />
                            </li>

                            <SecondaryButton onClick={logout} text={'Sign out'} classes={'nav-sign-out'}/>
                        </>
                    )
                    :
                    <li className='nav-login'>
                        <SecondaryButton text={'Log in'} onClick={routeToLogin} classes={'nav-login-button'} />
                        <Link to="/login">login</Link>
                    </li>}
            </ul>
        </div>
    )
}

export default Navbar;
import { Link, useNavigate } from 'react-router-dom'
import { useCallback } from 'react';

import SecondaryButton from '../button-secondary/button-secondary';
import { useAuth } from "../../providers/auth.provider";
import Avatar from '../avatar/avatar';
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
                                <Avatar classes={'nav-avatar'} src={user.avatar} link={`/profile/${user._id}`} />
                            </li>

                            <SecondaryButton onClick={() => logout(true)} text={'Sign out'} classes={'nav-sign-out'}/>
                        </>
                    )
                    :
                    <li className='nav-login'>
                        <SecondaryButton text={'Log in'} onClick={routeToLogin} classes={'nav-login-button'} />
                    </li>}
            </ul>
        </div>
    )
}

export default Navbar;
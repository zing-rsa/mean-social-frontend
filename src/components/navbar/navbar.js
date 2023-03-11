import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCallback } from 'react';

import { SecondaryButton, Notifications, Avatar, Hamburger, Search } from '../';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useAuth } from "../../providers/auth.provider";
import './navbar.css'

function Navbar() {

    const { logout, authenticated, authLoading, user } = useAuth();
    const { width } = useWindowDimensions();

    const navigate = useNavigate();
    const location = useLocation();

    const routeToLogin = useCallback(() => {
        navigate('/login');
    }, []);

    return (
        <div className='navbar'>
            <ul className='nav-list'>

                {width <= 850 &&
                    <div className="nav-narrow-screen">
                        <Hamburger />

                        {authenticated &&
                            <li className='nav-item end profile'>
                                <Notifications />
                                <div className='username'>
                                    <Link to={`/profile/${user._id}`}>
                                        {user.name}
                                    </Link>
                                </div>
                                <Avatar classes={'nav-avatar'} src={user.avatar} link={`/profile/${user._id}`} />
                            </li>
                        }
                        {!authenticated && !authLoading && location.pathname !== '/login' &&
                            <li className='nav-login'>
                                <SecondaryButton text={'Log in'} onClick={routeToLogin} classes={'nav-login-button'} />
                            </li>
                        }
                    </div>
                }

                {width > 850 &&
                    <div className="nav-wide-screen">

                        <li className='nav-item'>
                            <Link to="/about">About</Link>
                        </li>

                        {authenticated &&
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

                                <li className='nav-item center' >
                                    <Search />
                                </li>

                                <li className='nav-item end profile'>
                                    <Notifications />
                                    <div className='username'>
                                        <Link to={`/profile/${user._id}`}>
                                            {user.name}
                                        </Link>
                                    </div>
                                    <Avatar classes={'nav-avatar'} src={user.avatar} link={`/profile/${user._id}`} />
                                </li>
                                <SecondaryButton onClick={() => logout(true)} text={'Sign out'} classes={'nav-sign-out'} />
                            </>
                        }

                        {!authenticated && !authLoading && location.pathname !== '/login' &&
                            <li className='nav-login'>
                                <SecondaryButton text={'Log in'} onClick={routeToLogin} classes={'nav-login-button'} />
                            </li>
                        }
                    </div>
                }
            </ul>
        </div>
    )
}

export default Navbar;
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { useAuth } from "../../providers/auth.provider";
import { SecondaryButton, Search } from '../'
import './hamburger.css'

function Hamburger() {

    const { logout, authenticated, user } = useAuth();
    const location = useLocation();

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(false);
    }, [location]);

    return (
        <div className='hamburger'>
            <button className='hamburger-button' onClick={() => setVisible(true)}><i className="fa-solid fa-bars"></i></button>

            { visible &&
                <>
                    <div className='hamburger-background' onClick={() => setVisible(false)}></div>

                    <div className='hamburger-menu'>

                        {authenticated && 
                            <li className='hamburger-nav-item hamburger-search'>
                                <Search />
                            </li>
                        }

                        <li className='hamburger-nav-item'>
                            <Link to="/about">About</Link>
                        </li>

                        {authenticated &&
                            <>
                                <li className='hamburger-nav-item'>
                                    <Link to="/feed">Feed</Link>
                                </li>

                                {user.isAdmin &&
                                    <>
                                        <li className='hamburger-nav-item'>
                                            <Link to="/admin/dashboard">Dash</Link>
                                        </li>
                                        <li className='hamburger-nav-item'>
                                            <Link to="/admin/users">Users</Link>
                                        </li>
                                    </>
                                }
                                <SecondaryButton onClick={() => {setVisible(false); logout(true)}} text={'Sign out'} classes={'hamburger-sign-out'} />
                            </>
                        }
                    </div>
                </>
            }

        </div>


    )
}

export default Hamburger;

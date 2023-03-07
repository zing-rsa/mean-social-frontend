import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

import SecondaryButton from '../../../components/button-secondary/button-secondary'
import { useAuth } from "../../../providers/auth.provider";
import './hamburger.css'

function Hamburger() {

    const [visible, setVisible] = useState(false);

    const { logout, authenticated, user } = useAuth();

    const location = useLocation();

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

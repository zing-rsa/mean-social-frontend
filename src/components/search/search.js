import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProfiles } from '../../services/user.service';
import { Avatar } from '../';
import './search.css'

const profileFilter = (p, s) => 
        `${p.name.toLowerCase()} ${p.surname.toLowerCase()}`.startsWith(s.toLowerCase()) || 
         p.username.slice(1).toLowerCase().startsWith(s.toLowerCase())

function Search() {

    const { profiles, fetchProfiles } = useProfiles();
    const navigate = useNavigate();

    const [filteredProfiles, setFilteredProfiles] = useState(null);
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState(null);
    const searchBar = useRef();

    useEffect(() => {
        if (text === null || text === '') {
            setVisible(false);
            searchBar.current.value = '';
        } else {
            setFilteredProfiles(profiles.filter(p => profileFilter(p, text)));
            setVisible(true);
        }
    }, [text])

    useEffect(() => {
        fetchProfiles();
    }, [])

    const profileNavigate = useCallback((id) => {
        setText(null);
        navigate('/profile/' + id);
    }, [])

    return (
        <div className='search-container'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input ref={searchBar} type='text' className='search' onChange={(e) => setText(e.target.value)} >
            </input>

            {visible &&
                <div className='search-dropdown' >
                    {filteredProfiles.map(p =>
                        <div key={p._id} className='search-dropdown-item' onClick={() => profileNavigate(p._id)}>
                            <Avatar src={p.avatar} classes={'search-dropdown-item-avatar'} />
                            <div className='search-dropdown-details'>
                                <div className='search-dropdown-details-line'>{`${p.name} ${p.surname}`}</div>
                                <div className='search-dropdown-details-line search-dropdown-text'><i>{p.username}</i></div>
                            </div>
                        </div>
                    )}
                    {filteredProfiles.length === 0 &&
                        <div className='search-no-results'>No results</div>
                    }
                </div>
            }
        </div>
    )
}

export default Search;
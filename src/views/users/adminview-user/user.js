import { Link } from 'react-router-dom'

import avatar from '../../../assets/profile-placeholder.png'
import config from '../../../config'
import './user.css'

function AdminView_User(props) {

    return (
        <div className='user-row'>
            <img className='user-avatar' src={props.avatar ? config.media_url + 'avatar/' + props.avatar : avatar } />
            <div className='user-name'>
                <Link to={'/profile/' + props._id}>{props.name} {props.surname}</Link>
            </div>
            <div className='user-username'>{'@' + props.username}</div>

            <div className='user-del'>
                <button onClick={props.delete}>Delete</button>
            </div>
        </div>
    )
}

export default AdminView_User;
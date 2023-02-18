import { Link } from 'react-router-dom'

import avatar from '../../../assets/profile-placeholder.png'
import DeleteButton from '../../../components/delete-button/delete-button'
import config from '../../../config'
import './user.css'

function AdminViewUser(props) {

    return (
        <div className='user-row'>
            <img className='user-avatar' src={props.avatar ? config.media_url + 'avatar/' + props.avatar : avatar } />
            <div className='user-name'>
                <Link to={'/profile/' + props._id}>{props.name} {props.surname}</Link>
            </div>
            <div className='user-username'>{'@' + props.username}</div>

            <div className='user-del'>
                <DeleteButton cb={props.delete} title={'Delete user'} />
            </div>
        </div>
    )
}

export default AdminViewUser;
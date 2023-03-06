import { Link } from 'react-router-dom'

import DeleteButton from '../../../components/delete-button/delete-button'
import Avatar from '../../../components/avatar/avatar'
import './user.css'

function AdminViewUser(props) {

    return (
        <div className='user-row'>
            <Avatar classes={'user-avatar'} src={props.avatar} />
            <div className='user-name'>
                <Link to={'/profile/' + props._id}>{props.name} {props.surname}</Link>
            </div>
            <div className='user-username'>{props.username}</div>

            <div className='user-del'>
                <DeleteButton cb={props.delete} title={'Delete user'} />
            </div>
        </div>
    )
}

export default AdminViewUser;
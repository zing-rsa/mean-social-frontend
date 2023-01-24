import './user.css'
import avatar from '../../../assets/profile-placeholder.png'
import axios from 'axios'
import config from '../../../config';
import { useAuth } from '../../../providers/auth.provider'
import { Link } from 'react-router-dom'
import { getToken } from '../../../services/storage.service';

function AdminView_User(props) {

    // const { token } = useAuth();

    const deleteUser = async () => {
        try {
            const res = await axios({
                method: "DELETE",
                url: config.api_url + 'users/delete',
                headers: config.headers(getToken()),
                data: {
                    _id: props._id
                }
            });

            if (props.refresh) {
                props.refresh();
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='user-row'>
            <div className='user-img'>
                <img className='user-avatar' src={avatar} />
            </div>
            <div className='user-name'>
                <Link to={'/profile/' + props._id}>{props.name} {props.surname}</Link>
            </div>
            <div className='user-del'>
                <button onClick={deleteUser}>Delete</button>
            </div>
        </div>
    )
}

export default AdminView_User;
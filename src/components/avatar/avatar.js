import profilePlaceholder from '../../assets/profile-placeholder.png';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import './avatar.css'

function Avatar(props) {

    const navigate = useNavigate();

    return (
        <div className={`${props.classes} avatar-container`} onClick={() => props.link && navigate(props.link)}>
            <img src={props.src ? (config.media_url + 'avatar/' + props.src) : profilePlaceholder} alt={props.alt} />
        </div>
    )
}

export default Avatar;
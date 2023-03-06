import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';


import { useNotifications } from '../../services/notifications.service';
import Loader from '../loader/loader'
import './notifications.css'
import { useAuth } from '../../providers/auth.provider';
import Avatar from '../avatar/avatar';

const Notifications = () => {

    const [visible, setVisible] = useState(false);
    const { notificationInfo, getUserNotifications, clearNotification, } = useNotifications();
    const { user } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const getNotificationText = useCallback((action) => {
        return {
            'like': 'liked your post:',
            'follow': 'followed you.',
            'mention': 'mentioned you in a post:'
        }[action]
    }, []);

    const notificationNavigate = useCallback(async (notification) => {
        let path;

        if(notification.action === 'like' || notification.action === 'mention') {
            path = '/feed' //create post view page
        } else if (notification.action === 'follow') {
            path = '/profile/' + notification.action_owner._id
        }

        await clearNotification(notification._id, user._id);

        navigate(path);

    }, []);

    const clipNotificationText = useCallback((text) => {
        return text.slice(0, 40) + (text.length > 40 ? '...' : '')
    }, []);

    useEffect(() => {
        setVisible(false);
    }, [location]);

    useEffect(() => {
        getUserNotifications(user._id);
        var id = setInterval(() => {getUserNotifications(user._id)}, 30000);

        return () => clearInterval(id);
    }, []);

    return (
        <div className='notifications'>
            <button className='notifications-button' onClick={() => setVisible(true)}>
                {notificationInfo?.unread && <div className='unread'></div>}
                <i className="fa-solid fa-bell"></i>
            </button>

            {visible &&
                <>
                    <div className='notifications-background' onClick={() => setVisible(false)}></div>

                    <div className='notifications-popup'>
                        {notificationInfo &&
                            notificationInfo.notifications.map((item, index) => 
                                <div key={item._id} className='notification-item' onClick={() => notificationNavigate(item)}>
                                    <Avatar src={item.action_owner.avatar} classes={'notification-item-avatar'}/>
                                    <div className='notification-details'>
                                        <div className='notification-details-line'>{`${item.action_owner.username} ${getNotificationText(item.action)}`}</div>
                                        {item.action_item && <div className='notification-details-line notification-text'><i>{`"${clipNotificationText(item.action_item.text)}"`}</i></div>}
                                    </div>
                                    {item.unread &&<div className='notification-item-unread'></div>}
                                </div>)
                        }
                    </div>
                </>
            }
        </div>


    )
}

export default Notifications;
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';


import { useNotifications } from '../../services/notifications.service';
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
            'mention': 'mentioned you in a post:',
            'comment': 'commented on your post:'
        }[action]
    }, []);

    const notificationNavigate = useCallback(async (notification) => {
        let path;
        let state;

        if (notification.action === 'like' || notification.action === 'mention') {
            path = '/feed' 
            state = { scrollTo: notification.action_item._id }
        } else if (notification.action === 'follow') {
            path = '/profile/' + notification.action_owner._id
        } else if (notification.action === 'comment') {
            path = '/feed'
            state = { scrollTo: notification.action_item.parent }
        }

        clearNotification(notification._id, user._id); //background

        state ? navigate(path, {'state': state}) : navigate(path);

    }, []);

    const clipNotificationText = useCallback((text) => {
        return text.slice(0, 33) + (text.length > 33 ? '...' : '')
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
                            notificationInfo.notifications.map((item) => 
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
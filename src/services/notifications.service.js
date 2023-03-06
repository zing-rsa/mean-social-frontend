import { useState, useCallback } from 'react';

import { getToken } from './storage.service';
import api from '../services/axios.service';
import config from '../config'


const useNotifications = () => {

  const [notificationInfo, setNotificationInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUserNotifications = useCallback(async (user_id) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const res = await api({
        method: 'GET',
        url: config.api_url + `users/${user_id}/notifications`,
        headers: config.headers(getToken())
      })
      
      setNotificationInfo(res.data);

    } catch (e) {
      console.error(e);
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const clearNotification = useCallback(async (n_id, u_id) => {
    try {
      
      await api({
        method: 'POST',
        url: config.api_url + `notifications/${n_id}/clear`,
        headers: config.headers(getToken())
      });

      const res = await api({
        method: 'GET',
        url: config.api_url + `users/${u_id}/notifications`,
        headers: config.headers(getToken())
      });

      setNotificationInfo(res.data);

    } catch (e) {
      console.error(e);
    }
  }, [])

  return { notificationInfo, setNotificationInfo, isLoading, isError, getUserNotifications, clearNotification};
}

export { useNotifications };
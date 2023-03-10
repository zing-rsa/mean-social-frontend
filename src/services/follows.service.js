import { useState, useCallback } from 'react';

import { useError } from '../providers/error.provider';
import { getToken } from './storage.service';
import api from '../services/axios.service';
import config from '../config'


const useFollows = () => {

  const [follows, setFollows] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setError } = useError();

  const fetchFollows = useCallback(async (user_id) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const res = await api({
        method: 'GET',
        url: `users/${user_id}/follows`,
        headers: config.headers(getToken())
      })

      setFollows(res.data);

    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);
  
  const follow = useCallback(async (user_id) => {
    try {
      setIsError(false);
      setIsLoading(true);

      await api({
        method: 'POST',
        url: config.api_url + 'follows/follow',
        headers: config.headers(getToken()),
        data: {
          user_id: user_id
        }
      })
      
      const res = await api({
        method: 'GET',
        url: `users/${user_id}/follows`,
        headers: config.headers(getToken())
      })
      
      setFollows(res.data);
      
    } catch (e) {
      setError(e.response.data.message || 'Unknown error while trying to follow user');
      setIsError(true);
    }
    setIsLoading(false);
  }, [fetchFollows]);

  const unfollow = useCallback(async (user_id) => {
    try {
      setIsError(false);
      setIsLoading(true);
      
      await api({
        method: 'POST',
        url: config.api_url + 'follows/unfollow',
        headers: config.headers(getToken()),
        data: {
          user_id: user_id
        }
      })

      const res = await api({
        method: 'GET',
        url: `users/${user_id}/follows`,
        headers: config.headers(getToken())
      })

      setFollows(res.data);

    } catch (e) {
      setError(e.response.data.message || 'Unknown error while trying to unfollow user');
      setIsError(true);
    }
    setIsLoading(false);
  }, [fetchFollows])

  return { follows, isLoading, isError, fetchFollows, follow, unfollow };
}

export { useFollows };
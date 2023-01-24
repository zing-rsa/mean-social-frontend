import { useState, useCallback } from 'react';

import { useAuth } from '../providers/auth.provider';
import axiosConfig from '../services/axios.service';
import { getToken } from './storage.service';
import config from '../config'

const useFollows = (user_id) => {
  // const { token, setToken } = useAuth();

  const [follows, setFollows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchFollows = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosConfig({
        method: 'GET',
        url: `users/${user_id}/follows`,
        headers: config.headers(getToken())
      })

      setFollows(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [getToken, user_id]);

  return { follows, isLoading, isError, fetchFollows };
}

export { useFollows };
import { useState, useCallback } from 'react';

import { getToken } from './storage.service';
import api from '../services/axios.service';
import config from '../config'


const useFollows = () => {

  const [follows, setFollows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchFollows = useCallback(async (user_id) => {
    setIsLoading(true);
    try {
      const res = await api({
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
  }, []);

  return { follows, isLoading, isError, fetchFollows };
}

export { useFollows };
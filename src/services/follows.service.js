import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../providers/auth.provider';
import config from '../config'
import axios from 'axios'

const useFollows = (user_id) => {
  const { token } = useAuth();

  const [follows, setFollows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchFollows = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await axios({
        method: 'GET',
        url: config.api_url + `users/${user_id}/follows`,
        headers: config.headers(token)
      })

      setFollows(result.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [token]);

  return { follows, isLoading, isError, fetchFollows };
}

export { useFollows };
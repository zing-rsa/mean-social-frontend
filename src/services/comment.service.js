import { useAuth } from '../providers/auth.provider';
import { useState, useCallback } from 'react';
import config from '../config'
import axios from 'axios'

const usePostComments = (parent) => { 
  const { token } = useAuth();

  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await axios({
        method: 'GET',
        url: config.api_url + 'comments/' + parent,
        headers: config.headers(token)
      })

      setComments(result.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [token]);

  return { comments, isLoading, isError, fetchComments };
}

export { usePostComments };
import { useAuth } from '../providers/auth.provider';
import { useState, useCallback } from 'react';
import config from '../config'
import axiosConfig from '../services/axios.service';


const usePostComments = (parent) => { 
  const { token, setToken } = useAuth();

  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const res = await axiosConfig({
        method: 'GET',
        url: `posts/${parent}/comments`,
        headers: config.headers(token)
      })

      if (res.refreshed_token) setToken(res.refreshed_token)
      
      setComments(res.data);

      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [token]);

  return { comments, isLoading, isError, fetchComments };
}

export { usePostComments };
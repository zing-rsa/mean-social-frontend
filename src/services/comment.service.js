import { useState, useCallback } from 'react';


import { useAuth } from '../providers/auth.provider';
import axiosConfig from '../services/axios.service';
import { getToken } from './storage.service';
import config from '../config'


const usePostComments = (parent) => { 

  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const res = await axiosConfig({
        method: 'GET',
        url: `posts/${parent}/comments`,
        headers: config.headers(getToken())
      })
      
      setComments(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [getToken]);

  return { comments, isLoading, isError, fetchComments };
}

export { usePostComments };
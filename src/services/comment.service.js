import { useState, useCallback } from 'react';

import { getToken } from './storage.service';
import api from '../services/axios.service';
import config from '../config'


const usePostComments = () => { 

  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchComments = useCallback(async (parent) => {
    setIsLoading(true);
    
    try {
      const res = await api({
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
  }, []);

  return { comments, setComments, isLoading, isError, fetchComments };
}

export { usePostComments };
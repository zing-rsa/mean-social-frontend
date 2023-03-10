import { useState, useCallback } from 'react';

import { getToken } from './storage.service';
import api from '../services/axios.service';
import config from '../config'
import { useError } from '../providers/error.provider';


const useLikes = () => {

  const [likes, setLikes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setError } = useError();

  const like = useCallback(async (post_id) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const res = await api({
        method: 'POST',
        url: config.api_url + 'likes/like',
        headers: config.headers(getToken()),
        data: {
          post_id
        }
      })

      setLikes(res.data);

    } catch (e) {
      console.error(e);
      setIsError(true);
      setError('ayo');
    }
    setIsLoading(false);
  }, []);

  const unlike = useCallback(async (post_id) => {
    try {
      setIsError(false);
      setIsLoading(true);
      
      const res = await api({
        method: 'POST',
        url: config.api_url + 'likes/unlike',
        headers: config.headers(getToken()),
        data: {
          post_id
        }
      })

      setLikes(res.data);

    } catch (e) {
      console.error(e);
      setIsError(true);
    }
    setIsLoading(false);
  }, [])

  return { likes, setLikes, isLoading, isError, like, unlike};
}

export { useLikes };
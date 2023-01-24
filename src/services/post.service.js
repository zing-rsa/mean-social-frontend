import { useState, useCallback } from 'react';

import { getToken } from './storage.service';
import api from '../services/axios.service';
import config from '../config'


const useFeedPosts = () => {

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await api({
        method: 'GET',
        url: 'posts',
        headers: config.headers(getToken())
      })
      
      setPosts(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, []);

  return { posts, isLoading, isError, fetchPosts };
}

const useUserPosts = () => {

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchUserPosts = useCallback(async (user_id) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await api({
        method: 'GET',
        url: `users/${user_id}/posts`,
        headers: config.headers(getToken())
      })

      setPosts(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, []);

  return { posts, isLoading, isError, fetchUserPosts };
}

export { useFeedPosts, useUserPosts };
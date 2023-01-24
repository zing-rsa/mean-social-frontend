import { useState, useCallback } from 'react';
import { useAuth } from '../providers/auth.provider';

import axiosConfig from '../services/axios.service';
import { getToken } from './storage.service';
import config from '../config'

const useFeedPosts = () => {
  // const { token, setToken } = useAuth();

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await axiosConfig({
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
  }, [getToken]);

  return { posts, isLoading, isError, fetchPosts };
}

const useUserPosts = (user_id) => {
  // const { token, setToken } = useAuth();

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchUserPosts = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await axiosConfig({
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
  }, [getToken]);

  return { posts, isLoading, isError, fetchUserPosts };
}

export { useFeedPosts, useUserPosts };
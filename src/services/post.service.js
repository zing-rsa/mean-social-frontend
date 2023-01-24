import { useState, useCallback } from 'react';
import { useAuth } from '../providers/auth.provider';
import axiosConfig from '../services/axios.service';
import config from '../config'

const useFeedPosts = () => {
  const { token, setToken } = useAuth();

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
        headers: config.headers(token)
      })

      if (res.refreshed_token) setToken(res.refreshed_token);
      
      setPosts(res.data); 

      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [token]);

  return { posts, isLoading, isError, fetchPosts };
}

const useUserPosts = (user_id) => {
  const { token, setToken } = useAuth();

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
        headers: config.headers(token)
      })

      if (res.refreshed_token) setToken(res.refreshed_token)

      setPosts(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [token]);

  return { posts, isLoading, isError, fetchUserPosts };
}

export { useFeedPosts, useUserPosts };
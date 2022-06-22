import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../providers/auth.provider';
import config from '../config'
import axios from 'axios'

const useFeedPosts = () => {
  const { token } = useAuth();

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await axios({
        method: 'GET',
        url: config.api_url + 'posts',
        headers: config.headers(token)
      })

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
  const { token } = useAuth();

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchUserPosts = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await axios({
        method: 'GET',
        url: config.api_url + `users/${user_id}/posts`,
        headers: config.headers(token)
      })

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
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
    setIsLoading(true);
    try {
      const result = await axios({
        method: 'GET',
        url: config.api_url + 'posts',
        headers: config.headers(token)
      })

      setPosts(result.data);
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
    try {
      const result = await axios({
        method: 'GET',
        url: config.api_url + `posts/${user_id}`,
        headers: config.headers(token)
      })

      setPosts(result.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [token]);

  return { posts, isLoading, isError, fetchUserPosts };
}

export { useFeedPosts, useUserPosts };
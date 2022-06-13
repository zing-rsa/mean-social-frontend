import { useAuth } from '../providers/auth.provider';
import { useState, useEffect } from 'react';
import config from '../config'
import axios from 'axios'

const useFeedPosts = () => {
  const { token } = useAuth();

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const fetchPosts = async () => {

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

    };

    fetchPosts();

  }, []);

  return { posts, isLoading, isError };
}

const useUserPosts = (user_id) => {
  const { token } = useAuth();

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const fetchPosts = async () => {

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
    }

    fetchPosts();

  }, []);

  return { posts, isLoading, isError };
}

export { useFeedPosts, useUserPosts };
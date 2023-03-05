import { useState, useCallback } from 'react';

import { getToken } from './storage.service';
import api from '../services/axios.service';
import config from '../config'


const usePosts = () => {

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      
      const res = await api({
        method: 'GET',
        url: 'posts',
        headers: config.headers(getToken())
      })

      setPosts(res.data);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);

  }, []);

  const fetchProfilePosts = useCallback(async (user_id) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await api({
        method: 'GET',
        url: `users/${user_id}/posts`,
        headers: config.headers(getToken())
      })

      setPosts(res.data);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const createPost = useCallback(async (post) => {
    try {
      setIsLoading(true);
      setIsError(false);
      
      await api({
        method: "POST",
        url: 'posts/create',
        headers: config.headers(getToken()),
        data: post
      })
      
      const res = await api({
        method: 'GET',
        url: 'posts',
        headers: config.headers(getToken())
      })
      
      setPosts(res.data);
      
    } catch (e) {
      console.log(e);
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const createProfilePost = useCallback(async (post, profile_id) => {
    try {
      setIsError(false);
      setIsLoading(true);

      await api({
        method: "POST",
        url: 'posts/create',
        headers: config.headers(getToken()),
        data: post
      })

      const res = await api({
        method: 'GET',
        url: `users/${profile_id}/posts`,
        headers: config.headers(getToken())
      })

      setPosts(res.data);

    } catch (e) {
      console.log(e);
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const deletePost = useCallback(async (post_id) => {
    try {
      setIsError(false);
      setIsLoading(true);

      await api({
        method: "DELETE",
        url: 'posts/delete',
        headers: config.headers(getToken()),
        data: {
          _id: post_id
        }
      });

      const res = await api({
        method: 'GET',
        url: 'posts',
        headers: config.headers(getToken())
      })

      setPosts(res.data);

    } catch (e) {
      console.log(e);
      setIsError(true)
    }
    setIsLoading(false);

  }, [])

  const deleteProfilePost = useCallback(async (post_id, user_id) => {
    try {
      setIsError(false);
      setIsLoading(true);

      await api({
        method: "DELETE",
        url: 'posts/delete',
        headers: config.headers(getToken()),
        data: {
          _id: post_id
        }
      });

      const res = await api({
        method: 'GET',
        url: `users/${user_id}/posts`,
        headers: config.headers(getToken())
      })

      setPosts(res.data);

    } catch (e) {
      console.log(e);
      setIsError(true)
    }
    setIsLoading(false);

  }, [])

  return { posts, isLoading, isError, fetchPosts, fetchProfilePosts, createPost, createProfilePost, deletePost, deleteProfilePost };
}

export { usePosts };
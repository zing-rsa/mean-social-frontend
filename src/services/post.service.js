import { useState, useCallback } from 'react';

import { useError } from "../providers/error.provider.js";
import { getToken } from './storage.service';
import api from '../services/axios.service';
import config from '../config'


const usePosts = () => {

  const { setError } = useError();

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [postCreating, setPostCreating] = useState(false);
  const [postDeleting, setPostDeleting] = useState(null);

  const fetchPosts = useCallback(async (profile_id=null) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const res = await api({
        method: 'GET',
        url: profile_id ? `users/${profile_id}/posts` : 'posts',
        headers: config.headers(getToken())
      })

      setPosts(res.data);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const createPost = useCallback(async (post, profile_id=null) => {
    try {
      setPostCreating(true);
      setIsError(false);

      await api({
        method: "POST",
        url: 'posts/create',
        headers: config.headers(getToken()),
        data: post
      })

      const res = await api({
        method: 'GET',
        url: profile_id ? `users/${profile_id}/posts` : 'posts' ,
        headers: config.headers(getToken())
      })

      setPosts(res.data);

    } catch (e) {
      setError(e.response.data.message || 'Unknown error creating post');
      setIsError(true);
    }
    setPostCreating(false);
  }, []);

  const deletePost = useCallback(async (post_id, profile_id = null) => {
    try {
      setPostDeleting(post_id);
      setIsError(false);

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
        url: profile_id ? `users/${profile_id}/posts`: 'posts',
        headers: config.headers(getToken())
      })

      setPosts(res.data);

    } catch (e) {
      setError(e.response.data.message || 'Unknown error deleting post');
      setIsError(true)
    }
    setPostDeleting(null);
  }, [])

  return { posts, isLoading, postCreating, postDeleting, isError, fetchPosts, createPost, deletePost };
}

export { usePosts };
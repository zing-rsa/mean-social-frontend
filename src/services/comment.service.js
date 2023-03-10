import { useState, useCallback } from 'react';

import { useError } from '../providers/error.provider';
import { getToken } from './storage.service';
import api from '../services/axios.service';
import config from '../config'


const usePostComments = () => {

  const { setError } = useError();

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
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const deleteComment = useCallback(async (comment_id, parent) => {
    try {
      setIsLoading(true);
      setIsError(false);

      await api({
        method: "DELETE",
        url: 'comments/delete',
        headers: config.headers(getToken()),
        data: {
          _id: comment_id
        }
      });

      const res = await api({
        method: 'GET',
        url: `posts/${parent}/comments`,
        headers: config.headers(getToken())
      })

      setComments(res.data);

    } catch (e) {
      setError(e.response.data.message || 'Unknown error while deleting comment');
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const createComment = useCallback(async (text, parent) => {
    try {
      setIsLoading(true);
      setIsError(false);

      await api({
        method: "POST",
        url: 'comments/create',
        headers: config.headers(getToken()),
        data: {
          text: text,
          parent: parent
        }
      })

      const res = await api({
        method: 'GET',
        url: `posts/${parent}/comments`,
        headers: config.headers(getToken())
      })

      setComments(res.data);

    } catch (e) {
      setError(e.response.data.message || 'Unknown error while creating comment');
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  return { comments, setComments, isLoading, isError, fetchComments, deleteComment, createComment };
}

export { usePostComments };
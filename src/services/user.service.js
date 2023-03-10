import { useCallback, useState } from "react";

import { useError } from "../providers/error.provider";
import { getToken } from "./storage.service";
import api from '../services/axios.service';
import config from "../config";


const useProfiles = () => {

  const { setError } = useError();

  const [profile, setProfile] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProfile = useCallback(async (user_id) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await api({
        method: "GET",
        url: 'users/' + user_id,
        headers: config.headers(getToken())
      });

      setProfile(res.data);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const fetchProfiles = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const res = await api({
        method: "GET",
        url: 'users',
        headers: config.headers(getToken())
      });

      setProfiles(res.data);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const deleteProfile = useCallback(async (id) => {
    try {
      await api({
        method: "DELETE",
        url: config.api_url + 'users/delete',
        headers: config.headers(getToken()),
        data: {
          _id: id
        }
      });

      const res = await api({
        method: "GET",
        url: 'users',
        headers: config.headers(getToken())
      });

      setProfiles(res.data);

    } catch (e) {
      setError(e.response.data.message || 'Unknown error deleting user');
    }
  }, []);

  const updateProfile = useCallback(async (profile) => {
    try {
      const res = await api({
        method: "PUT",
        url: config.api_url + 'users/edit',
        headers: config.headers(getToken()),
        data: profile
      });

      setProfile(res.data);

    } catch (e) {
      setError(e.response.data.message || 'Unknown error updating profile');
    }
  }, [])

  return { profile, profiles, isLoading, isError, fetchProfile, fetchProfiles, deleteProfile, updateProfile };
}


export { useProfiles };
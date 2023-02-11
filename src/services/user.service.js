import { useCallback, useState } from "react";

import { getToken } from "./storage.service";
import api from '../services/axios.service';
import config from "../config";


const useProfiles = () => {

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
      console.log(e);
    }
  }, []);

  return { profile, profiles, isLoading, isError, fetchProfile, fetchProfiles, deleteProfile };
}


export { useProfiles };
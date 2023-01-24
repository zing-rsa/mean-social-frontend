import { useCallback, useState } from "react";

// import { useAuth } from "../providers/auth.provider";
import axiosConfig from '../services/axios.service';
import { getToken } from "./storage.service";
import config from "../config";

const useProfile = (user_id) => {

  // const { token, setToken } = useAuth();

  const [profile, setProfile ] = useState(null);
  const [isLoading, setIsLoading ] = useState(true);
  const [isError, setIsError ] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await axiosConfig({
        method: "GET",
        url: 'users/' + user_id,
        headers: config.headers(getToken())
      });

      setProfile(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [getToken]);
  
  return { profile, isLoading, isError, fetchProfile };
}

const useProfiles = () => {
  
  // const { token, setToken } = useAuth();
  
  const [profiles, setProfiles ] = useState(null);
  const [isLoading, setIsLoading ] = useState(true);
  const [isError, setIsError ] = useState(false);
  
  const fetchProfiles = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    
    try {
      const res = await axiosConfig({
        method: "GET",
        url: 'users',
        headers: config.headers(getToken())
      });
      
      setProfiles(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [getToken]);

  return { profiles, isLoading, isError, fetchProfiles };
}

export { useProfile, useProfiles };
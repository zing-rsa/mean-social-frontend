import { useEffect } from 'react';
import axios from 'axios'

import { setToken } from '../../services/storage.service';
import { useAuth } from '../../providers/auth.provider';
import api from '../../services/axios.service'
import config from '../../config'

const AxiosResponseInterceptor = () => {

    const { logout } = useAuth();

    useEffect(() => {

        const interceptor = api.interceptors.response.use(
            res => res,
            async (err) => {
                if (err.response.status === 401) {
                    try {
                        const req = err.config;

                        const res = await axios({
                            method: "GET",
                            url: config.api_url + 'auth/refresh',
                            withCredentials: true
                        });

                        if (res.data.refreshed_token) {
                            setToken(res.data.refreshed_token);
                            req.headers['Authorization'] = res.data.refreshed_token;
                        }

                        return axios(req);

                    } catch (e) {
                        if(err.response.status === 401){
                            logout();
                        } else {
                            return Promise.reject(err);
                        }
                    }
                }
                return Promise.reject(err);
            }
        );

        return () => {
            api.interceptors.response.eject(interceptor);
        }
    }, []);

    return null;
}

export default AxiosResponseInterceptor;
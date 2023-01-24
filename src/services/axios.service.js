import axios from 'axios';

import { setToken } from './storage.service';
import config from '../config';

const api = axios.create({
    baseURL: config.api_url
});

const tokenIntercept = async (err) => {
    if (err.response.status === 401) {
        try {
            const req = err.config;

            const res = await axios({
                method: "GET",
                url: config.api_url + 'auth/refresh',
                withCredentials: true
            });

            if (res.data.refreshed_token){
                setToken(res.data.refreshed_token);
                req.headers = { 'authorization' : res.data.refreshed_token };
            }

            return await axios(req);

        } catch (e) {
            return Promise.reject(err);
        }
    }
}

api.interceptors.response.use(res => res, tokenIntercept);

export default api;
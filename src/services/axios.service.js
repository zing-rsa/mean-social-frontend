
import config from '../config';
import axios from 'axios';

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

            const refreshed_token = res.data.refreshed_token;

            req.headers = { 'authorization' : refreshed_token };

            return axios(req).then((res) => {
                return {
                ...res,
                refreshed_token 
            }});

        } catch (e) {
            return Promise.reject(err);
        }
    }
}

api.interceptors.response.use(res => res, tokenIntercept);

export default api;
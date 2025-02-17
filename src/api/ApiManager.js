import axios from "axios";
import TokenManager from "./TokenManager";
import UrlProvider from "./UrlProvider";

const ApiManager = axios.create({
    // 'baseURL': UrlProvider.local_url,
    // 'baseURL': UrlProvider.staging_url,
    'baseURL': UrlProvider.production_url,
    responseType:'json',
    withCredentials:true
});

ApiManager.interceptors.request.use(
    async (config) => {
        const token = await TokenManager.getToken();
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default ApiManager;
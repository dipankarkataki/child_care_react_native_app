import axios from "axios";
import TokenManager from "./TokenManager";

const ApiManager = axios.create({
    'baseURL':"http://192.168.31.99/api",
    // 'baseURL': "https://staging.childcaresoftware.com/api",
    // 'baseURL': "https://childcaresoftware.com/api",
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
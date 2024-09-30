import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ApiManager = axios.create({
    'baseURL':"http://192.168.31.99/api",
    // 'baseURL': "https://staging.childcaresoftware.com",
    // 'baseURL': "https://childcaresoftware.com",
    responseType:'json',
    withCredentials:true
});

ApiManager.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('AccessToken');
        
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
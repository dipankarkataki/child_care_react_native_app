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
        // Get the token from AsyncStorage (or any other storage method)
        const token = await AsyncStorage.getItem('AccessToken');
        console.log('Retrieved Token:', token);
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add Bearer token to the headers
        }
        console.log('Request Config:', config); 
        return config;
    },
    (error) => {
        // Handle any error during the request setup
        return Promise.reject(error);
    }
);

export default ApiManager;
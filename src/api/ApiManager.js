import axios from "axios";

export default ApiManager = axios.create({
    'baseURL':"http://192.168.31.99",
    // 'baseURL': "https://staging.childcaresoftware.com",
    // 'baseURL': "https://childcaresoftware.com",
    responseType:'json',
    withCredentials:true
});
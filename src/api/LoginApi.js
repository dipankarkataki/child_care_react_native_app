import axios from "axios";
import ApiManager from "./ApiManager";

export default LoginApi = async (data) => {
    try{
        console.log('Sending Data is', data)
        const result = await ApiManager('/test/app')
        return result;
    }catch(error){
        return error.response
    }
}
import ApiManager from "../ApiManager";

export default ProfileDetailsApi = async () => {

    try{
        const result = await ApiManager('/profile/details');
        return result;
    }catch(error){
        if (error.response) {
            // If there's an API response, log the status and message
            console.log('Error Response Data: ', error.response.data);
            console.log('Error Status: ', error.response.status);
            return error.response.data;
        } else {
            console.log('Network/Server Error: ', error.message);
            return { error: error.message };
        }
    }
    
}
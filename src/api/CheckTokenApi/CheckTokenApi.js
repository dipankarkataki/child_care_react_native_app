import ApiManager from "../ApiManager";

export default CheckTokenApi = async () => {
    try {
        const result = await ApiManager('/validate-token');
        // console.log('API Response: ', result); // Log the response
        return result;
    } catch (error) {
        // console.log('Check Api --- Error: ', error); // Log the full error
        if (error.response) {
            // If there's an API response, log the status and message
            // console.log('Error Response Data: ', error.response.data);
            // console.log('Error Status: ', error.response.status);
            return error.response;
        } else {
            console.log('Network/Server Error: ', error.message);
            return { error: error.message };
        }
    }
};

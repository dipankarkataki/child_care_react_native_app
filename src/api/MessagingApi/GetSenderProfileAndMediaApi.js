import ApiManager from "../ApiManager";

export default GetSenderProfileAndMediaApi = async (id) => {
    try {
        const result = await ApiManager(`/chat/sender-profile-and-media/${id}`);
        // console.log('API Response: ', result); // Log the response
        return result;
    } catch (error) {
        console.log('Error: ', error); // Log the full error
        if (error.response) {
            // If there's an API response, log the status and message
            // console.log('Error Response Data: ', error.response.data);
            // console.log('Error Status: ', error.response.status);
            return error.response.data;
        } else {
            console.log('Network/Server Error: ', error.message);
            return { error: error.message };
        }
    }
};
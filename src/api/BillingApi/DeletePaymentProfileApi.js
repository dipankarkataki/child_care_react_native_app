import ApiManager from "../ApiManager";

export default DeletePaymentProfileApi = async (data) => {
    try {
        console.log('Delete payment profile Data ---->', data)
        const result = await ApiManager('/billing/delete-customer-payment-profile', {
            method: "POST",
            data: data,
        });
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
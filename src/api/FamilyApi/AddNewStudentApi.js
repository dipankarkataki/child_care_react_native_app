import ApiManager from "../ApiManager";

const AddNewStudentApi = async (data) => {
    try {
        const result = await ApiManager('/profile/family/student/add-student', {
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
}

export default AddNewStudentApi
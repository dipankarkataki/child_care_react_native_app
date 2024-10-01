import ApiManager from "../ApiManager";

const StudentApi = async (familyId) => {
    try{
        const result = await ApiManager(`/profile/family/student/${familyId}`);
        return result;
    }catch(error){
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

export default StudentApi
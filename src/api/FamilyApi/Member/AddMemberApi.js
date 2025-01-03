import ApiManager from "../../ApiManager"

const AddMemberApi = async (data) => {
    try{
        const result = await ApiManager(`/profile/family/member/add-member`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        });
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

export default AddMemberApi
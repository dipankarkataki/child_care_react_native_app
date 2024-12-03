import { User_Auth_Logout } from "../constants";

export const removeUserAuthToken = () => {
    return {
        type: User_Auth_Logout,
        data: null
    }
}
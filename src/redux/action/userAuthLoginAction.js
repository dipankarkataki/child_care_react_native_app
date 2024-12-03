import { User_Auth_Login } from "../constants";

export const setUserAuthToken = (item) => {
    return {
        type:User_Auth_Login,
        data:item
    }
}
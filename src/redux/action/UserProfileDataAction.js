import { User_Profile_Data } from "../constants";

export const setUserProfileData = (item) => {
    return {
        type: User_Profile_Data,
        data: item
    }
}
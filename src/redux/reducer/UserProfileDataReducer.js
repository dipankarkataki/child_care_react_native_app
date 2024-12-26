import { User_Profile_Data } from "../constants";

const initialState = null;

export const userProfileDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case User_Profile_Data:
            return action.data;
        default:
            return state;
    }
}
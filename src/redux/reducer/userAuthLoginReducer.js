import { User_Auth_Login } from "../constants";
import { User_Auth_Logout } from "../constants";

const initialState = null;

export const userAuthLoginReducer = (state = initialState, action) =>{
    switch (action.type) {
        case User_Auth_Login:
            return action.data;
        case User_Auth_Logout:
            return null;
        default:
            return state;
    }
}
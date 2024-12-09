import { combineReducers } from "redux";
import { profileImageReducer } from "./reducer/profileImageReducer";
import { userAuthLoginReducer } from "./reducer/userAuthLoginReducer";

export default combineReducers({
    profileImage: profileImageReducer,
    userAuth: userAuthLoginReducer
}) 
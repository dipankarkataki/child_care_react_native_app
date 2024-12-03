import { combineReducers } from "redux";
import { profileImageReducer } from "./reducer/profileImageReducer";
import { userAuthLoginReducer } from "./reducer/userAuthLoginReducer";

export default combineReducers({
    profileImageReducer,
    userAuthLoginReducer
}) 
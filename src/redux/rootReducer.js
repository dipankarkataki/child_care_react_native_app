import { combineReducers } from "redux";
import { profileImageReducer } from "./reducer/profileImageReducer";
import { userAuthLoginReducer } from "./reducer/userAuthLoginReducer";
import { userProfileDataReducer } from "./reducer/UserProfileDataReducer";

export default combineReducers({
    profileImage: profileImageReducer,
    userAuth: userAuthLoginReducer,
    userProfileData: userProfileDataReducer
}) 
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { profileImageReducer } from "./reducer/profileImageReducer";
import { userAuthLoginReducer } from "./reducer/userAuthLoginReducer";

// Persist configuration for user authentication
const authPersistConfig = {
    key: "auth", // Unique key for persisted state
    storage: AsyncStorage, // Save to AsyncStorage
};

export default combineReducers({
    profileImage: profileImageReducer,
    userAuth: userAuthLoginReducer
}) 
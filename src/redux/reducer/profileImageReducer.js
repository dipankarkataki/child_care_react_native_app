import UrlProvider from "../../api/UrlProvider";
import { Profile_Image } from "../constants";

const defaultImage = require('../../assets/images/profile-image.png');
const initialState = defaultImage;

export const profileImageReducer = (state = initialState, action) =>{
    switch (action.type) {
        case Profile_Image:
            return action.data ? { uri: `${UrlProvider.asset_url_production}/${action.data}` } : initialState ;
        default:
            return state;
    }
}
import {Profile_Image} from '../constants';

export const setGlobalProfileImage = (item) => {
    return {
        type:Profile_Image,
        data:item
    }
}
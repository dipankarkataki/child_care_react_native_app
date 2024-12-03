import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background: {
        flex: 1,
    },
    header_container: {
        height: moderateScale(60),
        backgroundColor: '#2CABE2',
        elevation: 3,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(10),
        flexDirection: 'row',
        alignItems: 'center'
    },
    header_text_container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header_text: {
        color: '#fff',
        fontFamily: 'Poppins Medium',
        fontSize: scale(18),
    },
    header_icon: {
        fontSize: scale(20),
        color: '#fff',
    },
    family_content_container: {
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateVerticalScale(10),
        marginVertical: moderateVerticalScale(10),
    },
    family_name_container: {
        marginVertical: moderateVerticalScale(10),
    },
    family_name_text: {
        color: 'rgba(0,0,0,0.8)',
        fontFamily: 'Poppins Medium',
        fontSize: scale(18),
    },
});
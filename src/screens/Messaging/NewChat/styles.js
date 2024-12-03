import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image_background: {
        flex: 1
    },
    header_container: {
        height: moderateScale(60),
        backgroundColor: '#2CABE2',
        paddingHorizontal: moderateScale(20),
        elevation: 3,
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
    header_style: {
        marginLeft: moderateScale(15),
        marginVertical: moderateVerticalScale(15),
    },
    header_title: {
        fontSize: scale(16),
        fontFamily: 'Poppins Medium',
        color: '#535353'
    },
    main_title: {
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
        color: '#101618'
    },
    sub_title: {
        fontSize: scale(12),
        fontFamily: 'Poppins Medium',
        color: 'rgba(0,0,0,0.7)'
    },
    contact_container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(10),
        backgroundColor: '#f5f5f5'
    },
    contact_image: {
        height: moderateScale(60),
        width: moderateScale(60),
        borderRadius: moderateScale(60),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000',
        elevation: 1,
        padding: moderateScale(5)
    },
    contact_info_container: {
        marginLeft: moderateScale(20)
    }, 
    contact_initials_container: {
        height: moderateScale(60),
        width: moderateScale(60),
        borderRadius: moderateScale(60),
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#fff',
        elevation: 1,
        padding: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6a5acd'
    },
    contact_initials_text: {
        fontSize: scale(16),
        fontFamily: 'Poppins Medium',
        color: '#fff'
    },
    shimmerViewPlaceholder: {
        height: moderateScale(100),
        borderRadius: moderateScale(6),
        width: 'auto',
        marginHorizontal: moderateScale(20),
        marginVertical: moderateVerticalScale(10),
    },
});
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
        justifyContent:'space-between',
        height: moderateScale(60),
        backgroundColor: '#2CABE2',
        elevation: 3,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(10),
        flexDirection: 'row',
        alignItems: 'center'
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
    user_avatar: {
        width: moderateScale(38),
        height: moderateScale(38),
        borderRadius: moderateScale(20),
        backgroundColor: '#fff',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white'
    },
    chat_container: {
        padding: moderateScale(8),
    },
    card: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: moderateScale(10),
        backgroundColor: '#fff',
        paddingVertical: moderateVerticalScale(15),
        paddingHorizontal: moderateScale(5),
        elevation: 2,
    },
    card_content: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    chat_profile_image: {
        height: moderateScale(60),
        width: moderateScale(60),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: moderateScale(70),
        padding: moderateScale(5),
        elevation: 3,
    },
    chat_user_area: {
        marginHorizontal: moderateScale(10),
        width: '60%'
    },
    preview_user_chat: {
        fontSize: scale(10),
        fontFamily: 'Poppins Regular',
        color: '#797979',
        textAlign: 'justify'
    },
    chat_user_title_text: {
        fontSize: scale(14),
        color: 'rgba(0,0,0,0.8)',
        fontFamily: 'Poppins Medium'
    },
    chat_notification_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chat_time_text: {
        fontSize: scale(12),
        color: 'rgba(0,0,0,0.8)',
        fontFamily: 'Poppins Medium',
        marginVertical: moderateVerticalScale(14)
    },
    notification_count_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notification_count_text: {
        height: moderateScale(25),
        width: moderateScale(25),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#f2f2f2',
        borderRadius: moderateScale(40),
        backgroundColor: '#797979',
        color: '#fff',
        fontSize: scale(12),
        fontFamily: 'Poppins Medium',
        padding: moderateScale(5),
        textAlign: 'center',
        marginRight: moderateScale(5)
    },
    notification_icon: {
        fontSize: scale(15),
        color: '#FFBF00',
        elevation: 2
    },
    floating_new_chat_btn_container: {
        position: 'absolute',
        right: moderateScale(30),
        bottom: moderateVerticalScale(40)
    },
    floating_new_chat_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: moderateScale(60),
        width: moderateScale(60),
        borderColor: '#20A090',
        backgroundColor: '#20A090',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: moderateScale(20),
    },
    new_chat_icon: {
        fontSize: scale(30),
        color: '#fff'
    },
    select_contact_to_start_chat_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: moderateVerticalScale(20)
    },
    select_contact_to_start_chat_btn: {
        height: moderateScale(100),
        width: '80%',
        padding: moderateScale(20),
        borderRadius: moderateScale(2),
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#a9a9a9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading_title: {
        fontSize: scale(15),
        color: '#757575',
        fontFamily: 'Poppins Medium',
        textAlign: 'center'
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
    }, contact_initials_text: {
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
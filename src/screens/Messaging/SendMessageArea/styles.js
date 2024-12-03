import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background: {
        flex: 1,
    },
    chat_header: {
        backgroundColor: '#E8F2F4',
        padding: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#E8F2F4',
    },
    back_button: {
        fontSize: scale(18),
        color: '#000E08',
        marginLeft: moderateScale(5)
    },
    chat_user_area: {
        flexDirection: 'row',
        marginLeft: moderateScale(10),
        alignItems: 'center'
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
        marginLeft: moderateScale(10)
    },
    chat_title_area: {
        marginLeft: moderateScale(10)
    },
    chat_user_title_text: {
        fontSize: scale(15),
        color: '#000000',
        fontFamily: 'Poppins Medium'
    },
    chat_user_status: {
        color: 'green',
        fontSize: scale(12),
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold'
    },
    chat_body: {
        flex: 1,
        marginBottom: moderateVerticalScale(5)
    },
    message_area: {
        padding: moderateScale(20)
    },
    receiver_message_area: {
        backgroundColor: '#F2F7FB',
        padding: moderateScale(10),
        borderWidth: 1,
        borderColor: '#e5e4e2',
        borderRadius: moderateScale(10),
        marginLeft: moderateScale(20),
        marginBottom: moderateVerticalScale(10),
        width: '60%'
    },
    receiver_text: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: scale(12),
        fontFamily: 'Poppins Medium',
        textAlign: 'justify'
    },
    receiver_message_time: {
        color: '#797C7B',
        fontSize: scale(10),
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: moderateVerticalScale(10)
    },
    sender_message_area: {
        backgroundColor: '#009b7d',
        padding: moderateScale(10),
        borderWidth: 1,
        borderColor: '#009b7d',
        borderRadius: moderateScale(10),
        marginLeft: moderateScale(50),
        marginBottom: moderateVerticalScale(10),
        width: '60%',

    },
    sender_text: {
        color: '#fff',
        fontSize: scale(12),
        fontFamily: 'Poppins Medium',
        textAlign: 'justify'
    },
    sender_message_time: {
        color: '#f8f8ff',
        fontSize: scale(10),
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: moderateVerticalScale(10)
    },
    send_message_btn_container: {
        backgroundColor: '#E8F2F4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(10)
    },
    input_container: {
        borderWidth: 1,
        borderColor: 'rgba(84, 84, 84, 0.44)',
        borderRadius: moderateScale(10),
        marginHorizontal: moderateScale(10),
        marginVertical: moderateVerticalScale(20),
        backgroundColor: '#fff',
        width: '70%',
    },
    text_input: {
        fontSize: scale(15),
        color: '#535353',
        padding: 12,
        fontFamily: 'Poppins Regular',
    },
    attachment_icon: {
        fontSize: scale(20),
        color: '#535353',
    },
    send_message_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20A090',
        height: moderateScale(50),
        width: moderateScale(50),
        borderRadius: moderateScale(80),
    },
    send_message_icon: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#fff'
    },
    sender_container: {
        marginTop: moderateVerticalScale(20),
        alignItems: 'flex-end',
        marginRight: moderateScale(20)
    },
    receiver_container: {
        marginTop: moderateVerticalScale(20),
        alignItems: 'flex-start',
    },
    receiver_tail: {
        position: 'absolute',
        left: moderateScale(-10),
        top: moderateVerticalScale(10),
        width: 0,
        height: 0,
        borderTopWidth: 10,
        borderTopColor: '#F2F7FB', // same color as receiver bubble
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        borderBottomWidth: 10,
        borderBottomColor: 'transparent',
    },
    sender_tail: {
        position: 'absolute',
        right: moderateScale(-10),
        top: moderateVerticalScale(10),
        width: 0,
        height: 0,
        borderTopWidth: 10,
        borderTopColor: '#009b7d', // same color as sender bubble
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderBottomWidth: 10,
        borderBottomColor: 'transparent',
    },
    title_text: {
        color: "#080808",
        fontSize: scale(12),
        fontFamily: 'Poppins Medium',
        textAlign: 'center'
    },
    showBottomSheet: {
        display: 'flex'
    },
    hideBottomSheet: {
        display: 'none'
    },
    bottom_sheet_container: {
        height: moderateScale(150),
        backgroundColor: "#fff",
        padding: moderateScale(20)
    },
    bottom_sheet_items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    item_outline: {
        backgroundColor: '#f8f8ff',
        justifyContent: 'center',
        alignItems: 'center',
        height: moderateScale(70),
        width: moderateScale(70),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#004040',
        borderRadius: moderateScale(10),
        padding: moderateScale(10),
        marginBottom: moderateVerticalScale(8),
        elevation: 2
    },
    item_icon: {
        fontSize: scale(25),
        color: 'rgba(0,0,0,0.8)'
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
        fontSize: scale(18),
        fontFamily: 'Poppins Medium',
        color: '#fff'
    },
    sub_title: {
        fontSize: scale(12),
        fontFamily: 'Poppins Medium',
        color: '#101618'
    },
    attachmentPreview: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: moderateScale(10),
        marginTop: moderateVerticalScale(20)
    },
    removeAttachmentText: {
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'crimson',
        borderRadius: moderateScale(20),
        position: 'absolute',
        top: 0,
        right: 0,
        padding: moderateScale(5)
    },
});
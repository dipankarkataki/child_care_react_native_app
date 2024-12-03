import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background: {
        flex: 1,
    },
    chat_header: {
        backgroundColor: '#E8F2F4',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#E8F2F4',
    },
    back_button: {
        fontSize: 20,
        color: '#000E08',
        marginLeft: 5
    },
    chat_user_area: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center'
    },
    inner_chat_user_area: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inner_chat_profile_image: {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: 70,
        padding: 5,
        elevation: 3,
        marginLeft: 10
    },
    chat_profile_image: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: 70,
        padding: 5,
        elevation: 3,
        marginLeft: 10
    },
    chat_title_area: {
        marginLeft: 10
    },
    inner_chat_user_title_text: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold'
    },
    chat_user_title_text: {
        fontSize: 17,
        color: '#000000',
        fontFamily: 'Poppins Medium'
    },
    chat_user_status: {
        color: 'green',
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold'
    },
    chat_body: {
        flex: 1,
        marginBottom: 5
    },
    chat_time_badge_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    chat_time_badge_text: {
        backgroundColor: '#F2F7FB',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        color: '#000000',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#F2F7FB',
        textAlign: 'center',
        borderRadius: 20,
    },
    message_area: {
        padding: 20
    },
    receiver_message_area: {
        backgroundColor: '#F2F7FB',
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e4e2',
        borderRadius: 10,
        marginLeft: 20,
        marginBottom: 10,
        width: '60%'
    },
    receiver_text: {
        color: '#000E08',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
        textAlign: 'justify'
    },
    receiver_message_time: {
        color: '#797C7B',
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 10
    },
    sender_message_area: {
        backgroundColor: '#009b7d',
        padding: 10,
        borderWidth: 1,
        borderColor: '#009b7d',
        borderRadius: 10,
        marginLeft: 50,
        marginBottom: 10,
        width: '60%',

    },
    sender_text: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
        textAlign: 'justify'
    },
    sender_message_time: {
        color: '#f8f8ff',
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 10
    },
    send_message_btn_container: {
        backgroundColor: '#E8F2F4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    input_container: {
        borderWidth: 1,
        borderColor: 'rgba(84, 84, 84, 0.44)',
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: '#fff',
        width: '70%',
    },
    text_input: {
        fontSize: 17,
        color: '#535353',
        padding: 12,
        fontFamily: 'Poppins Regular',
    },
    attachment_icon: {
        fontSize: 25,
        color: '#535353',
    },
    send_message_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20A090',
        height: 55,
        width: 55,
        borderRadius: 80,
    },
    send_message_icon: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },
    sender_container: {
        marginTop: 20,
        alignItems: 'flex-end',
        marginRight: 20
    },
    receiver_container: {
        marginTop: 20,
        alignItems: 'flex-start',
    },
    receiver_tail: {
        position: 'absolute',
        left: -10,
        top: 10,
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
        right: -10,
        top: 10,
        width: 0,
        height: 0,
        borderTopWidth: 10,
        borderTopColor: '#009b7d', // same color as sender bubble
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderBottomWidth: 10,
        borderBottomColor: 'transparent',
    },
    chat_media_items: {
        height: 80,
        width: 80,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10
    },
    title_text: {
        color: "#080808",
        fontSize: 12,
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
        height: 150,
        backgroundColor: "#fff",
        padding: 20
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
        height: 70,
        width: 70,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#004040',
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        elevation: 2
    },
    item_icon: {
        fontSize: 28,
        color: '#000'
    },
    attachments_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: '#F9F9F9',
    },
    attachment_item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5,
        elevation: 2,
    },
    attachment_image: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight: 5,
    },
    attachment_document: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    attachment_text: {
        fontSize: 12,
        color: '#000',
        marginLeft: 5,
        maxWidth: 100,
    },
    message_attachment: {
        marginTop: 5,
    },
    message_image: {
        height: 150,
        width: 150,
        borderRadius: 10,
        marginTop: 5,
    },
    message_document: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    message_document_text: {
        marginLeft: 5,
        color: '#000',
    },
    contact_info_container: {
        marginLeft: 10
    },
    contact_initials_container: {
        height: 60,
        width: 60,
        borderRadius: 60,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#fff',
        elevation: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6a5acd'
    }, contact_initials_text: {
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        color: '#fff'
    },
    main_title: {
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        color: '#101618'
    },
    sub_title: {
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        color: '#101618'
    },
    attachmentPreview: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 20
    },
    removeAttachmentText: {
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'crimson',
        borderRadius: 20,
        position: 'absolute',
        top: 0,
        right: 0
    },
});
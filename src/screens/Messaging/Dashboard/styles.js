import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background: {
        flex: 1,
    },
    header_container: {
        height: 60,
        backgroundColor: '#2CABE2',
        elevation: 3,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header_text: {
        color: '#fff',
        fontFamily: 'Poppins Medium',
        fontSize: 18
    },
    header_icon: {
        fontSize: 20,
        color: '#fff',
    },
    user_avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white'
    },
    chat_container: {
        padding: 8,
    },
    card: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 5,
        elevation: 2,
    },
    card_content: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
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
    },
    chat_user_area: {
        marginLeft: 10,
        marginRight: 10,
        width: '60%'
    },
    preview_user_chat: {
        fontSize: 13,
        fontFamily: 'Poppins Regular',
        color: '#797979',
        textAlign: 'justify'

    },
    chat_user_title_text: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'Poppins Medium'
    },
    chat_notification_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chat_time_text: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'Poppins Medium',
        marginBottom: 24
    },
    notification_count_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notification_count_text: {
        height: 25,
        width: 25,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#f2f2f2',
        borderRadius: 40,
        backgroundColor: '#797979',
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        padding: 5,
        textAlign: 'center',
        marginRight: 5
    },
    notification_icon: {
        fontSize: 17,
        color: '#FFBF00',
        elevation: 2
    },
    floating_new_chat_btn_container: {
        position: 'absolute',
        right: 30,
        bottom: 40
    },
    floating_new_chat_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        borderColor: '#20A090',
        backgroundColor: '#20A090',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
    },
    new_chat_icon: {
        fontSize: 30,
        color: '#fff'
    },
    select_contact_to_start_chat_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    select_contact_to_start_chat_btn: {
        height: 120,
        width: '80%',
        padding: 20,
        borderRadius: 2,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#a9a9a9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading_title: {
        fontSize: 17,
        color: '#757575',
        fontFamily: 'Poppins Medium',
        textAlign: 'center'
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
    shimmerViewPlaceholder: {
        height: 100,
        borderRadius: 6,
        width: 'auto',
        marginHorizontal: 20,
        marginVertical: 10,
    },
});
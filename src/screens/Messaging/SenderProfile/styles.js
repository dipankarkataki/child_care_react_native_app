import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image_background: {
        flex: 1
    },
    profile_header: {
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#7393B3',
        borderStyle: 'solid',
        backgroundColor: '#7393B3',
        padding: 20,
    },
    profile_back_button: {
        marginBottom: 10,
    },
    profile_image_container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile_header_image: {
        height: 140,
        width: 140,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: 80,
        objectFit: 'fill'
    },
    profile_header_name: {
        fontSize: 20,
        fontFamily: 'Poppins Medium',
        color: 'white',
        marginBottom: 5,
        marginTop: 10,
        textAlign: 'center'
    },
    profile_header_email: {
        fontSize: 16,
        fontFamily: 'Poppins Regular',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    back_btn_icon: {
        fontSize: 24,
    },
    icon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#36454F',
    },
    main_title2: {
        color: '#36454F',
        fontSize: 15,
        fontFamily: 'Poppins Regular',
    },
    main_title: {
        color: '#36454F',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold'
    },
    sub_title: {
        color: '#36454F',
        fontSize: 12,
        marginBottom: 8,
        fontFamily: 'Poppins Medium'
    },
    sub_title2: {
        color: '#36454F',
        fontSize: 12,
        marginBottom: 8,
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold'
    },
    account_type: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderColor: '#343434',
        borderStyle: 'solid',
        elevation: 2
    },
    account_info_container: {
        marginLeft: 15,
        marginTop: 10
    },
    chat_media: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderColor: '#343434',
        borderStyle: 'solid',
        elevation: 2
    },
    chat_media_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    media_info_container: {
        flexDirection: 'row',
    },
    chat_media_content: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chat_media_items: {
        height: 80,
        width: 80,
        borderRadius: 10,
        marginHorizontal: 4,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderStyle: 'solid',
        backgroundColor: '#f8f8ff'
    },
    chat_doc_items: {
        height: 80,
        width: 80,
        borderRadius: 10,
        marginHorizontal: 4,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderStyle: 'solid',
        backgroundColor: '#f8f8ff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    doc_icon_style: {
        fontSize: 40,
        color: 'teal',
        marginBottom: 5
    },
    account_creator_details: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderColor: '#343434',
        borderStyle: 'solid',
        elevation: 2,
        marginBottom: 20
    },
    account_details_header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20
    },
    form_group: {
        marginBottom: 2
    },
    shimmerContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    shimmerInputPlaceholder: {
        height: 60,
        marginBottom: 20,
        borderRadius: 6,
        width: 80,
        marginRight: 10
    },
});
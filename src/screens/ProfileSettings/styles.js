import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background: {
        flex: 1,
    },
    profile_header: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2CABE2',
        borderStyle: 'solid',
        backgroundColor: '#2CABE2',
        padding: 20,
    },
    profile_image_container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile_header_image: {
        height: 156,
        width: 156,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: 80,
        marginBottom: 20,
    },
    edit_image_btn: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        height: 35,
        width: 35,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#dcdcdc',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    profile_header_name: {
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        color: 'white',
        marginBottom: 5,
    },
    profile_header_email: {
        fontSize: 14,
        fontFamily: 'Poppins Regular',
        color: '#C6D0DE'
    },
    back_btn_icon: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    },
    icon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2CABE2',
    },
    profile_back_button: {
        marginBottom: 20,
    },
    profile_content_container: {
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 10,
        marginBottom: 80
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        elevation: 2,
        marginBottom: 20
    },
    text_input_container: {
        marginBottom: 20
    },
    form_group: {
        marginBottom: 16,
    },
    text_input: {
        backgroundColor: '#F1F6F6',
        fontSize: 17,
        fontFamily: 'Poppins Regular',
        borderRadius: 6,
        paddingLeft: 12,
        color: '#797979',
        height: 60
    },
    input_title: {
        color: 'black',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        marginBottom: 8
    },
    medium_text: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
    },
    input_label: {
        marginBottom: 8,
        color: '#797979',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    family_details_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    family_details_text: {
        color: 'black',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    title_text: {
        color: '#797979',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        marginBottom: 16
    },
    change_password_text: {
        color: 'black',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        paddingBottom: 10
    },
    kiosk_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    kiosk_input: {
        height: 40,
        width: 100,
        backgroundColor: '#F1F6F6',
        fontSize: 17,
        fontFamily: 'Poppins Regular',
        borderRadius: 6,
        marginRight: 20,
        color: '#797979',
        textAlign: 'center',
        paddingBottom: 5
    },
    show_kiosk_pin_text: {
        color: '#2CABE2',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    asterics: {
        color: 'crimson',
    },
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal_view: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modal_text: {
        marginBottom: 30,
        color: '#000',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    modal_button_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
    button_save_details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFB52E',
        marginRight: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    button_close: {
        backgroundColor: '#cdcdcd',
    },
    horizontal_container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    shimmerInputPlaceholder: {
        height: 50,
        marginBottom: 20,
        borderRadius: 6,
        width: '100%'
    },
    shimmerViewPlaceholder: {
        height: 200,
        marginBottom: 20,
        borderRadius: 6,
        width: '100%'
    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5
    },
    logout_btn: {
        backgroundColor: '#FFB52E',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: '#FFB52E',
        elevation: 1
    },
    logout_btn_inner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    logout_btn_text: {
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },
    logout_icon: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        marginRight: 10
    }
});
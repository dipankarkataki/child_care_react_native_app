import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
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
        padding: moderateScale(20),
    },
    profile_image_container: {
        height: moderateScale(145),
        width: moderateScale(145),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: moderateScale(100),
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    profile_header_image: {
        height: moderateScale(145),
        width: moderateScale(145),
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: moderateScale(80),
        marginVertical: moderateVerticalScale(10),
    },
    edit_image_btn: {
        position: 'absolute',
        bottom: moderateVerticalScale(10),
        right: moderateScale(5),
        height: moderateScale(30),
        width: moderateScale(30),
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#dcdcdc',
        borderRadius: moderateScale(80),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    profile_header_name: {
        fontSize: scale(16),
        fontFamily: 'Poppins Medium',
        color: 'white',
        marginVertical: moderateVerticalScale(5),
    },
    profile_header_email: {
        fontSize: scale(14),
        fontFamily: 'Poppins Regular',
        color: '#C6D0DE'
    },
    back_btn_icon: {
        fontSize: scale(30),
        fontWeight: 'bold',
        color: '#fff'
    },
    icon: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: '#2CABE2',
    },
    profile_back_button: {
        marginVertical: moderateVerticalScale(10),
    },
    profile_content_container: {
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateVerticalScale(5),
        marginVertical: moderateVerticalScale(5),
    },
    card: {
        borderRadius: moderateScale(10),
        backgroundColor: '#fff',
        paddingHorizontal: moderateScale(10),
        paddingVertical:moderateVerticalScale(15),
        elevation: 2,
        marginBottom: moderateVerticalScale(15),
    },
    text_input_container: {
        marginBottom: moderateVerticalScale(10),
    },
    form_group: {
        marginBottom: moderateVerticalScale(20),
    },
    text_input: {
        flex:1,
        backgroundColor: '#F1F6F6',
        fontSize: scale(14),
        fontFamily: 'Poppins Regular',
        borderRadius: moderateScale(6),
        paddingHorizontal: moderateScale(10),
        color: '#797979',
        height: moderateScale(50)
    },
    input_title: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
        marginBottom: moderateVerticalScale(5)
    },
    medium_text: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: scale(12),
        fontFamily: 'Poppins Medium',
    },
    input_label: {
        marginBottom: moderateVerticalScale(8),
        color: '#797979',
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
    },
    family_details_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    family_details_text: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
    },
    title_text: {
        color: '#797979',
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
        marginBottom: moderateVerticalScale(10)
    },
    change_password_text: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
        paddingBottom: moderateVerticalScale(10)
    },
    kiosk_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    kiosk_input: {
        height: moderateScale(40),
        width: moderateScale(100),
        backgroundColor: '#F1F6F6',
        fontSize: scale(14),
        fontFamily: 'Poppins Regular',
        borderRadius: moderateScale(6),
        marginRight: moderateScale(20),
        color: '#797979',
        textAlign: 'center',
        paddingBottom: moderateVerticalScale(5)
    },
    show_kiosk_pin_text: {
        color: '#2CABE2',
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
    },
    asterics: {
        color: 'crimson',
    },
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modal_view: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        padding: moderateScale(18),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: moderateScale(4),
        elevation: 5,
    },
    modal_text: {
        marginBottom: moderateVerticalScale(20),
        color: 'rgba(0,0,0,0.8)',
        fontSize: scale(16),
        fontFamily: 'Poppins Medium',
    },
    modal_button_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: moderateVerticalScale(10),
    },
    button_save_details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFB52E',
        marginRight: moderateScale(10),
    },
    button: {
        borderRadius: moderateScale(5),
        padding: moderateScale(10),
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
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        backgroundColor: '#fff'
    },
    shimmerInputPlaceholder: {
        height: moderateScale(50),
        marginBottom: moderateVerticalScale(20),
        borderRadius: moderateScale(6),
        width: '100%'
    },
    shimmerViewPlaceholder: {
        height: moderateScale(200),
        marginBottom: moderateVerticalScale(20),
        borderRadius: moderateScale(6),
        width: '100%'
    },
    error_text: {
        color: 'red',
        fontSize: scale(12),
        marginTop: moderateVerticalScale(5)
    },
    logout_btn: {
        backgroundColor: '#FFB52E',
        padding: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        borderWidth: 1,
        borderRadius: moderateScale(5),
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
        fontSize: scale(16),
        color: 'rgba(0,0,0,0.8)',
        fontFamilyL:'Poppins Medium',
        marginRight: moderateScale(10)
    },
    logout_icon: {
        fontSize: scale(16),
        color: 'black',
        fontWeight: 'bold',
        marginRight: moderateScale(10)
    }
});
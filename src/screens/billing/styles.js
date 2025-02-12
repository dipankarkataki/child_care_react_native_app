import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
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
        elevation: 5,
        borderWidth: 1,
        borderColor: '#2CABE2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header_text: {
        color: '#fff',
        fontFamily: 'Poppins Medium',
        fontSize: 20,
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
    billing_header: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2CABE2',
        borderStyle: 'solid',
        backgroundColor: '#2CABE2',
        padding: 20,
        zIndex: 1,
    },
    billing_revenue_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    balance: {
        fontSize: 35,
        fontFamily: 'Poppins Medium',
        color: 'white',
    },
    small_text: {
        fontSize: 16,
        fontFamily: 'Poppins Regular',
        color: '#fff',
        marginBottom: 5,
    },
    icon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#27ce2f',
        marginRight: 10,
    },
    icon_small: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
    },
    icon_large: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.54)',
        marginRight: 10,
    },
    billing_content_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        marginBottom: 20,
        zIndex: 2,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        elevation: 2,
        marginBottom: 20,
    },
    text_input_container: {
        marginBottom: 20,
    },
    text_input: {
        flex: 1,
        backgroundColor: '#F1F6F6',
        borderRadius: 6,
        paddingLeft: moderateScale(10),
        height: 50,
    },
    text_input_style: {
        fontSize: 17,
        color: '#797979',
        fontFamily: 'Poppins Regular',
    },
    input_title: {
        color: 'black',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    payment_method_title: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
    },
    payment_method_sub_title: {
        color: '#797979',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
    },
    billing_details_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
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
        marginBottom: 10,
    },
    pay_now_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, pay_now_header_text: {
        color: '#000',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        marginBottom: 16,
        textAlign: 'center'
    },
    pay_now_btn: {
        flexDirection: 'row',
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pay_now_btn_text: {
        color: '#000000',
        fontSize: 20,
        marginLeft: 0,
        fontFamily: 'Poppins Medium',
    },
    payment_method_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
    },
    statements_container: {
        flex: 1,
        marginTop: 205,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        marginBottom: 10
    },
    pay_now_bottom_sheet_container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        zIndex: 3,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    bottom_sheet_card: {
        position: 'absolute',
        zIndex: 4,
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: 600,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    dropdown_container: {
        paddingVertical: moderateVerticalScale(12),
        marginBottom: moderateVerticalScale(10),
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(7)
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: 'rgba(0,0,0,0.8)'
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.8)'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.8)'
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'rgba(0,0,0,0.8)',
    },
});
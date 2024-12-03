import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background: {
        flex: 1,
    },
    auto_pay_header: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2CABE2',
        borderStyle: 'solid',
        backgroundColor: '#2CABE2',
        padding: 20,
        zIndex: 1,
    },
    auto_pay_revenue_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    small_text: {
        fontSize: 14,
        fontFamily: 'Poppins Regular',
        color: 'white',
        marginBottom: 5,
    },
    icon: {
        fontSize: 30,
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
    icon_medium: {
        fontSize: 22,
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
    auto_pay_content_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
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
        backgroundColor: '#F1F6F6',
        fontSize: 17,
        fontFamily: 'Poppins Regular',
        borderRadius: 6,
        paddingLeft: 12,
        color: '#797979',
    },
    input_title: {
        color: 'black',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    input_group: {
        marginBottom: 20,
    },
    payment_method_sub_title: {
        color: '#797979',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
        fontWeight: '700'
    },
    auto_pay_details_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
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
    payment_method_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
    },
    add_new_ach_container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 15,
        marginBottom: 20,
    },
    auto_pay_switch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    auto_pay_title_container: {
        width: '80%',
    },
    currency_exchange_icon_container: {
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: '#E8F2F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    currency_exchange_icon: {
        fontSize: 40,
        color: '#2CABE2'
    },
    add_pay_method_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    add_new_pay_method: {

    },
    add_new_pay_method_text: {
        color: '#2CABE2',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomColor: '#2CABE2',
        borderBottomWidth: 2,
    },
    inactiveTab: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
    },
    save_btn: {
        flexDirection: 'row',
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    save_btn_text: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        textAlign: 'center',
    },
    add_pay_method_title_container: {
    },
    available_payment_method_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    available_payment_method: {
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#d3d3d3",
        height: 80,
        width: 120,
        backgroundColor: '#f0f0ff',
        marginVertical: 5,
        marginHorizontal: 5
    },
    available_payment_method_icon: {
        marginLeft: 10,
        marginTop: 10,
        color: '#003153'
    },
    available_payment_method_text: {
        color: '#525252',
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        marginTop: 5,
        marginLeft: 10
    },
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal_view: {
        width: '90%',
        backgroundColor: '#f8f8ff',
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
    modal_image: {
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 100,
        overflow: 'hidden'
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
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    button_delete: {
        backgroundColor: 'crimson',
        marginHorizontal: 10
    },
    button_delete_text: {
        fontFamily: 'Poppins Medium',
        fontSize: 14,
        color: '#fff'
    },
    button_close: {
        backgroundColor: '#cdcdcd',
    },
    button_close_text: {
        fontFamily: 'Poppins Medium',
        fontSize: 14,
        color: '#242124'
    },
    saved_credit_card: {
        height: 220,
        borderWidth: 1,
        borderColor: '#eee',
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#dcdcdc',
        marginBottom: 20,
        overflow: 'hidden'
    },
    credit_card_container: {
        marginBottom: 15,
        alignItems: 'flex-end'
    },
    credit_card_header: {
        fontFamily: 'Poppins Regular',
        fontSize: 22,
        color: '#fff',
        marginBottom: -10,
    },
    credit_card_name: {
        fontFamily: 'Poppins Regular',
        fontSize: 20,
        color: '#fff',
    },
    credit_card_number: {
        fontFamily: 'Poppins Regular',
        fontSize: 25,
        color: '#fff',
        marginBottom: 5
    },
    credit_card_expiry: {
        fontFamily: 'Poppins Regular',
        fontSize: 12,
        color: '#fff',
    },
    credit_card_expiry_text: {
        fontFamily: 'Poppins Regular',
        fontSize: 16,
        color: '#fff',
    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5
    },
    shimmerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    shimmerInputPlaceholder: {
        height: 80,
        marginBottom: 20,
        borderRadius: 6,
        width: 120,
        marginRight: 10
    },
    back_button_container: {
        marginBottom: 15
    },
    header_icon: {
        fontSize: 20,
        color: '#fff',
    },
});
import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    icon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    family_content_container: {
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 10,
        marginBottom: 20,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        elevation: 2,
        marginBottom: 20,
    },
    form_group: {
        marginBottom: 16,
    },
    input_label: {
        marginBottom: 8,
        color: '#797979',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    text_input: {
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        fontSize: 17,
        color: '#535353',
        fontFamily: 'Poppins Regular',
    },
    asterics: {
        color: 'crimson',
    },
    family_details_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
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
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#E8F2F4',
        width: '100%',
        marginVertical: 10,
    },
    primary_title_text: {
        color: '#2CABE2',
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        marginBottom: 16,
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
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
    button_close: {
        backgroundColor: '#cdcdcd',
        marginTop: 20,
        paddingHorizontal: 30,
    },
    button_save_details: {
        flexDirection: 'row',
        backgroundColor: '#FFB52E',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 36,
        marginRight: 10,
        marginTop: 20

    },
    save_details_text: {

        marginBotoom: 0
    },
    textStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    modal_text: {
        marginBottom: 30,
        color: '#000',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    shimmerViewPlaceholder: {
        height: 200,
        marginBottom: 20,
        borderRadius: 6,
        width: '100%'
    },
});
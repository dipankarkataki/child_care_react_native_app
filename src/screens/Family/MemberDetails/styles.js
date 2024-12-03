import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
export default styles = StyleSheet.create({
    icon: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.8)',
    },
    card: {
        borderRadius: moderateScale(10),
        backgroundColor: '#fff',
        padding: moderateScale(15),
        elevation: 2,
        marginBottom: moderateVerticalScale(20),
    },
    form_group: {
        marginBottom: moderateScale(16),
    },
    input_label: {
        marginBottom: moderateVerticalScale(8),
        color: '#797979',
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
    },
    text_input: {
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        backgroundColor: '#fff',
        fontSize: scale(14),
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
        marginBottom: moderateVerticalScale(10),
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
        marginBottom: moderateVerticalScale(16),
    },
    divider: {
        height: 1,
        backgroundColor: '#E8F2F4',
        width: '100%',
        marginVertical: moderateVerticalScale(10),
    },
    primary_title_text: {
        color: '#2CABE2',
        fontSize: scale(15),
        fontFamily: 'Poppins Medium',
        marginBottom: moderateVerticalScale(5),
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
        padding: moderateScale(15),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: moderateScale(4),
        elevation: 5,
        marginVertical: moderateVerticalScale(60)
    },
    modal_button_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: moderateVerticalScale(10)
    },
    button: {
        borderRadius: moderateScale(5),
        padding: moderateScale(5),
        elevation: 2,
    },
    button_close: {
        backgroundColor: '#cdcdcd',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateVerticalScale(8)
    },
    button_save_details: {
        flexDirection: 'row',
        backgroundColor: '#FFB52E',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingVertical:moderateVerticalScale(8),
        marginHorizontal: moderateScale(10)

    },
    save_details_text: {
        fontSize: scale(14),
        fontFamily:'Poppins Medium',
        color:'rgba(0,0,0,0.8)'
    },
    textStyle: {
        color: 'rgba(0,0,0,0.8)',
        textAlign: 'center',
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
    },
    modal_text: {
        marginBottom: moderateVerticalScale(10),
        color: 'rgba(0,0,0,0.8)',
        fontSize: scale(16),
        fontFamily: 'Poppins Medium',
    },
    error_text: {
        color: 'red',
        fontSize: scale(12),
        marginTop: moderateVerticalScale(2),
    },
    shimmerViewPlaceholder: {
        height: moderateScale(200),
        marginBottom: moderateVerticalScale(20),
        borderRadius: moderateScale(6),
        width: '100%'
    },
});
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, s, scale } from "react-native-size-matters";

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image_background: {
        flex: 1,
    },
    header_container: {
        height: moderateScale(60),
        backgroundColor: '#2CABE2',
        paddingHorizontal: moderateScale(20),
        elevation: 3,
        paddingVertical: moderateVerticalScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.07)'
    },
    header_text_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header_text: {
        color: '#fff',
        fontFamily: 'Poppins Medium',
        fontSize: scale(18),
    },
    header_icon: {
        fontSize: scale(20),
        color: '#fff',
    },
    background_style: {
        backgroundColor: 'rgba(0,33,71,0.45)',
        height: moderateScale(400),
        borderBottomLeftRadius: moderateScale(50),
        borderBottomRightRadius: moderateScale(50)
    },
    attendance_content_container: {
        position: 'absolute',
        top: 100,
        left: 5,
        right: 5
    },
    calendar_btn_container: {
        marginBottom: moderateVerticalScale(20)
    },
    calendar_btn_group_1: {
        flexDirection: 'row'
    },
    calendar_btn: {
        flexDirection: 'row',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: moderateScale(5),
        borderColor: 'rgb(218, 218, 218)',
        marginHorizontal: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendar_btn_active: {
        backgroundColor: '#FFFFFF',
    },
    calendar_btn_inactive: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    calendar_btn_text: {
        marginTop: moderateVerticalScale(2),
        fontFamily: 'Poppins Medium',
        fontSize: scale(14),
        color: 'rgba(0,0,0,0.8)'
    },
    calendar_with_dates_container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        overflow: 'hidden',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 4,
        marginHorizontal: moderateScale(10),
        paddingVertical: moderateVerticalScale(20),
    },
    calendar_list: {
        width: '100%',
        borderRadius: moderateScale(10)
    },
    attendance_btn_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: moderateScale(10),
        marginVertical: moderateVerticalScale(10)
    },
    attendance_btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: moderateScale(5),
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        marginRight: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateVerticalScale(2),
        // backgroundColor: '#FFFFFF',
    },
    indicator: {
        height: moderateScale(10),
        width: moderateScale(10),
        borderRadius: moderateScale(10),
        marginRight: moderateScale(5),
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    attendance_btn_text: {
        paddingTop: moderateScale(2),
        fontFamily: 'Poppins Medium',
        fontSize: scale(12),
        color: 'rgba(255, 255, 255, 0.8)'
    },
    attendance_btn_active: {
        backgroundColor: '#FFFFFF',
    },
    attendance_btn_inactive: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    calendar_btn_icon: {
        fontSize: scale(14),
        color: 'rgba(0,0,0,0.8)',
        marginRight: moderateScale(5)
    },
    history_tab_container: {
        flex: 1,
        paddingVertical: moderateVerticalScale(10)
    },
    history_card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(10),
        overflow: 'hidden',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 4,
        marginHorizontal: moderateScale(10),
        paddingVertical: moderateVerticalScale(10),
        maxHeight: 550
    },
    history_card_header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0)',
        marginHorizontal: moderateScale(10),
    },
    history_header_text: {
        flex: 1,
        fontFamily: 'Poppins Medium',
        fontSize: scale(12),
        color: 'rgba(0,0,0,0.8)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftColor: 'rgba(0,0,0,0.1)',
        borderRightColor: 'rgba(0,0,0,0.2)',
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingVertical: moderateVerticalScale(5),
        backgroundColor: '#dcdcdc'
    },
    history_card_body: {
        marginHorizontal: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        paddingBottom: moderateVerticalScale(30),
    },
    history_card_body_text: {
        flex: 1,
        fontFamily: 'Poppins Medium',
        fontSize: scale(12),
        color: 'rgba(0,0,0,0.6)',
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftColor: 'rgba(0,0,0,0.1)',
        borderRightColor: 'rgba(0,0,0,0.2)',
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        marginBottom: moderateVerticalScale(5),
        textAlignVertical: 'center',
        paddingVertical: moderateVerticalScale(4)
    },
    history_note_text: {
        fontFamily: 'Poppins Medium',
        fontSize: scale(12),
        color: '#FFFFFF',
        marginHorizontal: moderateScale(10)
    },
    dropdown_container: {
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(10),
        marginHorizontal: moderateScale(10),
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(10)
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
        color: 'rgba(0,0,0,0.8)'
    },
});
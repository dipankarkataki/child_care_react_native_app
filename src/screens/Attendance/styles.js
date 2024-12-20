import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";

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
        backgroundColor: '#2CABE2',
        height: moderateScale(300),
        borderBottomLeftRadius: moderateScale(60),
        borderBottomRightRadius: moderateScale(60)
    },
    attendance_content_container: {
        position: 'absolute',
        top: 100,
        left: 10,
        right: 10
    },
    calendar_btn_container: {
        marginBottom: moderateVerticalScale(20)
    },
    calendar_btn_group_1: {
        flexDirection: 'row'
    },
    calendar_btn: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: moderateScale(7),
        borderColor: 'rgb(218, 218, 218)',
        marginHorizontal: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(5)
    },
    calendar_btn_text: {
        fontFamily: 'Poppins Medium',
        fontSize: scale(16),
        color: 'rgba(0,0,0,0.8)'
    },
    calendar_with_dates_container: {
        flex: 1,
        backgroundColor: 'white', // Changed to white for better appearance
        borderRadius: 10,
        overflow: 'hidden', // Ensures the calendar does not overflow the container
        shadowColor: 'rgba(0,0,0,0.8)', // Optional shadow for better visual appeal
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
});
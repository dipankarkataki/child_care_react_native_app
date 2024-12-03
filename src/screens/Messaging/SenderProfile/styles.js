import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
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
        padding: moderateScale(20),
    },
    profile_back_button: {
        marginBottom: moderateVerticalScale(10),
    },
    profile_image_container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile_header_image: {
        height: moderateScale(140),
        width: moderateScale(140),
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: moderateScale(80),
        objectFit: 'fill'
    },
    profile_header_name: {
        fontSize: scale(18),
        fontFamily: 'Poppins Medium',
        color: 'white',
        marginVertical: moderateVerticalScale(10),
        textAlign: 'center'
    },
    profile_header_email: {
        fontSize: scale(14),
        fontFamily: 'Poppins Regular',
        color: '#fff',
        textAlign: 'center',
        marginBottom: moderateVerticalScale(5),
    },
    back_btn_icon: {
        fontSize: scale(20),
    },
    icon: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#36454F',
    },
    main_title2: {
        color: '#36454F',
        fontSize: scale(14),
        fontFamily: 'Poppins Regular',
    },
    main_title: {
        color: '#36454F',
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold'
    },
    sub_title: {
        color: '#36454F',
        fontSize: scale(12),
        marginBottom: moderateVerticalScale(8),
        fontFamily: 'Poppins Medium'
    },
    sub_title2: {
        color: '#36454F',
        fontSize: scale(12),
        marginBottom: moderateVerticalScale(8),
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold'
    },
    account_type: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: moderateVerticalScale(20),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(10),
        backgroundColor: '#fff',
        marginHorizontal: moderateScale(10),
        borderRadius: moderateScale(10),
        borderColor: '#343434',
        borderStyle: 'solid',
        elevation: 2
    },
    account_info_container: {
        marginLeft: moderateScale(15),
        marginTop: moderateVerticalScale(10)
    },
    chat_media: {
        marginTop: moderateVerticalScale(20),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(20),
        backgroundColor: '#fff',
        marginHorizontal: moderateScale(10),
        borderRadius: moderateScale(10),
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
        marginTop: moderateVerticalScale(20),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chat_media_items: {
        height: moderateScale(80),
        width: moderateScale(80),
        borderRadius: moderateScale(10),
        marginHorizontal: moderateScale(2),
        marginBottom: moderateVerticalScale(10),
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderStyle: 'solid',
        backgroundColor: '#f8f8ff'
    },
    chat_doc_items: {
        height: moderateScale(80),
        width: moderateScale(80),
        borderRadius: moderateScale(10),
        marginHorizontal: moderateScale(2),
        marginBottom: moderateVerticalScale(10),
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderStyle: 'solid',
        backgroundColor: '#f8f8ff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    doc_icon_style: {
        fontSize: scale(40),
        color: 'teal',
        marginBottom: moderateVerticalScale(5)
    },
    account_creator_details: {
        marginTop: moderateVerticalScale(20),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(20),
        backgroundColor: '#fff',
        marginHorizontal: moderateScale(5),
        borderRadius: moderateScale(10),
        borderColor: '#343434',
        borderStyle: 'solid',
        elevation: 2,
        marginBottom: moderateVerticalScale(10)
    },
    account_details_header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: moderateVerticalScale(20)
    },
    form_group: {
        marginBottom: moderateVerticalScale(2)
    },
    shimmerContainer: {
        marginTop: moderateVerticalScale(30),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    shimmerInputPlaceholder: {
        height: moderateScale(60),
        marginBottom: moderateVerticalScale(20),
        borderRadius: moderateScale(6),
        width: moderateScale(80),
        marginRight: moderateScale(10)
    },
});
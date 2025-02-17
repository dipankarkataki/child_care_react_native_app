import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background:{
        flex:1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    logo_area: {
    },
    option_container: {
        alignItems: 'center',
        marginHorizontal: moderateScale(8),
    },
    heading_text: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: scale(18),
        marginVertical: moderateVerticalScale(20),
        fontFamily: 'Poppins Medium'
    },
    options: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    owner: {
        flex: 1,
        backgroundColor: 'white',
        height: moderateScale(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(7),
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderStyle: 'solid',
        marginRight: moderateScale(6)

    },
    icon_size: {
        fontSize:scale(28),
        color:'rgba(0,0,0,0.8)'
    },
    owner_text: {
        fontSize: scale(14),
        color: 'rgba(0,0,0,0.8)',
        fontFamily: 'Poppins Medium',
        marginTop: moderateVerticalScale(8)
    },
    teacher: {
        flex: 1,
        height: moderateScale(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(7),
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderStyle: 'solid',
        marginHorizontal: moderateScale(6),
        backgroundColor: 'white'
    },
    teacher_text: {
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
        color: 'rgba(0,0,0,0.8)',
        marginTop: moderateVerticalScale(8)
    },
    parent: {
        flex: 1,
        height: moderateScale(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(7),
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderStyle: 'solid',
        backgroundColor: 'white',
        marginHorizontal: moderateScale(6)
    },
    parent_text: {
        fontSize: scale(14),
        fontFamily: 'Poppins Medium',
        color: 'rgba(0,0,0,0.8)',
        marginTop: moderateVerticalScale(8)
    },
    activeOption: {
        backgroundColor: '#2CABE2',
        borderColor: '#2CABE2',
    },
    activeText: {
        color: 'white',
    },
    activeIcon: {
        color: 'white',
    },
});
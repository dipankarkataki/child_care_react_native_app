import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background:{
        flex:1,
    },
    header_container:{
        height:moderateScale(60),
        backgroundColor:'#2CABE2',
        elevation:3,
        paddingHorizontal:moderateScale(20),
        paddingVertical:moderateVerticalScale(10),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    header_text:{
        color:'#fff',
        fontFamily:'Poppins Medium',
        fontSize:scale(18)
    },
    user_avatar: {
        width: moderateScale(38),
        height: moderateScale(38),
        borderRadius: moderateScale(20),
        backgroundColor: '#fff',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white'
    },
    welcome_container: {
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: moderateScale(150),
        margin:moderateScale(15),
        borderWidth: 1,
        borderRadius: moderateScale(10),
        borderColor: '#BAF1EF',
        borderStyle: 'solid',
        backgroundColor: '#fff',
        paddingVertical:moderateVerticalScale(15),
        overflow:'hidden'
    },
    welcome_image: {
        height: moderateScale(38),
        width: moderateScale(50),
        borderRadius: moderateScale(5)
    },
    welcome_text: {
        color: "#000000",
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    },
    welcome_content: {
        color: "#535353",
        fontSize: scale(12),
        fontWeight: '400',
        paddingVertical: moderateVerticalScale(6),
        paddingHorizontal: moderateScale(30),
        textAlign: 'center'
    },
    dashboard_items_container: {
        flex: 1,
        marginVertical: moderateVerticalScale(10)
    },
    items_group: {
        flexDirection: 'row',
        padding: moderateScale(10),
    },
    item: {
        height: moderateScale(100),
        width: moderateScale(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(5),
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderStyle: 'solid',
        marginHorizontal: moderateScale(5),
        backgroundColor: 'white'
    },
    item_image: {
        height: moderateScale(28),
        width: moderateScale(28)
    },
    item_text: {
        marginVertical: moderateVerticalScale(10),
        color: "#535353",
        fontSize: scale(12),
        textAlign: 'center',
        fontFamily: 'Poppins Medium'
    }
});
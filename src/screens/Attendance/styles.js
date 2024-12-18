import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image_background:{
        flex:1,
    },
    header_container:{
        height:moderateScale(60),
        backgroundColor:'#2CABE2',
        paddingHorizontal:moderateScale(20),
        elevation:3,
        paddingVertical: moderateVerticalScale(10),
        flexDirection:'row',
        alignItems:'center'
    },
    header_text_container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    header_text:{
        color:'#fff',
        fontFamily:'Poppins Medium',
        fontSize:scale(18),
    },
    header_icon:{
        fontSize: scale(20),
        color: '#fff',
    },
});
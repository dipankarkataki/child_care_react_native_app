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
        paddingHorizontal:moderateScale(20),
        elevation:3,
        paddingVertical:moderateVerticalScale(10),
        flexDirection:'row',
        alignItems:'center'
    },
    header_text_container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
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
    logo_area: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center'
    },
    logo_large: {
        
    },
    forgot_password_container: {
        flex: 3,
        marginTop: moderateVerticalScale(125),
    },
    form: {
        flex: 1,
    },
    email_area: {
        marginBottom: moderateVerticalScale(34)
    },
    text_title: {
        color: '#535353',
        fontSize: scale(15),
        marginBottom: moderateVerticalScale(8),
        fontFamily:'Poppins Medium'
    },
    text_input: {
        flex: 1,
        fontSize: scale(15),
        color: '#535353',
        padding: moderateScale(10),
        fontFamily:'Poppins Regular'
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        backgroundColor: '#fff'
    },
    icon: {
        marginRight: moderateScale(10),
        color: 'black'
    },
    forgot_password: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: moderateScale(10),
        width: '100%',
        height: moderateScale(60),
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgot_password_text: {
        color: '#000000',
        fontSize: scale(16),
        marginLeft: moderateScale(40),
        fontFamily:'Poppins Medium',
    },
    error_text: {
        color: 'red',
        fontSize: scale(12),
        marginTop: moderateVerticalScale(5)
    },
    activity_indicator:{
        marginLeft: moderateScale(10), 
    },  
});
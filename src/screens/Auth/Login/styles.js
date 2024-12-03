import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background:{
        flex:1,
    },
    scrollView_container:{
        paddingHorizontal:moderateScale(20),
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateVerticalScale(30),
    },
    logo_large: {
        
    },
    form: {
        marginTop: moderateVerticalScale(130),
    },
    email_area: {
        marginBottom: moderateVerticalScale(34)
    },
    password_area: {
        marginBottom: moderateVerticalScale(34)
    },
    text_title: {
        color: '#535353',
        fontSize: scale(16),
        marginBottom: moderateVerticalScale(8),
        fontFamily:'Poppins Medium'
    },
    text_input: {
        flex: 1,
        fontSize: scale(14),
        color: '#535353',
        padding: moderateScale(12),
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
        marginHorizontal: moderateScale(10),
        color: 'black',
        backgroundColor: '#fff'
    },
    form_btn_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: moderateVerticalScale(50)
    },
    login_btn: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: moderateScale(10),
        width: '100%',
        height: moderateScale(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_btn_text: {
        color: '#000000',
        fontSize: scale(16),
        marginLeft:moderateScale(45),
        fontFamily:'Poppins Medium',
        
    },
    forgot_password: {
        color: '#E21C1C',
        fontSize: scale(14),
        fontFamily:'Poppins Medium'
    },
    signup_btn: {
        marginVertical: moderateVerticalScale(8),
    },
    signup_btn_text: {
        color: '#000000',
        fontFamily:'Poppins Medium'
    },
    signup_text: {
        color: '#2CABE2',
        fontFamily:'Poppins Medium'
    },
    error_text: {
        color: 'red',
        fontSize: scale(12),
        marginVertical: moderateVerticalScale(5)
    },
    activity_indicator:{
        marginHorizontal:moderateScale(10), 
    },  
});
import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background:{
        flex: 1,
    },
    scrollView_container:{
        paddingHorizontal:moderateScale(20)
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
        width:'100%',
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
        marginVertical: moderateVerticalScale(30),
        alignItems: 'center'
    },
    logo_large: {
       
    },
    register_container: {
        marginVertical: moderateVerticalScale(40),
    },
    form: {
        // flex: 1,
    },
    name_area: {
        flexDirection: 'row',
        flexWrap:'wrap',
        marginVertical: moderateVerticalScale(2)
    },
    firstname: {
        flex: 1,
    },
    lastname: {
        flex: 1,
    },
    email_area: {
        marginVertical: moderateVerticalScale(2)
    },
    password_area: {
        marginVertical: moderateVerticalScale(2)
    },
    text_title: {
        color: '#535353',
        fontSize: scale(14),
        marginVertical: moderateVerticalScale(8),
        fontFamily:'Poppins Medium'
    },
    text_input: {
        flex: 1,
        fontSize: scale(14),
        color: '#535353',
        padding: moderateScale(12),
        fontFamily:'Poppins Regular',
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
        color: 'black'
    },
    form_btn_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateVerticalScale(40)
    },
    register: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: moderateScale(10),
        width: '100%',
        height: moderateScale(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    register_text: {
        color: '#000000',
        fontSize: scale(16),
        fontFamily:'Poppins Medium',
        marginLeft: moderateScale(40),
    },
    login_btn: {
        marginVertical: moderateVerticalScale(20),
    },
    login_btn_text: {
        color: '#000000',
        fontSize:scale(12),
        fontFamily:'Poppins Regular',
    },
    login_text: {
        color: '#2CABE2',
        fontSize:scale(14),
        fontFamily:'Poppins Regular',
    },
    verify_phone_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1ab394',
        backgroundColor: '#1ab394',
        borderStyle: 'solid',
        width: moderateScale(70),
        paddingTop: 5,
        borderRadius: moderateScale(5,)
    },
    verify_phone_text: {
        fontSize: scale(14),
        color: '#fff',
        fontFamily:'Poppins Medium',
    },
    error_text: {
        color: 'red',
        fontSize: scale(12),
        marginVertical: moderateVerticalScale(2),
    }
});
import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background:{
        flex:1,
    },
    header_container:{
        height:60,
        backgroundColor:'#2CABE2',
        paddingHorizontal:20,
        elevation:3,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center'
    },
    header_text_container:{
        width:'92%',
        justifyContent:'center',
        alignItems:'center',
    },
    header_text:{
        color:'#fff',
        fontFamily:'Poppins Medium',
        fontSize:20,
    },
    header_icon:{
        fontSize: 20,
        color: '#fff',
    },
    logo_area: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    logo_large: {
        height: 80,
    },
    form: {
        flex: 2,
        marginTop: 130,
    },
    email_area: {
        marginBottom: 34
    },
    password_area: {
        marginBottom: 34
    },
    text_title: {
        color: '#535353',
        fontSize: 17,
        marginBottom: 8,
        fontFamily:'Poppins Medium'
    },
    text_input: {
        flex: 1,
        fontSize: 17,
        color: '#535353',
        padding: 12,
        fontFamily:'Poppins Regular'
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    icon: {
        marginRight: 10,
        color: 'black',
        backgroundColor: '#fff'
    },
    form_btn_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    login_btn: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_btn_text: {
        color: '#000000',
        fontSize: 18,
        marginLeft:45,
        fontFamily:'Poppins Medium',
        
    },
    forgot_password: {
        color: '#E21C1C',
        fontSize: 14,
        fontFamily:'Poppins Medium'
    },
    signup_btn: {
        marginTop: 12,
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
        fontSize: 14,
        marginTop: 5
    },
    activity_indicator:{
        marginLeft:10, 
    },  
});
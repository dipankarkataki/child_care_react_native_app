import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background:{
        flex: 1,
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
        flex: 1,
        marginTop: 40,
        alignItems: 'center'
    },
    logo_large: {
        height: 80,
    },
    register_container: {
        flex: 1,
        marginTop: 70,
    },
    form: {
        flex: 1,
    },
    name_area: {
        flexDirection: 'row',
        flexWrap:'wrap',
        marginBottom: 25
    },
    firstname: {
        flex: 1,
    },
    lastname: {
        flex: 1,
    },
    email_area: {
        marginBottom: 25
    },
    password_area: {
        marginBottom: 25
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
        fontFamily:'Poppins Regular',
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
        color: 'black'
    },
    form_btn_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    register: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    register_text: {
        color: '#000000',
        fontSize: 18,
        fontFamily:'Poppins Medium',
        marginLeft:40,
    },
    login_btn: {
        marginTop: 10,
        marginBottom: 50,
    },
    login_btn_text: {
        color: '#000000',
        fontSize:14,
        fontFamily:'Poppins Regular',
    },
    login_text: {
        color: '#2CABE2',
        fontSize:14,
        fontFamily:'Poppins Regular',
    },
    verify_phone_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1ab394',
        backgroundColor: '#1ab394',
        borderStyle: 'solid',
        width: 70,
        paddingTop: 5,
        borderRadius: 5,
    },
    verify_phone_text: {
        fontSize: 16,
        color: '#fff',
        fontFamily:'Poppins Medium',
    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    }
});
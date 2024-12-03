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
        elevation:3,
        paddingHorizontal:20,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    header_text:{
        color:'#fff',
        fontFamily:'Poppins Medium',
        fontSize:20
    },
    user_avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white'
    },
    welcome_container: {
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 150,
        margin:15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#BAF1EF',
        borderStyle: 'solid',
        backgroundColor: '#fff',
        paddingVertical:15,
        overflow:'hidden'
    },
    welcome_image: {
        height: 38,
        width: 50,
        borderRadius: 5
    },
    welcome_text: {
        color: "#000000",
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    },
    welcome_content: {
        color: "#535353",
        fontSize: 14,
        fontWeight: '400',
        paddingTop: 12,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center'
    },
    dashboard_items_container: {
        flex: 1,
        marginTop: 20
    },
    items_group: {
        flexDirection: 'row',
        padding: 15,
    },
    item: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderStyle: 'solid',
        marginRight: 15,
        backgroundColor: 'white'
    },
    item_image: {
        height: 32,
        width: 32
    },
    item_text: {
        marginTop: 13,
        color: "#535353",
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Poppins Medium'
    }
});
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const profileImage = require('../../assets/images/pro-image.jpg')
const background = require('../../assets/images/background.png');

const MessagingDashboard = ({navigation}) => {
  return (
    <ImageBackground source={background} style={styles.container}>
        <View style={styles.chat_container}>
            <View style={styles.card}>
                <TouchableOpacity style={styles.card_content} onPress={ () => navigation.navigate('SendMessageArea') }>
                    <Image source={profileImage} style={styles.chat_profile_image}/>
                    <View style={styles.chat_user_area}>
                        <Text style={styles.chat_user_title_text}>Shining Star Day Care School</Text>
                        <Text style={styles.preview_user_chat}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet eros a eros...
                        </Text>
                    </View>
                    <View style={styles.chat_notification_area}>
                        <Text style={styles.chat_time_text}>2 mins ago</Text>
                        <View style={styles.notification_count_container}>
                            <Text style={styles.notification_count_text}>3</Text>
                            <Icon name="bell" style={styles.notification_icon}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
    
  )
}

export default MessagingDashboard

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:5
    },
    chat_container:{
        padding:8,
    },
    card:{
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#fff',
        borderRadius:10,
        backgroundColor:'#fff',
        paddingVertical:15,
        paddingHorizontal:5,
        elevation:2
    },
    card_content:{
        flexDirection:'row',
        alignItems:'center',
        overflow:'hidden'
    },
    chat_profile_image:{
        height:60,
        width:60,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#fff',
        borderRadius:70,
        padding:5,
        elevation:3,
    },
    chat_user_area:{
        marginLeft:10,
        marginRight:10,
        width:'60%'
    },
    preview_user_chat:{
        fontSize:13,
        fontFamily:'Poppins Regular',
        color:'#797979',
        textAlign:'justify'
        
    },
    chat_user_title_text:{
        fontSize:14,
        color:'#000000',
        fontFamily:'Poppins Medium'
    },
    chat_notification_area:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    chat_time_text:{
        fontSize:14,
        color:'#000000',
        fontFamily:'Poppins Medium',
        marginBottom:24
    },
    notification_count_container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    notification_count_text:{
        height:25,
        width:25,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#f2f2f2',
        borderRadius:40,
        backgroundColor:'#797979',
        color:'#fff',
        fontSize:12,
        fontFamily:'Poppins Medium',
        padding:5,
        textAlign:'center',
        marginRight:5
    },
    notification_icon:{
        fontSize:17,
        color:'#FFBF00',
        elevation:2
    }
})
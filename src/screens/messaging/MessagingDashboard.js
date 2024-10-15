import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IonicIcon from 'react-native-vector-icons/Ionicons'
import MessagingDashboardApi from '../../api/MessagingApi/MessagingDashboardApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

const profileImage = require('../../assets/images/contact2.jpg')
const background = require('../../assets/images/background.png');


const MessagingDashboard = ({navigation}) => {
    
    const [chatUserList, setChatUserList] = useState([]);

    useEffect( () => {
        MessagingDashboardApi()
        .then((result) => {
            console.log('Users List ==> ', result.data)
            setChatUserList(result.data)
        })
        .catch((err) => {
            console.log('Error', err);
        });
    }, []);


    return (
        <ImageBackground source={background} style={styles.container}>
            {
                chatUserList.length > 0 ? (
                    <FlatList 
                        data={chatUserList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <View style={styles.chat_container}>
                                <View style={styles.card}>
                                    <TouchableOpacity style={styles.card_content} onPress={ () => navigation.navigate('SendMessageArea',{userId : item.id, userName: item.name}) }>
                                        <Image source={profileImage} style={styles.chat_profile_image}/>
                                        <View style={styles.chat_user_area}>
                                            <Text style={styles.chat_user_title_text}>{item.name}</Text>
                                            <Text style={styles.preview_user_chat}>
                                                {item.message}
                                            </Text>
                                        </View>
                                        <View style={styles.chat_notification_area}>
                                            <Text style={styles.chat_time_text}> {item.time}</Text>
                                            <View style={styles.notification_count_container}>
                                                <Text style={styles.notification_count_text}>3</Text>
                                                <Icon name="bell" style={styles.notification_icon}/>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <View style={styles.select_contact_to_start_chat_container}>
                        <TouchableOpacity style={styles.select_contact_to_start_chat_btn}>
                            <Text style={styles.heading_title}>Press the button at the bottom right to start a new chat.</Text>
                        </TouchableOpacity>
                    </View>
                   
                    
                )
            }
            <View style={styles.floating_new_chat_btn_container}>
                <TouchableOpacity style={styles.floating_new_chat_btn} onPress={ () => navigation.navigate('NewChat')}>
                    <IonicIcon name="chatbox-ellipses" style={styles.new_chat_icon}/>
                </TouchableOpacity>
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
    },
    floating_new_chat_btn_container:{
        position:'absolute',
        right:30,
        bottom:40
    },
    floating_new_chat_btn:{
        justifyContent:'center',
        alignItems:'center',
        height:60,
        width:60,
        borderColor:'#20A090',
        backgroundColor:'#20A090',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:20,
    },
    new_chat_icon:{
        fontSize:30,
        color:'#fff'
    },
    select_contact_to_start_chat_container:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20
    },
    select_contact_to_start_chat_btn:{
        height:120,
        width:'80%',
        padding:20,
        borderRadius:2,
        borderStyle:'dashed',
        borderWidth:1,
        borderColor:'#a9a9a9',
        justifyContent:'center',
        alignItems:'center',
    },
    heading_title:{
        fontSize:17,
        color:'#757575',
        fontFamily:'Poppins Medium',
        textAlign:'center'
    }
})
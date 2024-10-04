import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons';

const profileImage = require('../../assets/images/pro-image.jpg')
const background = require('../../assets/images/background.png');

const SendMessageArea = ({navigation}) => {

    const [message, setMessage] = useState('');

    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={styles.chat_header}>
                <TouchableOpacity onPress={ () => navigation.navigate('MessagingDashboard')}>
                    <Icon name="long-arrow-left" style={styles.back_button} />
                </TouchableOpacity>
                <View style={styles.chat_user_area}>
                    <Image source={profileImage} style={styles.chat_profile_image}/>
                    <View style={styles.chat_title_area}>
                        <Text style={styles.chat_user_title_text}>The Shining Star Day Care School</Text>
                        <Text style={[styles.chat_user_status]}>Active Now</Text>
                    </View>
                </View>
            </View>
            <View style={styles.chat_body}>
                <View style={styles.chat_time_badge_container}>
                    <Text style={styles.chat_time_badge_text}>Today</Text>
                </View>
                <View style={styles.message_area}>
                    <View style={styles.inner_chat_user_area}>
                        <Image source={profileImage} style={styles.inner_chat_profile_image}/>
                        <View style={styles.chat_title_area}>
                            <Text style={styles.inner_chat_user_title_text}>The Shining Star Day Care School</Text>
                            
                        </View>
                    </View>
                    <View style={styles.sender_message_area}>
                        <Text style={styles.sender_text}>Hello Mr William.</Text>
                        <Text style={styles.sender_message_time}> <Icon name="clock-o" /> 09:30 AM</Text>
                    </View>
                    <View style={styles.sender_message_area}>
                        <Text style={styles.sender_text}>
                            Make sure you're saving and retrieving the token properly at appropriate times in the app lifecycle, 
                            like in your useEffect in the main app component or your authentication logic. This ensures that even 
                            in development mode, the app behaves consistently.
                        </Text>
                        <Text style={styles.sender_message_time}> <Icon name="clock-o" /> 10:30 AM</Text>
                    </View>
                    <View style={styles.sender_message_area}>
                        <Text style={styles.sender_text}>
                        Hope this will help!
                        </Text>
                        <Text style={styles.sender_message_time}> <Icon name="clock-o" /> 11:20 AM</Text>
                    </View>
                </View>
            </View>
            <View style={styles.send_message_btn_container}>
                <IonicIcon name="camera-outline" style={styles.camera_icon}/>
                <View style={styles.input_container}>
                    <TextInput 
                        style={styles.text_input}
                        placeholder="Write your message"
                        placeholderTextColor="#b9b9b9"
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                    />
                </View>
                <TouchableOpacity style={styles.send_message_btn}>
                    <IonicIcon name="send" style={styles.send_message_icon}/>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default SendMessageArea

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    chat_header:{
        backgroundColor:'#fff',
        padding:20,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#f2f2f2',
    },
    back_button:{
        fontSize:20,
        color:'#000E08',
        marginLeft:5
    },
    chat_user_area:{
        flexDirection:'row',
        marginLeft:10,
        alignItems:'center'
    },
    inner_chat_user_area:{
        flexDirection:'row',
        alignItems:'center'
    },
    inner_chat_profile_image:{
        height:40,
        width:40,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#fff',
        borderRadius:70,
        padding:5,
        elevation:3,
        marginLeft:10
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
        marginLeft:10
    },
    chat_title_area:{
        marginLeft:10
    },
    inner_chat_user_title_text:{
        fontSize:14,
        color:'#000000',
        fontFamily:'Poppins Medium',
        fontWeight:'bold'
    },
    chat_user_title_text:{
        fontSize:17,
        color:'#000000',
        fontFamily:'Poppins Medium'
    },
    chat_user_status:{
        color:'green',
        fontSize:12,
        fontFamily:'Poppins Medium',
        fontWeight:'bold'
    },
    chat_body:{
        flex:3,
    },
    chat_time_badge_container:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:50,
        marginBottom:50
    },
    chat_time_badge_text:{
        backgroundColor:'#F2F7FB',
        fontSize:17,
        fontFamily:'Poppins Medium',
        color:'#000000',
        fontWeight:'bold',
        paddingHorizontal:20,
        paddingVertical:5,
        borderWidth:1,
        borderColor:'#F2F7FB',
        textAlign:'center',
        borderRadius:20,
    },
    message_area:{
        padding:20
    },
    sender_message_area:{
        backgroundColor:'#F2F7FB',
        padding:10,
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:10,
        marginLeft:50,
        marginBottom:10,
        width:'80%'
    },
    sender_text:{
        color:'#000E08',
        fontSize:14,
        fontFamily:'Poppins Medium',
        textAlign:'justify'
    },
    sender_message_time:{
        color:'#797C7B',
        fontSize:12,
        fontFamily:'Poppins Medium',
        fontWeight:'bold',
        textAlign:'right'
    },
    send_message_btn_container:{
        flex:1/3,
        backgroundColor:'#E8F2F4',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        overflow:'hidden',
        paddingHorizontal:20,
        paddingVertical:10
    },
    input_container: {
        borderWidth: 1,
        borderColor: 'rgba(84, 84, 84, 0.44)',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        width:'70%'
    },
    text_input: {
        fontSize: 17,
        color: '#535353',
        padding: 12,
        fontFamily:'Poppins Regular',
    },
    camera_icon:{
        fontSize: 30,
        color: '#535353',
    },
    send_message_btn:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#20A090',
        height:55,
        width:55,
        borderRadius:80,
    },
    send_message_icon:{
        fontSize:25,
        fontWeight:'bold',
        color:'#fff'
    }

})
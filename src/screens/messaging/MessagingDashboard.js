import {Alert, Animated, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessagingDashboardApi from '../../api/MessagingApi/MessagingDashboardApi';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const profileImage = undefined
const background = require('../../assets/images/background.png');
const userAvatar = require('../../assets/images/profile-image.png')

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const MessagingDashboard = ({navigation}) => {

    const messageDashboardRef = React.createRef();
    
    const [chatUserList, setChatUserList] = useState([]);

    const userProfileImage = useSelector((state) => state.profileImageReducer)
    const [shimmerLoader, setShimmerLoader] = useState(false);

    useEffect( () => {

        if(messageDashboardRef.current){
            const messageDashboardAnimated = Animated.stagger(400, [messageDashboardRef.current.getAnimated()]);
            Animated.loop(messageDashboardAnimated).start();
        }

        const getChatUsers = async () => {
            try{
                setShimmerLoader(true);
                const result = await MessagingDashboardApi();
                if(result.data && result.status){
                    setShimmerLoader(false);
                    setChatUserList(result.data.data)
                }else{
                    setShimmerLoader(false);
                    Alert.alert('Oops !', 'Something went wrong while fetching chat users. Please try again.');
                }
            }catch(err){
                setShimmerLoader(false);
                Alert.alert('Oops !', 'Something went wrong while fetching chat users. Please try again.');
                console.log('Message Dashboard Error ', err)
            }
           

        }

        getChatUsers();

    }, [messageDashboardRef.current]);

    const getInitials = (name) => {
        const names = name.split(' ');
        const firstNameInitial = names[0]?.charAt(0).toUpperCase() || '';
        const lastNameInitial = names[1]?.charAt(0).toUpperCase() || '';
        return firstNameInitial + lastNameInitial;
    }

    const deviceTimeZone = RNLocalize.getTimeZone();
    const formatCreatedAt = (timestamp) => {
        // Create a moment object from the timestamp in the server's timezone
        const momentDate = moment.tz(timestamp, "YYYY-MM-DD HH:mm:ss", "Asia/Ho_Chi_Minh");
    
        // Convert it to the device's timezone
        const localTime = momentDate.tz(deviceTimeZone);
    
        // Format the time in AM/PM
        return localTime.format('hh:mm A');
    };

    const getAccountType = (type) => {
        if(type == 13){
            return 'Parent';
        }else if(type == 31){
            return 'Teacher';
        }else{
            return 'Owner';
        }
    }
    
      
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
                <View style={styles.header_container}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                        <Icon name="long-arrow-alt-left" style={styles.header_icon} />
                    </TouchableOpacity>
                    <Text style={styles.header_text}>Chat Dashboard</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
                        <Image  source={userProfileImage}  style={styles.user_avatar} />
                    </TouchableOpacity>
                </View>
                {
                    shimmerLoader ? (
                        <View>
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                        </View>
                    ) : (
                        <>
                            {
                                chatUserList.length > 0 ? (
                                    <FlatList 
                                        data={chatUserList}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item}) => (
                                            <View style={styles.chat_container}>
                                                <View style={styles.card}>
                                                    <TouchableOpacity style={styles.card_content} onPress={ () => navigation.navigate('SendMessageArea',
                                                            {   userId : item.id, 
                                                                userName: item.name, 
                                                                initials : getInitials(item.name), 
                                                                type: getAccountType(item.type),
                                                            }) 
                                                        }>
                                                        {
                                                            profileImage ? (
                                                                <Image source={profileImage}  style={styles.chat_profile_image}/>
                                                            ) : (
                                                                <View style={styles.contact_initials_container}>
                                                                    <Text style={styles.contact_initials_text}>{getInitials(item.name)}</Text>
                                                                </View>
                                                            )
                                                        }
                                                        <View style={styles.chat_user_area}>
                                                            <Text style={styles.chat_user_title_text}>{item.name}</Text>
                                                            <Text style={styles.preview_user_chat}>
                                                                {item.message}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.chat_notification_area}>
                                                            <Text style={styles.chat_time_text}> {formatCreatedAt(item.latest_time)}</Text>
                                                            <View style={styles.notification_count_container}>
                                                                {/* <Text style={styles.notification_count_text}>3</Text>
                                                                <Icon name="bell" style={styles.notification_icon}/> */}
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
                        </>
                    )
                }
                
                <View style={styles.floating_new_chat_btn_container}>
                    <TouchableOpacity style={styles.floating_new_chat_btn} onPress={ () => navigation.navigate('NewChat')}>
                        <IonicIcon name="chatbox-ellipses" style={styles.new_chat_icon}/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
        
        
    )
}

export default MessagingDashboard

const styles = StyleSheet.create({
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
        fontSize:18
    },
    header_icon:{
        fontSize: 20,
        color: '#fff',
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
    },
    contact_initials_container:{
        height:60,
        width:60,
        borderRadius:60,
        borderWidth:1,
        borderStyle:'dashed',
        borderColor:'#fff',
        elevation:1,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#6a5acd'
    },contact_initials_text:{
        fontSize:18,
        fontFamily:'Poppins Medium',
        color:'#fff'
    },
    shimmerViewPlaceholder:{
        height: 100,
        borderRadius: 6,
        width:'auto',
        marginHorizontal:20,
        marginVertical:10,
    },
})
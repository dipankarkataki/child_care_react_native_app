import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import GetSenderProfileAndMediaApi from '../../api/MessagingApi/GetSenderProfileAndMediaApi';
import UrlProvider from '../../api/UrlProvider';

const profileImage = require('../../assets/images/pro-image.jpg')
const background = require('../../assets/images/background.png');
const placeholder_img = require('../../assets/images/placeholder-img.png');

const SenderProfile = ({navigation, route}) => {

    const { userId, userName, initials, type } = route.params;
    const [profileMedia, setProfileMedia] = useState({});

    useEffect(() => {
        GetSenderProfileAndMediaApi(userId)
        .then((result) => {
            setProfileMedia(result.data.data);
        })
        .catch((err) => {
            console.log('Error', err);
        });
    }, []);

    
    console.log('Sender Profile Data ==> ', profileMedia)
    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={styles.profile_header}>
                <TouchableOpacity style={styles.profile_back_button} onPress={ () => navigation.navigate('SendMessageArea', {userId: userId, userName: userName, initials: initials, type: type}) }>
                    <Icon name="angle-left" style={styles.back_btn_icon} />
                </TouchableOpacity>

                <View style={styles.profile_image_container}>
                    <Image source={profileImage} style={styles.profile_header_image} />
                </View>
                <Text style={styles.profile_header_name}>{userName}</Text>
                <Text style={styles.profile_header_email}>{profileMedia?.profile?.email}</Text>
            </View>
            <View style={styles.account_type}>
                <Icon name="info-circle" style={styles.icon}/>
                <View style={styles.account_info_container}>
                    <Text style={styles.main_title}>Owner Account</Text>
                    <Text style={styles.sub_title}>This account uses ChildCareSoftware Account Type : {type}</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.chat_media}>
                    <TouchableOpacity style={styles.chat_media_header}>
                        <View style={styles.media_info_container}>
                            <Icon name="photo-video" style={styles.icon}/>
                            <Text style={[styles.main_title, {marginLeft:10}]}>Chat Media</Text>
                        </View>
                        <Icon name="angle-right" style={styles.icon}/>
                    </TouchableOpacity>
                    <ScrollView horizontal style={styles.chat_media_content}>
                        {profileMedia?.media?.map((item, index) => (
                            <Image
                                key={index}
                                source={{ uri: `${UrlProvider.asset_url_local}/${item.attachment}` }}
                                style={styles.chat_media_items}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.account_creator_details}>
                    <View style={styles.account_details_header}>
                        <Icon name="address-card"style={styles.icon}/>
                        <Text style={[styles.main_title, {marginLeft:10}]}>Account Details</Text>
                    </View>
                    <View style={styles.form_group}>
                        <Text style={styles.main_title2}>Phone Number:</Text>
                        <Text style={styles.sub_title2}>{profileMedia?.profile?.country_code} {profileMedia?.profile?.phone}</Text>
                    </View>
                    <View style={styles.form_group}>
                        <Text style={styles.main_title2}>Day Care Name:</Text>
                        <Text style={styles.sub_title2}>{profileMedia?.profile?.site_name}</Text>
                    </View>
                </View>
            </ScrollView>
            
        </ImageBackground>
    )
}

export default SenderProfile

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    profile_header: {
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#7393B3',
        borderStyle: 'solid',
        backgroundColor: '#7393B3',
        padding: 20,
    },
    profile_back_button: {
        marginBottom: 10,
    },
    profile_image_container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile_header_image: {
        height: 140,
        width: 140,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: 80,
        objectFit:'fill'
    },
    profile_header_name: {
        fontSize: 20,
        fontFamily: 'Poppins Medium',
        color: 'white',
        marginBottom: 5,
        marginTop:10,
        textAlign:'center'
    },
    profile_header_email: {
        fontSize: 16,
        fontFamily: 'Poppins Regular',
        color: '#fff',
        textAlign:'center',
        marginBottom: 5,
    },
    back_btn_icon: {
        fontSize: 24,
    },
    icon: {
        fontSize: 18,
        fontWeight:'bold',
        color: '#36454F',
    },
    main_title2:{
        color: '#36454F',
        fontSize: 15,
        fontFamily:'Poppins Regular',
    },
    main_title:{
        color: '#36454F',
        fontSize: 17,
        fontFamily:'Poppins Medium',
        fontWeight:'bold'
    },
    sub_title:{
        color: '#36454F',
        fontSize: 12,
        marginBottom: 8,
        fontFamily:'Poppins Medium'
    },
    sub_title2:{
        color: '#36454F',
        fontSize: 12,
        marginBottom: 8,
        fontFamily:'Poppins Medium',
        fontWeight:'bold'
    },
    account_type:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:20,
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:'#fff',
        marginLeft:10,
        marginRight:10,
        borderRadius:10,
        borderColor:'#343434',
        borderStyle:'solid',
        elevation:2
    },
    account_info_container:{
        marginLeft:15,
        marginTop:10
    },
    chat_media:{
        marginTop:20,
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'#fff',
        marginLeft:10,
        marginRight:10,
        borderRadius:10,
        borderColor:'#343434',
        borderStyle:'solid',
        elevation:2
    },
    chat_media_header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    media_info_container:{
        flexDirection:'row',
    },
    chat_media_content:{
        marginTop:20,
        flexDirection:'row',
        flexWrap:'wrap',
        // height:200,
        // overflow:'hidden'
    },
    chat_media_items:{
        height:80,
        width:80,
        borderRadius:10,
        marginRight:5,
        marginBottom:10,
        borderWidth:1,
        borderColor:'#dcdcdc',
        borderStyle:'solid',
        backgroundColor:'#f8f8ff'
    },
    account_creator_details:{
        marginTop:20,
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'#fff',
        marginLeft:10,
        marginRight:10,
        borderRadius:10,
        borderColor:'#343434',
        borderStyle:'solid',
        elevation:2,
        marginBottom:20
    },
    account_details_header:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:20
    },
    form_group:{
        marginBottom:2
    }
})
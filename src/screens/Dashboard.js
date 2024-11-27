import { Alert, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import CheckTokenApi from '../api/CheckTokenApi/CheckTokenApi';
import TokenManager from '../api/TokenManager';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalProfileImage } from '../redux/action';
import ProfileDetailsApi from '../api/ProfileApi/ProfileDetailsApi';

const background = require('../assets/images/background.png');
const welcome_smily = require('../assets/images/welcome_smily.png');
const attendance_user = require('../assets/images/attendance_user.png');
const billing = require('../assets/images/billing.png');
const reports = require('../assets/images/report.png');
const messaging = require('../assets/images/message.png');
const notice = require('../assets/images/notice.png');
const invite = require('../assets/images/invite.png');

const Dashboard = ({ navigation }) => {
     const dispatch = useDispatch();
    const revokeToken = async () => {
        await TokenManager.removeToken();
        await TokenManager.removeUserId();
        navigation.replace('Login')
    };

    const userProfileImage = useSelector((state) => state.profileImageReducer);

    useEffect(() => {
        CheckTokenApi()
            .then((result) => {
                if (result.status == 401) {
                    Alert.alert('Session expired', 'Please Re-login', [{
                        text: 'OK',
                        onPress: revokeToken
                    }]);
                }else{
                    const getProfileDetails = async () => {
                        try{
                            const result = await ProfileDetailsApi();
                            if(result.data && result.data.status){
                                dispatch(setGlobalProfileImage(result.data.data.profile_image));
                            }
                        }catch(err){
                            console.log('Error! Failed to get profile details : ', err);
                        }
                    }
            
                    getProfileDetails();
                }
            })
            .catch((err) => {
                console.log('Response Error --> ', err);
            });
    }, []);

    const comingSoon = () => {
        Alert.alert("Feature Coming Soon! 🚀.", "We're working hard to bring this feature to you. Stay tuned for updates!")
    }

    return (

        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
                <View style={styles.header_container}>
                    <Text style={styles.header_text}>Dashboard</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
                        <Image  source={userProfileImage}  style={styles.user_avatar} />
                    </TouchableOpacity>
                </View>
                <View style={styles.welcome_container}>
                    <Image source={welcome_smily} style={styles.welcome_image} />
                    <Text style={styles.welcome_text}>Welcome</Text>
                    <Text style={styles.welcome_content}>
                        Effortlessly manage child care with tools for attendance tracking, 
                        billing, secure chatting, daily reports, notices, family invites
                        and event updates.
                    </Text>
                </View>
                <View style={styles.dashboard_items_container}>
                    <View style={styles.items_group}>
                        <TouchableOpacity style={styles.item} onPress={comingSoon}>
                            <Image source={attendance_user} style={styles.item_image} />
                            <Text style={styles.item_text}>Attendance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Billing')}>
                            <Image source={billing} style={styles.item_image} />
                            <Text style={styles.item_text}>Billing</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.items_group}>
                        <TouchableOpacity style={styles.item} onPress={comingSoon}>
                            <Image source={reports} style={styles.item_image} />
                            <Text style={styles.item_text}>Daily Reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('MessagingDashboard')}>
                            <Image source={messaging} style={styles.item_image} />
                            <Text style={styles.item_text}>Messaging</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={comingSoon}>
                            <Image source={notice} style={styles.item_image} />
                            <Text style={styles.item_text}>Notice & Events</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.items_group}>
                        <TouchableOpacity style={styles.item} onPress={comingSoon}>
                            <Image source={invite} style={styles.item_image} />
                            <Text style={styles.item_text}>Invite Family Member</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
        
    )
}

export default Dashboard

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
})
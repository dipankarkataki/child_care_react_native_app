import { Alert, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import CheckTokenApi from '../../api/CheckTokenApi/CheckTokenApi';
import TokenManager from '../../api/TokenManager';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalProfileImage } from '../../redux/action/profileImageAction';
import { removeUserAuthToken } from '../../redux/action/userAuthLogoutAction';
import ProfileDetailsApi from '../../api/ProfileApi/ProfileDetailsApi';
import styles from './styles';
import Constants from '../../Navigation/Constants';


const background = require('../../assets/images/background.png');
const welcome_smily = require('../../assets/images/welcome_smily.png');
const attendance_user = require('../../assets/images/attendance_user.png');
const billing = require('../../assets/images/billing.png');
const reports = require('../../assets/images/report.png');
const messaging = require('../../assets/images/message.png');
const notice = require('../../assets/images/notice.png');
const invite = require('../../assets/images/invite.png');

const Dashboard = ({ navigation }) => {
    const dispatch = useDispatch();
    const revokeToken = async () => {
        dispatch(removeUserAuthToken());
        await TokenManager.removeToken();
        await TokenManager.removeUserId();
        navigation.replace(Constants.LOGIN)
    };

    const userProfileImage = useSelector((state) => state.profileImage);

    useEffect(() => {
        CheckTokenApi()
            .then((result) => {
                if (result.status == 401) {
                    Alert.alert('Session expired', 'Please Re-login', [{
                        text: 'OK',
                        onPress: revokeToken
                    }]);
                } else {
                    const getProfileDetails = async () => {
                        try {
                            const result = await ProfileDetailsApi();
                            if (result.data && result.data.status) {
                                dispatch(setGlobalProfileImage(result.data.data.profile_image));
                            }
                        } catch (err) {
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
                    <TouchableOpacity onPress={() => navigation.navigate(Constants.PROFILE_SETTINGS)}>
                        <Image source={userProfileImage} style={styles.user_avatar} />
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
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(Constants.BILLING)}>
                            <Image source={billing} style={styles.item_image} />
                            <Text style={styles.item_text}>Billing</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.items_group}>
                        <TouchableOpacity style={styles.item} onPress={comingSoon}>
                            <Image source={reports} style={styles.item_image} />
                            <Text style={styles.item_text}>Daily Reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(Constants.CHAT_DASHBOARD)}>
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

export default Dashboard;
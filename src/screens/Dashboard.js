import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import CheckTokenApi from '../api/CheckTokenApi/CheckTokenApi';
import TokenManager from '../api/TokenManager';

const background = require('../assets/images/background.png');
const welcome_smily = require('../assets/images/welcome_smily.png');
const attendance_user = require('../assets/images/attendance_user.png');
const billing = require('../assets/images/billing.png');
const reports = require('../assets/images/report.png');
const messaging = require('../assets/images/message.png');
const notice = require('../assets/images/notice.png');
const invite = require('../assets/images/invite.png');

const Dashboard = ({ navigation }) => {

    const revokeToken = async () => {
        await TokenManager.removeToken();
        await TokenManager.removeUserId();
        navigation.replace('Login')
    };

    useEffect(() => {
        CheckTokenApi()
            .then((result) => {
                if (result.status == 401) {
                    Alert.alert('Session expired', 'Please Re-login', [{
                        text: 'OK',
                        onPress: revokeToken
                    }]);
                }
            })
            .catch((err) => {
                console.log('Response Error --> ', err);
            });
    }, []);

    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={styles.welcome_container}>
                <Image source={welcome_smily} style={styles.welcome_image} />
                <Text style={styles.welcome_text}>Welcome</Text>
                <Text style={styles.welcome_content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet eros a eros pellentesque efficitur. Praesent varius fringilla convallis.</Text>
            </View>
            <View style={styles.dashboard_items_container}>
                <View style={styles.items_group}>
                    <TouchableOpacity style={styles.item}>
                        <Image source={attendance_user} style={styles.item_image} />
                        <Text style={styles.item_text}>Attendance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Billing')}>
                        <Image source={billing} style={styles.item_image} />
                        <Text style={styles.item_text}>Billing</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.items_group}>
                    <TouchableOpacity style={styles.item}>
                        <Image source={reports} style={styles.item_image} />
                        <Text style={styles.item_text}>Daily Reports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('MessagingDashboard')}>
                        <Image source={messaging} style={styles.item_image} />
                        <Text style={styles.item_text}>Messaging</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image source={notice} style={styles.item_image} />
                        <Text style={styles.item_text}>Notice & Events</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.items_group}>
                    <TouchableOpacity style={styles.item}>
                        <Image source={invite} style={styles.item_image} />
                        <Text style={styles.item_text}>Invite Family Member</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome_container: {
        flex: 1 / 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100',
        width: '100',
        marginTop: 16,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#BAF1EF',
        borderStyle: 'solid',
        backgroundColor: '#fff'
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
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Auth/Login';
import Dashboard from '../screens/Dashboard';
import SignUp from '../screens/Auth/SignUp/Signup';
import ForgotPassword from '../screens/Auth/ForgotPassword/ForgotPassword';
import ProfileSettings from '../screens/ProfileSettings';
import VerifyOtp from '../screens/Auth/VerifyOtp';
import ChangePassword from '../screens/Auth/ChangePassword/ChangePassword';
import FamilyDetails from '../screens/Family/FamilyDetails';
import Billing from '../screens/Billing/Billing';
import AutoPay from '../screens/Billing/AutoPay/AutoPay';
import BottomTabNavigation from './BottomTabNavigation';
import MessagingDashboard from '../screens/Messaging/MessagingDashboard';
import SendMessageArea from '../screens/Messaging/SendMessageArea';
import SenderProfile from '../screens/Messaging/SenderProfile';
import NewChat from '../screens/Messaging/NewChat';

const Stack = createNativeStackNavigator();
const userAvatar = require('../assets/images/profile-image.png')

const ScreenNavigation = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#2CABE2"  barStyle="default"/>
            <Stack.Navigator initialRouteName='Splash' options={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash}/>
                <Stack.Screen name="UserOption" component={UserOption}/>
                <Stack.Screen name="Login" component={Login}/>

                <Stack.Screen name="Dashboard" component={Dashboard}/>

                <Stack.Screen name="SignUp" component={SignUp}/>
                
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                <Stack.Screen name="ProfileSettings" component={BottomTabNavigation}/>
                <Stack.Screen name="VerifyOtp" component={VerifyOtp}/>

                <Stack.Screen name="ChangePassword" component={ChangePassword}/>

                <Stack.Screen name="FamilyDetails" component={FamilyDetails}/>

                <Stack.Screen name="Billing" component={Billing}/>

                <Stack.Screen name="AutoPay" component={AutoPay}/>

                <Stack.Screen name="MessagingDashboard" component={MessagingDashboard}/>

                <Stack.Screen name="SendMessageArea" component={SendMessageArea}/>
                <Stack.Screen name="SenderProfile" component={SenderProfile}/>

                <Stack.Screen name="NewChat" component={NewChat}/>
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default ScreenNavigation

const styles = StyleSheet.create({
    user_avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white'
    },
})
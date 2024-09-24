import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import UserOption from '../screens/UserOption'
import Login from '../screens/auth/Login';
import Dashboard from '../screens/Dashboard';
import SignUp from '../screens/auth/Signup';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ProfileSettings from '../screens/ProfileSettings';
import VerifyOtp from '../screens/auth/VerifyOtp';
import ChangePassword from '../screens/auth/ChangePassword';
import FamilyDetails from '../screens/family/FamilyDetails';
import Billing from '../screens/billing/Billing';
import AutoPay from '../screens/billing/AutoPay';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();
const userAvatar = require('../assets/images/profile-image.png')

const ScreenNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' >
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="UserOption" component={UserOption} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login}
                    options={{
                        title: 'Login',
                        headerStyle: {
                            backgroundColor: '#2CABE2',
                        },
                        headerTintColor: '#fff',
                    }}
                />
                <Stack.Screen name="Dashboard" component={Dashboard}
                    options={({ navigation }) => ({
                        title: 'Dashboard',
                        headerStyle: {
                            backgroundColor: '#2CABE2',
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                        headerTintColor: '#fff',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
                                <Image source={userAvatar} style={styles.user_avatar} />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen name="SignUp" component={SignUp} options={{
                    title: 'Sign Up',
                    headerStyle: {
                        backgroundColor: '#2CABE2',
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTintColor: '#fff',
                }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}
                    options={{
                        title: 'Forgot Password',
                        headerStyle: {
                            backgroundColor: '#2CABE2',
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                        headerTintColor: '#fff',
                    }} />
                <Stack.Screen name="ProfileSettings" component={BottomTabNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="VerifyOtp" component={VerifyOtp} options={{
                    title: 'Verify OTP',
                    headerStyle: {
                        backgroundColor: '#2CABE2',
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTintColor: '#fff',
                }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{
                    title: 'Change Password',
                    headerStyle: {
                        backgroundColor: '#2CABE2',
                    },
                    headerTintColor: '#fff',
                }} />
                <Stack.Screen name="FamilyDetails" component={FamilyDetails} options={({ navigation }) => ({
                    title: 'Family Details',
                    headerStyle: {
                        backgroundColor: '#2CABE2',
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
                            <Image source={userAvatar} style={styles.user_avatar} />
                        </TouchableOpacity>
                    ),
                })}
                />
                <Stack.Screen name="Billing" component={Billing} 
                    options={({ navigation }) => ({
                        title: 'Billing',
                        headerStyle: {
                            backgroundColor: '#2CABE2',
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
                                <Image source={userAvatar} style={styles.user_avatar} />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen name="AutoPay" component={AutoPay} 
                    options={{ headerShown: false }}
                />
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
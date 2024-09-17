import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import UserOption from '../screens/UserOption'
import Login from '../screens/auth/Login';
import Dashboard from '../screens/Dashboard';
import SignUp from '../screens/auth/Signup';
import ForgotPassword from '../screens/auth/ForgotPassword';


const Stack = createNativeStackNavigator();

const ScreenNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' >
                <Stack.Screen name="Splash" component={Splash}  options={{ headerShown: false }}/>
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
                    options={{
                        title: 'My Profile',
                        headerStyle: {
                            backgroundColor: '#2CABE2',
                        },
                        headerTintColor: '#fff',
                    }}
                />
                <Stack.Screen name="SignUp" component={SignUp} options={{
                    title: 'Sign Up',
                    headerStyle: {
                        backgroundColor: '#2CABE2',
                    },
                    headerTintColor: '#fff',
                }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}
                    options={{
                        title: 'Forgot Password',
                        headerStyle: {
                            backgroundColor: '#2CABE2',
                        },
                        headerTintColor: '#fff',
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ScreenNavigation

const styles = StyleSheet.create({})
import React from "react";
import { Splash, UserOption, Login, SignUp, ChangePassword, ForgotPassword, VerifyOTP } from "../../screens";
import Constants from "../Constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const PublicRoutes = () => {
    return (
        <Stack.Navigator initialRouteName={Constants.SPLASH} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Constants.SPLASH} component={Splash} />
            <Stack.Screen name={Constants.USER_OPTION} component={UserOption} />
            <Stack.Screen name={Constants.LOGIN} component={Login} />
            <Stack.Screen name={Constants.SIGN_UP} component={SignUp} />
            <Stack.Screen name={Constants.CHANGE_PASSWORD} component={ChangePassword} />
            <Stack.Screen name={Constants.FORGOT_PASSWORD} component={ForgotPassword} />
            <Stack.Screen name={Constants.VERIFY_OTP} component={VerifyOTP} />
        </Stack.Navigator>
    )
};
export default PublicRoutes;
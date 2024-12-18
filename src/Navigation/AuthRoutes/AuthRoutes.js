import React from "react";
import { Splash, Dashboard, ProfileSettings, FamilyDetails, MemberDetails, StudentDetails, 
    ChatDashboard, NewChat, ChatProfile, ChatArea, Billing, AutoPay, Attendance} from "../../screens";
import Constants from "../Constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
    return(
        <Stack.Navigator initialRouteName={Constants.SPLASH} screenOptions={{headerShown:false}}>
            <Stack.Screen name={Constants.SPLASH} component={Splash} />
            <Stack.Screen name={Constants.DASHBOARD} component={Dashboard} />
            <Stack.Screen name={Constants.PROFILE_SETTINGS} component={ProfileSettings} />
            <Stack.Screen name={Constants.FAMILY_DETAILS} component={FamilyDetails} />
            <Stack.Screen name={Constants.MEMBER_DETAILS} component={MemberDetails} />
            <Stack.Screen name={Constants.STUDENT_DETAILS} component={StudentDetails} />
            <Stack.Screen name={Constants.CHAT_DASHBOARD} component={ChatDashboard} />
            <Stack.Screen name={Constants.NEW_CHAT} component={NewChat} />
            <Stack.Screen name={Constants.CHAT_AREA} component={ChatArea} />
            <Stack.Screen name={Constants.CHAT_PROFILE} component={ChatProfile} />
            <Stack.Screen name={Constants.BILLING} component={Billing} />
            <Stack.Screen name={Constants.AUTO_PAY} component={AutoPay} />
            <Stack.Screen name={Constants.Attendance} component={Attendance} />
        </Stack.Navigator>
    )
};
export default AuthRoutes;
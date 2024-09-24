import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from  'react-native-vector-icons/FontAwesome'

import Notification from '../screens/Notification';
import ProfileSettings from '../screens/ProfileSettings';
import Calendar from '../screens/Calendar';
import UploadDocs from '../screens/UploadDocs';

const Tab = createBottomTabNavigator();


const BottomTabNavigation = () => {
  const getTabBarIcon = (routeName, focused, color, size) => {
    let iconName ;
    let iconSize = 20;
    if(routeName === 'Notification'){
      iconName = focused ? 'bell' : 'bell';
    }else if(routeName === 'Profile'){
      iconName = focused ? 'user-plus' : 'user-plus';
    }else if(routeName === 'Calendar'){
      iconName = focused ? 'calendar' : 'calendar';
    }else if(routeName === 'Uploads'){
      iconName = focused ? 'image' : 'image';
    }
    return <Icon  name={iconName} color={color} size={iconSize} />
  };

  return (
      <Tab.Navigator
        screenOptions={ ({route}) => ({
            tabBarIcon: ( {focused, color, size} ) => getTabBarIcon(route.name, focused, color, size),
            tabBarLabel: () => null,
            tabBarActiveTintColor:'#fff',
            tabBarInactiveTintColor:'#797979',
            tabBarStyle: styles.tabBarStyle,
          })
        }
      >
        <Tab.Screen name="Profile" component={ProfileSettings} options={{ headerShown: false }} />
        <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
        <Tab.Screen name="Calendar" component={Calendar} options={{ headerShown: false }}/>
        <Tab.Screen name="Uploads" component={UploadDocs} options={{ headerShown: false }}/>
      </Tab.Navigator>
  )
}

export default BottomTabNavigation;

const styles = StyleSheet.create({
  tabBarStyle:{
    marginLeft:10,
    marginRight:15,
    paddingBottom:10,
    paddingTop:10,
    borderRadius:50,
    height:64,
    backgroundColor: '#333333',
    position:'absolute',
    bottom:10,
    right:0,
    left:0,
  },
})
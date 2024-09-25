import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const splashBackground = require('../assets/images/splash-background.png');
const logoWhite = require('../assets/images/child-care-logo-white.png');

const Splash = ({navigation}) => {

  useEffect(() =>{
    setTimeout(() => {
      handleAccessToken();
    }, 2000)
  },[])

  const handleAccessToken = async () => {
    const dataToken  = await AsyncStorage.getItem('AccessToken');
    if(!dataToken){
      navigation.replace('UserOption')
    }else{
      navigation.replace('Dashboard')
    }
  }
  
  return (
    <ImageBackground source={splashBackground} style={styles.container}>
      <Image source={logoWhite} style={styles.logo_white}/>
    </ImageBackground>
  )
}

export default Splash

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  logo_white:{
    height:80,
  },
})
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import TokenManager from '../api/TokenManager';

const splashBackground = require('../assets/images/splash-background.png');
const logoWhite = require('../assets/images/child-care-logo-white.png');

const Splash = ({navigation}) => {

  useEffect(() =>{
    setTimeout(() => {
      handleAccessToken();
    }, 2000)
  },[])

  const handleAccessToken = async () => {
    const token = await TokenManager.getToken();
    if(!token){
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
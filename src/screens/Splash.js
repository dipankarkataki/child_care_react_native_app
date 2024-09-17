import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const splashBackground = require('../assets/images/splash-background.png');
const logoWhite = require('../assets/images/child-care-logo-white.png');

const Splash = ({navigation}) => {

  useEffect(() =>{
    setTimeout(() => {
      navigation.replace('UserOption');
    }, 2000)
  },[])
  
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
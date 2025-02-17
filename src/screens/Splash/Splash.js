import { Image, ImageBackground, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react'
import TokenManager from '../../api/TokenManager';
import styles from './styles';
import Constants from '../../Navigation/Constants';
import { useSelector } from 'react-redux';

const splashBackground = require('../../assets/images/splash-background.png');
const logoWhite = require('../../assets/images/child-care-logo-white.png');

const Splash = ({ navigation }) => {

  const userAuthToken = useSelector((state) => state.userAuth);

  useEffect(() => {
    setTimeout(() => {
      if (!!userAuthToken) {
        navigation.navigate(Constants.DASHBOARD)
      } else {
        navigation.navigate(Constants.USER_OPTION)
      }
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={splashBackground} style={styles.image_background}>
        <Image source={logoWhite} style={styles.logo_white} />
      </ImageBackground>
    </SafeAreaView>

  )
}

export default Splash;
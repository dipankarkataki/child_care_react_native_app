import { Image, ImageBackground} from 'react-native';
import React, { useEffect } from 'react'
import TokenManager from '../../api/TokenManager';
import styles from './styles';
import Constants from '../../Navigation/Constants';
import { useSelector } from 'react-redux';

const splashBackground = require('../../assets/images/splash-background.png');
const logoWhite = require('../../assets/images/child-care-logo-white.png');

const Splash = ({navigation}) => {

  const userAuthToken = useSelector((state) => state.userAuthLoginReducer);

  useEffect(() =>{
    setTimeout(() => {
      if(!!userAuthToken){
        navigation.replace(Constants.DASHBOARD)
      }else{
        navigation.replace(Constants.USER_OPTION)
      }
    }, 2000);
  },[]);
  
  return (
    <ImageBackground source={splashBackground} style={styles.container}>
      <Image source={logoWhite} style={styles.logo_white}/>
    </ImageBackground>
  )
}

export default Splash;
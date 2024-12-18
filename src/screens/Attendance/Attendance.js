import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import Constants from '../../Navigation/Constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

const background = require('../../assets/images/background.png');

const Attendance = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.image_background}> 
        <View style={styles.header_container}>
            <TouchableOpacity onPress={ () => navigation.navigate(Constants.DASHBOARD)} activeOpacity={0.8}>
                <Icon name="long-arrow-alt-left" style={styles.header_icon}/>
            </TouchableOpacity>
            <View style={styles.header_text_container}>
                <Text style={styles.header_text}>Attendance</Text>
            </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Attendance;
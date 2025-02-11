import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import styles from './styles';
import Constants from '../../Navigation/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const logo_large = require('../../assets/images/child-care-logo-large.png');
const background = require('../../assets/images/background.png');

const LoginOption = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('Parent');

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    if (option === 'Parent') {
      navigation.navigate(Constants.LOGIN);
    }
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.logo_area}>
        <Image source={logo_large} />
      </View>
      <View style={styles.option_container}>
        <Text style={styles.heading_text}>Choose Your Option</Text>
        <View style={styles.options}>

          <TouchableOpacity style={[styles.owner,
          selectedOption === 'Owner' && styles.activeOption,
          ]} activeOpacity={0.8} onPress={() => handleOptionPress('Owner')}>
            <FontAwesome5 name="school" style={[styles.icon_size, selectedOption === 'Owner' && styles.activeIcon,]} />
            <Text style={[
              styles.owner_text,
              selectedOption === 'Owner' && styles.activeText,
            ]}>Owner</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[
            styles.teacher,
            selectedOption === 'Teacher' && styles.activeOption,
          ]} activeOpacity={0.8} onPress={() => handleOptionPress('Teacher')}>
            <FontAwesome5 name="chalkboard-teacher" style={[styles.icon_size, selectedOption === 'Teacher' && styles.activeIcon]} />
            <Text style={[
              styles.teacher_text,
              selectedOption === 'Teacher' && styles.activeText,
            ]}>Teacher</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[
            styles.parent,
            selectedOption === 'Parent' && styles.activeOption,
          ]} onPress={() => handleOptionPress('Parent')} activeOpacity={0.8}>
            <FontAwesome5 name="user-friends" style={[styles.icon_size, selectedOption === 'Parent' && styles.activeIcon]} />
            <Text style={[
              styles.parent_text,
              selectedOption === 'Parent' && styles.activeText,
            ]}>Parent</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default LoginOption;
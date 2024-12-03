import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import styles from './styles';


const Calendar = () => {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{color:'#000', fontSize:30, fontFamily:'Poppins Regular'}}>Calendar Screen</Text>
    </View>
  )
}

export default Calendar;
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const logo_large = require('../assets/images/child-care-logo-large.png');
const owner_icon = require('../assets/images/owner-icon.png');
const parent_icon = require('../assets/images/parent-icon.png');
const teacher_icon = require('../assets/images/teacher-icon.png');
const background = require('../assets/images/background.png')

const LoginOption = ({ navigation }) => {
  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.logo_area}>
        <Image source={logo_large} style={styles.logo_large}/>
      </View>
      <View style={styles.option_container}>
        <Text style={styles.heading_text}>Choose Your Option</Text>
        <View style={styles.options}>

          <TouchableOpacity style={styles.owner}>
            <Image source={owner_icon} style={styles.icon_size}/>
            <Text style={styles.owner_text}>Owner</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.teacher}>
            <Image source={teacher_icon} style={styles.teicon_size}/>
            <Text style={styles.teacher_text}>Teacher</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.parent} onPress={() => navigation.navigate('Login')}>
            <Image source={parent_icon} style={styles.picon_size}/>
            <Text style={styles.parent_text}>Parent</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </ImageBackground>
  )
}

export default LoginOption

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  logo_area:{
    flex:1,
    marginTop:40,
    alignItems:'center'

  },
  logo_large:{
    height:80,
  },
  option_container:{
    flex:2,
    alignItems:'center',
    marginTop:70
  },
  heading_text:{
    color:'black',
    fontWeight:'500',
    fontSize:22,
    marginBottom:48,
    fontFamily:'Poppins Medium'
  },
  options:{
    flexDirection:'row',
    flexWrap:'wrap',
    paddingLeft:30,
    paddingRight:30
  },
  owner:{
    flex:1,
    backgroundColor:'#2CABE2',
    height:100,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:7,
    borderWidth: 1,
    borderColor: '#E1F3FB',
    borderStyle: 'solid',
    marginRight:15

  },
  icon_size:{
    width:40,
    height:40,
  },
  owner_text:{
    fontSize:14,
    color:'white',
    fontFamily:'Poppins Medium'
  },
  teacher:{
    flex:1,
    height:100,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:7,
    borderWidth: 1,
    borderColor: '#E1F3FB',
    borderStyle: 'solid',
    marginRight:15,
    backgroundColor:'white'
  },
  teacher_text:{
    fontSize:14,
    fontFamily:'Poppins Medium',
    color:'black',
    marginTop:8
  },
  parent:{
    flex:1,
    height:100,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:7,
    borderWidth: 1,
    borderColor: '#E1F3FB',
    borderStyle: 'solid',
    backgroundColor:'white'
  },
  parent_text:{
    fontSize:14,
    fontFamily:'Poppins Medium',
    color:'black',
    marginTop:8
  },
})
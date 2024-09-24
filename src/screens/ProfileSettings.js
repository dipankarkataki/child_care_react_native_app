import { ImageBackground, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const backgroundImage = require('../assets/images/background.png');
const profileImage = require('../assets/images/profile-image.png');

const ProfileSettings = ({ navigation }) => {

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [kioskPin, setKioskPin] = useState('12345');
    let [phone, setPhone] = useState('');
    const [confirmPasswordVisibilty, setConfirmPasswordVisibility] = useState(true);

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <View style={styles.profile_header}>
                <TouchableOpacity style={styles.profile_back_button} onPress={ () => navigation.navigate('Dashboard') }>
                    <Icon name="angle-left" style={styles.back_btn_icon} />
                </TouchableOpacity>

                <View style={styles.profile_image_container}>
                    <Image source={profileImage} style={styles.profile_header_image} />
                    <TouchableOpacity style={styles.edit_image_btn}>
                        <Icon name="pencil" style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.profile_header_name}>William J. Sartor</Text>
                <Text style={styles.profile_header_email}>william.jSartor@daycare.com</Text>
            </View>
            <ScrollView style={styles.profile_content_container}>
                <View style={styles.card}>
                    <View style={styles.text_input_container}>
                        <Text style={styles.input_title}>First Name</Text>
                        <TextInput 
                            style={styles.text_input} 
                            placeholder='William.J' 
                            placeholderTextColor='#b9b9b9' 
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                        />
                    </View>
                    <View style={styles.text_input_container}>
                        <Text style={styles.input_title}>Last Name</Text>
                        <TextInput 
                            style={styles.text_input} 
                            placeholder='Sartor' 
                            placeholderTextColor='#b9b9b9'
                            value={lastName}
                            onChangeText={(text) => setLastName(text)} 
                        />
                    </View>
                    <View style={styles.text_input_container}>
                        <Text style={styles.input_title}>Phone Number</Text>
                        <TextInput 
                            style={styles.text_input} 
                            maxLength={10} keyboardType="number-pad" 
                            placeholder='631-932-5700' 
                            placeholderTextColor='#b9b9b9'
                            value={phone}
                            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))} 
                        />
                    </View>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.family_details_card} onPress={() => navigation.navigate('FamilyDetails')}>
                        <Text style={styles.family_details_text}>Family Details</Text>
                        <Icon name="angle-right" style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <Text style={styles.title_text}>Security</Text>
                    <TouchableOpacity style={styles.family_details_card} onPress={() => navigation.navigate('FamilyDetails')}>
                        <Text style={styles.change_password_text}>Change Password</Text>
                        <Icon name="angle-right" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.title_text}>KIOSK ACCESS (PIN)</Text>
                    <View style={styles.kiosk_container}>
                        <TextInput 
                            style={styles.kiosk_input}
                            maxLength={4} keyboardType="number-pad" 
                            placeholder='* * * *' 
                            placeholderTextColor='#b9b9b9'
                            value={kioskPin}
                            secureTextEntry={confirmPasswordVisibilty}
                            onChangeText={(text) => setKioskPin(text.replace(/[^0-9]/g, ''))}
                            readOnly
                        />
                        <TouchableOpacity 
                            onPress={ () => setConfirmPasswordVisibility(!confirmPasswordVisibilty) } 
                            style={styles.show_kiosk_pin_text}>
                            <Text style={styles.show_kiosk_pin_text}>{ !confirmPasswordVisibilty ? 'Hide PIN' : 'Show PIN'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

export default ProfileSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile_header: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2CABE2',
        borderStyle: 'solid',
        backgroundColor: '#2CABE2',
        padding: 20,
    },
    profile_image_container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile_header_image: {
        height: 156,
        width: 156,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: 80,
        marginBottom: 20,
    },
    edit_image_btn: {
        position: 'absolute',
        bottom: 20,
        right: 10,          
        height: 35,
        width: 35,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    profile_header_name: {
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        color: 'white',
        marginBottom: 5,
    },
    profile_header_email: {
        fontSize: 14,
        fontFamily: 'Poppins Regular',
        color: '#C6D0DE'
    },
    back_btn_icon: {
        fontSize: 24,
    },
    icon: {
        fontSize: 20,
        fontWeight:'bold',
        color: '#2CABE2',
    },
    profile_back_button: {
        marginBottom: 20,
    },
    profile_content_container:{
        paddingLeft:10,
        paddingRight:15,
        paddingTop:10,
        marginBottom:80
    },
    card:{
        borderRadius:10,
        backgroundColor:'#fff',
        padding:15,
        elevation:2,
        marginBottom:20
    },text_input_container:{
        marginBottom:20
    }
    ,text_input:{
        backgroundColor:'#F1F6F6',
        fontSize:17,
        fontFamily:'Poppins Regular',
        borderRadius:6,
        paddingLeft:12,
        color:'#797979'
    },
    input_title:{
        color:'black',
        fontSize:17,
        fontFamily:'Poppins Medium',
        marginBottom:8
    },
    family_details_card:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    family_details_text:{
        color:'black',
        fontSize:17,
        fontFamily:'Poppins Medium',
    },
    title_text:{
        color:'#797979',
        fontSize:17,
        fontFamily:'Poppins Medium',
        marginBottom:16
    },
    change_password_text:{
        color:'black',
        fontSize:17,
        fontFamily:'Poppins Medium',
        paddingBottom:10
    },
    kiosk_container:{
        flexDirection:'row',
        alignItems:'center'
    }, 
    kiosk_input:{
        height:40,
        width:100,
        backgroundColor:'#F1F6F6',
        fontSize:17,
        fontFamily:'Poppins Regular',
        borderRadius:6,
        marginRight:20,
        color:'#797979',
        textAlign:'center',
        paddingBottom:5
    }, 
    show_kiosk_pin_text:{
        color:'#2CABE2',
        fontSize:17,
        fontFamily:'Poppins Medium',
    },
});

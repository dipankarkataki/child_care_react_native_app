import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const backgroundImage = require('../assets/images/background.png');
const ProfileSettings = ({ navigation }) => {

    const handleChangePassword = () => {
        console.log('Change Password Pressed');
    };

    const handleLogout = () => {
        navigation.replace('Login');
    };
    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
                <Icon name="lock" size={24} color="#4A90E2" style={styles.icon} />
                <Text style={styles.optionText}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={handleLogout}>
                <Icon name="sign-out" size={24} color="#E74C3C" style={styles.icon} />
                <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default ProfileSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f7',
        padding: 15,
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // Adds shadow for Android
    },
    icon: {
        marginRight: 15,
    },
    optionText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    }
})
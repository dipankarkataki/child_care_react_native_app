import { ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const background = require('../../assets/images/background.png')
const logo_large = require('../../assets/images/child-care-logo-large.png');

const SignUp = ({ navigation }) => {
    
    const [passwordVisibilty, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibilty, setConfirmPasswordVisibility] = useState(true);

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    const submitForm = () => {
        console.log('firstName :', firstName)
        console.log('lastName :', lastName)
        console.log('email :', email)
        console.log('phone :', phone)
        console.log('password :', password)
        console.log('confirmPassword :', confirmPassword)
    }
   

    return (
        <ImageBackground source={background} style={styles.container}>
            <ScrollView alwaysBounceVertical>
                <View style={styles.logo_area}>
                    <Image source={logo_large} style={styles.logo_large} />
                </View>
                <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : null} style={styles.register_container}>
                    <View style={styles.form}>
                        <View style={styles.name_area}>
                            <View style={styles.firstname}>
                                <Text style={styles.text_title}>First Name</Text>
                                <View style={styles.input_container}>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder="e.g Jhon"
                                        placeholderTextColor="#b9b9b9"
                                        value={firstName}
                                        onChangeText={ (text) => setFirstName(text) }
                                    />
                                </View>
                            </View>
                            <View style={styles.lastname}>
                                <Text style={styles.text_title}>Last Name</Text>
                                <View style={styles.input_container}>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder="e.g Doe"
                                        placeholderTextColor="#b9b9b9"
                                        value={lastName}
                                        onChangeText={ (text) => setLastName(text) }
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.email_area}>
                            <Text style={styles.text_title}>Email</Text>
                            <View style={styles.input_container}>
                                <TextInput
                                    style={styles.text_input}
                                    placeholder="e.g jhondoe@xyz.com"
                                    placeholderTextColor="#b9b9b9"
                                    value={email}
                                    onChangeText={ (text) => setEmail(text) }
                                />
                                <Icon name="envelope" size={20} color="#888" style={styles.icon} />
                            </View>
                        </View>
                        <View style={styles.email_area}>
                            <Text style={styles.text_title}>Last 4 digits of your phone number</Text>
                            <View style={styles.input_container}>
                                <TextInput
                                    style={styles.text_input}
                                    placeholder="e.g 4567"
                                    placeholderTextColor="#b9b9b9"
                                    keyboardType="number-pad"
                                    value={phone}
                                    onChangeText={ (text) => setPhone(text) }
                                />
                                <TouchableOpacity style={styles.verify_phone_btn}>
                                    <Text style={styles.verify_phone_text}>Verify</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.password_area}>
                            <Text style={styles.text_title}>Password</Text>
                            <View style={styles.input_container}>
                                <TextInput
                                    style={styles.text_input}
                                    placeholder='* * * * * * * * * * *'
                                    placeholderTextColor='#b9b9b9'
                                    secureTextEntry={passwordVisibilty}
                                    value={password}
                                    onChangeText={ (text) => setPassword(text) }
                                />
                                {
                                    passwordVisibilty ?
                                        <TouchableOpacity onPress={() => setPasswordVisibility(false)}>
                                            <Icon name="eye-slash" size={20} color="#888" style={styles.icon} />
                                        </TouchableOpacity>
                                    :
                                        <TouchableOpacity onPress={() => setPasswordVisibility(true)}>
                                            <Icon name="eye" size={20} color="#888" style={styles.icon} />
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={styles.password_area}>
                            <Text style={styles.text_title}>Confirm Password</Text>
                            <View style={styles.input_container}>
                                <TextInput
                                    style={styles.text_input}
                                    placeholder='* * * * * * * * * * *'
                                    placeholderTextColor='#b9b9b9'
                                    secureTextEntry={confirmPasswordVisibilty}
                                    value={confirmPassword}
                                    onChangeText={ (text) => setConfirmPassword(text) }
                                />
                                {
                                    confirmPasswordVisibilty ?
                                        <TouchableOpacity onPress={() => setConfirmPasswordVisibility(false)}>
                                            <Icon name="eye-slash" size={20} color="#888" style={styles.icon} />
                                        </TouchableOpacity>
                                    :
                                        <TouchableOpacity onPress={() => setConfirmPasswordVisibility(true)}>
                                            <Icon name="eye" size={20} color="#888" style={styles.icon} />
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.form_btn_container}>
                        {/* <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('Dashboard')}>
                            <Text style={styles.register_text}>Register</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.register} onPress={ () => submitForm() }>
                            <Text style={styles.register_text}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.login_btn} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.login_btn_text}>Already have an account? <Text style={styles.login_text}>Login</Text></Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </ImageBackground>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo_area: {
        flex:1,
        marginTop: 50,
        alignItems: 'center'
    },
    logo_large: {
        height: 80,
    },
    register_container: {
        flex: 1,
        marginTop: 30,

    },
    heading: {
        color: "#000000",
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 50,
        fontWeight: '600',
    },
    form: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
    },
    name_area: {
        flexDirection: 'row',
        marginBottom: 15
    },
    firstname: {
        flex: 1,
        marginRight: 10
    },
    lastname: {
        flex: 1,
    },
    email_area: {
        marginBottom: 15
    },
    password_area: {
        marginBottom: 15
    },
    text_title: {
        color: '#535353',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10
    },
    text_input: {
        flex: 1,
        fontSize: 18,
        color: '#535353',
        padding: 15,
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    icon: {
        marginRight: 10,
        color: 'black'
    },
    form_btn_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 20,
        marginTop: 30
    },
    register: {
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    register_text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '700',

    },
    login_btn: {
        marginTop: 10,
        marginBottom:50,
    },
    login_btn_text: {
        color: '#000000',
        fontWeight: '500',
    },
    login_text: {
        color: '#2CABE2',
        fontWeight: '500',
    },
    verify_phone_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1ab394',
        backgroundColor: '#1ab394',
        borderStyle: 'solid',
        width: 70,
        padding: 5,
        borderRadius: 5,
    },
    verify_phone_text: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500'
    }
})
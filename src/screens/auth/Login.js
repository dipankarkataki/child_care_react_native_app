import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginApi from '../../api/LoginApi';

const background = require('../../assets/images/background.png');
const logo_large = require('../../assets/images/child-care-logo-large.png');

const Login = ({ navigation }) => {
    const [passwordVisibilty, setPasswordVisibility] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Valid email is required';
            isValid = false;
        } else {
            newErrors.email = '';
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const submitForm = () => {
        if (validateForm()) {
            if (email === 'parent@gmail.com') {
                navigation.navigate('Dashboard');
            } else {
                console.warn('Oops! Incorrect credentials');
            }
            // Uncomment this when API integration is ready
            // LoginApi({
            //     'email': email,
            //     'password': password
            // }).then((result) => {
            //     console.log('Result--- ', result.data);
            //     if (result && result.data) {
            //         // Handle successful login
            //     } else {
            //         console.log('No data found');
            //     }
            // }).catch((err) => {
            //     console.log(err);
            // });
        }
    };

    return (
        <ImageBackground source={background} style={styles.container}>
            <ScrollView alwaysBounceVertical>
                <View style={styles.logo_area}>
                    <Image source={logo_large} style={styles.logo_large} />
                </View>
                <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : null} style={styles.form}>
                    <View style={styles.email_area}>
                        <Text style={styles.text_title}>Email</Text>
                        <View style={[styles.input_container, { borderColor: errors.email ? 'red' : '#E1F3FB' }]}>
                            <TextInput
                                style={styles.text_input}
                                placeholder="e.g jhondoe@xyz.com"
                                placeholderTextColor="#b9b9b9"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <Icon name="envelope" size={20} color="#888" style={styles.icon} />
                        </View>
                        {errors.email ? <Text style={styles.error_text}>{errors.email}</Text> : null}
                    </View>
                    <View style={styles.password_area}>
                        <Text style={styles.text_title}>Password</Text>
                        <View style={[styles.input_container, { borderColor: errors.password ? 'red' : '#E1F3FB' }]}>
                            <TextInput
                                style={styles.text_input}
                                placeholder='* * * * * * * * * * *'
                                placeholderTextColor='#b9b9b9'
                                secureTextEntry={passwordVisibilty}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
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
                        {errors.password ? <Text style={styles.error_text}>{errors.password}</Text> : null}
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.form_btn_container}>
                    <TouchableOpacity style={styles.login_btn} onPress={submitForm}>
                        <Text style={styles.login_btn_text}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signup_btn} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signup_btn_text}>Don't have an account? <Text style={styles.signup_text}>Sign Up</Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signup_btn} onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgot_password}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 40
    },
    logo_area: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 50,
    },
    logo_large: {
        height: 80,
    },
    form: {
        flex: 1,
        marginTop: 70,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 50
    },
    email_area: {
        marginBottom: 30
    },
    password_area: {
        marginBottom: 20
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
        padding: 15
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
        color: 'black',
        backgroundColor: '#fff'
    },
    form_btn_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 20,
        marginTop: 20
    },
    login_btn: {
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    login_btn_text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '700',
    },
    forgot_password: {
        color: '#E21C1C',
        marginTop: 20,
        fontSize: 18,
        fontWeight: '700',
    },
    signup_btn: {
        marginTop: 10
    },
    signup_btn_text: {
        color: '#000000',
        fontWeight: '500',
    },
    signup_text: {
        color: '#2CABE2',
        fontWeight: '500',
    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5
    }
});

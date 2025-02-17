import { ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import Constants from '../../../Navigation/Constants';

const background = require('../../../assets/images/background.png')
const logo_large = require('../../../assets/images/child-care-logo-large.png');

const SignUp = ({ navigation }) => {

    const [passwordVisibilty, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibilty, setConfirmPasswordVisibility] = useState(true);
    const [loader, setLoader] = useState(false);

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!firstName) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        } else {
            newErrors.firstName = '';
        }

        if (!lastName) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        } else {
            newErrors.lastName = '';
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Valid email is required';
            isValid = false;
        } else {
            newErrors.email = '';
        }

        if (!phone || phone.length !== 4) {
            newErrors.phone = 'Please enter the last 4 digits of your phone number';
            isValid = false;
        } else {
            newErrors.phone = '';
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else {
            newErrors.password = '';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        } else {
            newErrors.confirmPassword = '';
        }

        setErrors(newErrors);
        return isValid;
    }

    const submitForm = () => {
        if (validateForm()) {
            setLoader(true);
            setTimeout( () => {
                setLoader(false);
                console.warn('Signup Successfull!')
            },2000);
            // console.log('Form Submitted');
            // console.log('firstName :', firstName);
            // console.log('lastName :', lastName);
            // console.log('email :', email);
            // console.log('phone :', phone);
            // console.log('password :', password);
            // console.log('confirmPassword :', confirmPassword);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
            <View style={styles.header_container}>
                <TouchableOpacity onPress={ () => navigation.navigate(Constants.LOGIN)}>
                    <Icon name="long-arrow-alt-left" style={styles.header_icon}/>
                </TouchableOpacity>
                <View style={styles.header_text_container}>
                    <Text style={styles.header_text}>Sign Up</Text>
                </View>
            </View>
            <ScrollView alwaysBounceVertical style={styles.scrollView_container}>
                <View style={styles.logo_area}>
                    <Image source={logo_large} style={styles.logo_large} />
                </View>
                <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : null} style={styles.register_container}>
                    <View style={styles.form}>
                        <View style={styles.name_area}>
                            <View style={styles.firstname}>
                                <Text style={styles.text_title}>First Name</Text>
                                <View style={[styles.input_container, { borderColor: errors.firstName ? 'red' : '#E1F3FB' }]}>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder="e.g Jhon"
                                        placeholderTextColor="#b9b9b9"
                                        value={firstName}
                                        onChangeText={(text) => setFirstName(text)}
                                    />
                                </View>
                                {errors.firstName ? <Text style={styles.error_text}>{errors.firstName}</Text> : null}
                            </View>
                        </View>

                        <View style={styles.name_area}>
                            <View style={styles.lastname}>
                                <Text style={styles.text_title}>Last Name</Text>
                                <View style={[styles.input_container, { borderColor: errors.lastName ? 'red' : '#E1F3FB' }]}>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder="e.g Doe"
                                        placeholderTextColor="#b9b9b9"
                                        value={lastName}
                                        onChangeText={(text) => setLastName(text)}
                                    />
                                </View>
                                {errors.lastName ? <Text style={styles.error_text}>{errors.lastName}</Text> : null}
                            </View>
                        </View>

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

                        <View style={styles.email_area}>
                            <Text style={styles.text_title}>Last 4 digits of your phone number</Text>
                            <View style={[styles.input_container, { borderColor: errors.phone ? 'red' : '#E1F3FB' }]}>
                                <TextInput
                                    style={styles.text_input}
                                    placeholder="e.g 4567"
                                    placeholderTextColor="#b9b9b9"
                                    keyboardType="number-pad"
                                    value={phone}
                                    onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                                    maxLength={4}
                                />
                                <TouchableOpacity style={styles.verify_phone_btn}>
                                    <Text style={styles.verify_phone_text}>Verify</Text>
                                </TouchableOpacity>
                            </View>
                            {errors.phone ? <Text style={styles.error_text}>{errors.phone}</Text> : null}
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

                        <View style={styles.password_area}>
                            <Text style={styles.text_title}>Confirm Password</Text>
                            <View style={[styles.input_container, { borderColor: errors.confirmPassword ? 'red' : '#E1F3FB' }]}>
                                <TextInput
                                    style={styles.text_input}
                                    placeholder='* * * * * * * * * * *'
                                    placeholderTextColor='#b9b9b9'
                                    secureTextEntry={confirmPasswordVisibilty}
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
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
                            {errors.confirmPassword ? <Text style={styles.error_text}>{errors.confirmPassword}</Text> : null}
                        </View>

                    </View>
                    <View style={styles.form_btn_container}>
                        <TouchableOpacity style={styles.register} onPress={() => submitForm()} disabled={loader}>
                            <Text style={styles.register_text}>{loader ? 'Please wait...' : 'Sign Up'}</Text>
                            <ActivityIndicator size="large" color='#2E78FF' style={styles.activity_indicator} animating={loader}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.login_btn} onPress={() => navigation.navigate(Constants.LOGIN)}>
                            <Text style={styles.login_btn_text}>Already have an account? <Text style={styles.login_text}>Login</Text></Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
        
    )
}

export default SignUp;
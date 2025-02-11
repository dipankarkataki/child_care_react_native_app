import {Text, View, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginApi from '../../../api/LoginApi';
import ModalComponent from '../../../components/ModalComponent';
import TokenManager from '../../../api/TokenManager';
import { useDispatch } from 'react-redux';
import { setGlobalProfileImage } from '../../../redux/action/profileImageAction';
import { setUserAuthToken } from '../../../redux/action/userAuthLoginAction';
import { setUserProfileData } from '../../../redux/action/UserProfileDataAction';
import styles from './styles';
import Constants from '../../../Navigation/Constants';

const background = require('../../../assets/images/background.png');
const logo_large = require('../../../assets/images/child-care-logo-large.png');

const Login = ({ navigation }) => {

    const dispatch = useDispatch();

    const [passwordVisibilty, setPasswordVisibility] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(true);
    const [modalMessage, setModalMessage] = useState('');
    const [modalIcon, setModalIcon] = useState(null); 
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
            setLoader(true);
            LoginApi({
                'email': email.toLocaleLowerCase(),
                'password': password
            }).then( async (result) => {
                
                if(result.data && result.data.status == 200){
                    await TokenManager.setToken(result.data.token);
                    await TokenManager.setUserId(result.data.data.user_id.toString());
                    if(result.data.data.aNet_customer_profile_id != null){
                        await TokenManager.setCustomerProfileId(result.data.data.aNet_customer_profile_id.toString())
                    }
                    
                    if(result.data.data.profile_image != null){
                        dispatch(setGlobalProfileImage(result.data.data.profile_image))
                    }

                    dispatch(setUserAuthToken(result.data.token));
                    dispatch(setUserProfileData(result.data.data));

                    navigation.replace(Constants.DASHBOARD);
                }else{
                    setLoader(false);
                    setModalVisible(true);
                    setModalIcon('error');
                    setModalMessage(result.data.message);
                    setShouldNavigate(false)
                }
            }).catch((err) => {
                if(err){
                    setLoader(false);
                    setModalVisible(true);
                    setModalIcon('error');
                    setModalMessage('Oops! Something went wrong. Please try after sometime.');
                    setShouldNavigate(false)
                }
                console.log('Error --> ',err);
            });
        }
    };

    const handleOnClose = () => {
        setModalVisible(false)
    }

    const comingSoonFeature = (destination) => {
        
        Alert.alert('Feature Coming Soon! 🚀.', "Currently all signups are done from childcare web app. Please visit https://childcaresoftware.com, but if you want to get the look and feel then click navigate otherwise click close.",[{
            text :'Close',
        },{
            text : 'Navigate',
            onPress:  () => navigation.navigate(destination)
        }])
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
                <View style={styles.header_container}>
                    {/* <Text style={styles.header_text}>Login</Text> */}
                </View>
                <ScrollView alwaysBounceVertical style={styles.scrollView_container}>
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
                        <TouchableOpacity style={styles.login_btn} onPress={submitForm} disabled={loader}>
                            <Text style={styles.login_btn_text}>{loader ? 'Loging in...' : 'Login'}</Text>
                            <ActivityIndicator size="large" color='#2E78FF' style={styles.activity_indicator} animating={loader}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signup_btn} onPress={() => comingSoonFeature(Constants.SIGN_UP)}>
                            <Text style={styles.signup_btn_text}>Don't have an account? <Text style={styles.signup_text}>Sign Up</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signup_btn} onPress={() => navigation.navigate(Constants.FORGOT_PASSWORD)}>
                            <Text style={styles.forgot_password}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <ModalComponent 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    message={modalMessage}
                    onClose={handleOnClose}
                    icon={modalIcon}
                />
            </ImageBackground>
        </SafeAreaView>
        
    );
};

export default Login;

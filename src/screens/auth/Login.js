import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginApi from '../../api/LoginApi';
import ModalComponent from '../../components/ModalComponent';
import TokenManager from '../../api/TokenManager';
import { useDispatch } from 'react-redux';
import { setGlobalProfileImage } from '../../redux/action';

const background = require('../../assets/images/background.png');
const logo_large = require('../../assets/images/child-care-logo-large.png');

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
                console.log('Login Details --- ', result.data.data);
                
                if(result.data.status == 200){
                    await TokenManager.setToken(result.data.token);
                    await TokenManager.setUserId(result.data.data.user_id.toString());
                    if(result.data.data.aNet_customer_profile_id != null){
                        await TokenManager.setCustomerProfileId(result.data.data.aNet_customer_profile_id.toString())
                    }
                    // await TokenManager.setUserProfileImage(result.data.data.profile_image)
                    if(result.data.data.profile_image != null){
                        dispatch(setGlobalProfileImage(result.data.data.profile_image))
                    }
                    navigation.replace('Dashboard');
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
                    <TouchableOpacity style={styles.login_btn} onPress={submitForm} disabled={loader}>
                        <Text style={styles.login_btn_text}>{loader ? 'Loging in...' : 'Login'}</Text>
                        <ActivityIndicator size="large" color='#2E78FF' style={styles.activity_indicator} animating={loader}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signup_btn} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signup_btn_text}>Don't have an account? <Text style={styles.signup_text}>Sign Up</Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signup_btn} onPress={() => navigation.navigate('ForgotPassword')}>
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
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft:20,
        paddingRight:20
    },
    logo_area: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    logo_large: {
        height: 80,
    },
    form: {
        flex: 2,
        marginTop: 130,
    },
    email_area: {
        marginBottom: 34
    },
    password_area: {
        marginBottom: 34
    },
    text_title: {
        color: '#535353',
        fontSize: 17,
        marginBottom: 8,
        fontFamily:'Poppins Medium'
    },
    text_input: {
        flex: 1,
        fontSize: 17,
        color: '#535353',
        padding: 12,
        fontFamily:'Poppins Regular'
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
        marginTop: 100
    },
    login_btn: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_btn_text: {
        color: '#000000',
        fontSize: 18,
        marginLeft:45,
        fontFamily:'Poppins Medium',
        
    },
    forgot_password: {
        color: '#E21C1C',
        fontSize: 14,
        fontFamily:'Poppins Medium'
    },
    signup_btn: {
        marginTop: 12,
    },
    signup_btn_text: {
        color: '#000000',
        fontFamily:'Poppins Medium'
    },
    signup_text: {
        color: '#2CABE2',
        fontFamily:'Poppins Medium'
    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5
    },
    activity_indicator:{
        marginLeft:10, 
    },  
});

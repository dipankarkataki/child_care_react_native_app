import { ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalComponent from '../../../components/ModalComponent';
import styles from './styles';
import Constants from '../../../Navigation/Constants';
import CreateNewPasswordApi from '../../../api/ForgotPasswordApi/CreateNewPassword/CreateNewPasswordApi';

const background = require('../../../assets/images/background.png')
const logo_large = require('../../../assets/images/child-care-logo-large.png');

const ChangePassword = ({ navigation, route }) => {
    const { email } = route.params;
    const [passwordVisibilty, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibilty, setConfirmPasswordVisibility] = useState(true);
    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIcon, setModalIcon] = useState(null); 
    const [shouldNavigate, setShouldNavigate] = useState(true);
    const [modalMessage, setModalMessage] = useState('');

    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    });

    

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

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

    const submitForm = async () => {
        if (validateForm()) {
            setLoader(true);
            try{
                const result = await CreateNewPasswordApi({
                    'email' : email,
                    'password' : password
                });
                if(result.data && result.data.status === true){
                    setLoader(false);
                    setModalVisible(true);
                    setModalIcon('success');
                    setModalMessage('Password changed successfully.');
                    setShouldNavigate(true)
                }else{
                    setLoader(false);
                    setModalVisible(true);
                    setModalIcon('error');
                    setModalMessage(result.data.message);
                    setShouldNavigate(false)
                }
            }catch(err){
                setLoader(false);
                setModalVisible(true);
                setModalIcon('error');
                setModalMessage('Oops! Something went wrong. Please try after sometime.');
                setShouldNavigate(false)
                // console.log('Change Pwd Error --', err)
            }
        }
    }

    const handleOnClose = () => {
        if(shouldNavigate){
            navigation.replace(Constants.LOGIN)
        }else{
            setModalVisible(false);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
                <View style={styles.header_container}>
                    <TouchableOpacity onPress={ () => navigation.navigate(Constants.FORGOT_PASSWORD)}>
                        <Icon name="long-arrow-alt-left" style={styles.header_icon}/>
                    </TouchableOpacity>
                    <View style={styles.header_text_container}>
                        <Text style={styles.header_text}>Change Password</Text>
                    </View>
                </View>
                <ScrollView alwaysBounceVertical style={{paddingHorizontal:20}}>
                    <View style={styles.logo_area}>
                        <Image source={logo_large} style={styles.logo_large} />
                    </View>
                    <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : null} style={styles.change_password_container}>
                        <View style={styles.form}>
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
                            <TouchableOpacity style={styles.change_password} onPress={() => submitForm()} disabled={loader}>
                                <Text style={styles.change_password_text}>{loader ? 'Please wait...' : 'Change Password'}</Text>
                                <ActivityIndicator size="large" color='#2E78FF' style={styles.activity_indicator} animating={loader}/>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
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
        
    )
}

export default ChangePassword;
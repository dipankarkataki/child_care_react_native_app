import { ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalComponent from '../../../components/ModalComponent';
import styles from './styles';
import Constants from '../../../Navigation/Constants';
import SendResetCodeApi from '../../../api/ForgotPasswordApi/SendResetCode/SendResetCodeApi';

const background = require('../../../assets/images/background.png')
const logo_large = require('../../../assets/images/child-care-logo-large.png');

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIcon, setModalIcon] = useState(null); 
    const [shouldNavigate, setShouldNavigate] = useState(true);
    const [modalMessage, setModalMessage] = useState('');

    const [errors, setErrors] = useState({
        email: '',
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

        setErrors(newErrors);
        return isValid;
    };

    const submitForm = async () => {
        if (validateForm()) {
            setLoader(true);
            try{
                const result = await SendResetCodeApi({
                    'email' : email
                });
                if(result.data && result.data.status === true){
                    setLoader(false);
                    setModalVisible(true);
                    setModalIcon('success');
                    setModalMessage('Reset code has been sent successfully.');
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
                console.log('Send Reset Pwd Error --', err)
            }
        }
    }

    const handleOnClose = () => {
        if(shouldNavigate){
            navigation.navigate(Constants.VERIFY_OTP)
        }else{
            setModalVisible(false)
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
                    <Text style={styles.header_text}>Forgot Password</Text>
                </View>
            </View>
            <View style={styles.logo_area}>
                <Image source={logo_large} style={styles.logo_large} />
            </View>
            <View style={[styles.forgot_password_container, {paddingHorizontal:20}]}>
                <KeyboardAvoidingView style={styles.form}>
                    <View style={styles.email_area}>
                        <Text style={styles.text_title}>Enter Registered Email</Text>
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
                    <TouchableOpacity style={styles.forgot_password} onPress={() => submitForm() } disabled={loader} >
                        <Text style={styles.forgot_password_text}>{loader ? 'Sending...' : 'Send Reset Code'}</Text>
                        <ActivityIndicator size="large" color='#2E78FF' style={styles.activity_indicator} animating={loader}/>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
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

export default ForgotPassword;
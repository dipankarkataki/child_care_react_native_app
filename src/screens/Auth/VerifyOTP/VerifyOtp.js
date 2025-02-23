import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform, ActivityIndicator, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalComponent from '../../../components/ModalComponent';
import styles from './styles';
import Constants from '../../../Navigation/Constants';
import VerifyOTPApi from '../../../api/ForgotPasswordApi/VerifyOTP/VerifyOTPApi';

const backgroundImage = require('../../../assets/images/background.png')
const logo_large = require('../../../assets/images/child-care-logo-large.png');

const VerifyOtp = ({navigation, route}) => {

    const { email } = route.params;
    const [otp, setOtp] = useState('');
    const [loader, setLoader] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalIcon, setModalIcon] = useState(null); 
    const [shouldNavigate, setShouldNavigate] = useState(true);
    const [modalMessage, setModalMessage] = useState('');
    
    const [errors, setErrors] = useState({
        otp: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!otp || !/^\d{6}$/.test(otp)) {
            newErrors.otp = 'Please Enter 6 Digit OTP';
            isValid = false;
        } else {
            newErrors.otp = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const submitForm = async () =>{
        if (validateForm()) {
            setLoader(true);
            try{
                const result = await VerifyOTPApi({
                    'email' : email,
                    'otp' : otp
                });
                if(result.data && result.data.status === true){
                    setLoader(false);
                    setModalVisible(true);
                    setModalIcon('success');
                    setModalMessage('OTP verified successfully.');
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
                // console.log('Verify OTP Error --', err)
            }
            
        }
    }

    const handleOnClose = () => {
        if(shouldNavigate){
            navigation.navigate(Constants.CHANGE_PASSWORD, {email: email})
        }else{
            setModalVisible(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.image_background}>
                <View style={styles.header_container}>
                    <TouchableOpacity onPress={ () => navigation.navigate(Constants.FORGOT_PASSWORD)}>
                        <Icon name="long-arrow-alt-left" style={styles.header_icon}/>
                    </TouchableOpacity>
                    <View style={styles.header_text_container}>
                        <Text style={styles.header_text}>Verify OTP</Text>
                    </View>
                </View>
                <View style={styles.logo_area}>
                    <Image source={logo_large} style={styles.logo_large} />
                </View>
                <View style={[styles.verify_otp_container, {paddingHorizontal:20}]}>
                    <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : null} style={styles.form} >
                        <View style={styles.otp_area}>
                            <Text style={styles.text_title}>Enter 6 Digit OTP</Text>
                            <View style={[styles.input_container, { borderColor: errors.otp ? 'red' : '#E1F3FB' }]}>
                                <TextInput
                                    style={styles.text_input}
                                    placeholder="e.g 012345"
                                    placeholderTextColor="#b9b9b9"
                                    value={otp}
                                    maxLength={6}
                                    keyboardType="number-pad"
                                    onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ''))}
                                />
                                <Icon name="mobile-alt" size={20} color="#888" style={styles.icon} />
                            </View>
                            {errors.otp ? <Text style={styles.error_text}>{errors.otp}</Text> : null}
                        </View>
                        <TouchableOpacity style={styles.verify_otp} onPress={() => submitForm()} disabled={loader}>
                            <Text style={styles.verify_otp_text}>{loader ? 'Verifying...' : 'Verify OTP'}</Text>
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

export default VerifyOtp;
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform, ActivityIndicator, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalComponent from '../../components/ModalComponent';

const backgroundImage = require('../../assets/images/background.png')
const logo_large = require('../../assets/images/child-care-logo-large.png');

const VerifyOtp = ({navigation}) => {

    const [otp, setOtp] = useState('');
    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(true);
    const [errors, setErrors] = useState({
        email: '',
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

    const submitForm = () =>{
        if (validateForm()) {
            setLoader(true);
            setTimeout( () => {
                setLoader(false);
                console.log('otp :', otp);
                setModalVisible(true);
            },2000);
            
        }
    }

    const handleOnClose = () => {
        if(shouldNavigate){
            navigation.navigate('ChangePassword')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.image_background}>
                <View style={styles.logo_area}>
                    <Image source={logo_large} style={styles.logo_large} />
                </View>
                <View style={styles.verify_otp_container}>
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
                                <Icon name="mobile-phone" size={20} color="#888" style={styles.icon} />
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
                    message="OTP verified successfully"
                    onClose={handleOnClose}
                    icon="success"
                />
            </ImageBackground>
        </SafeAreaView>
        
    )
}

export default VerifyOtp

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background:{
        flex:1,
        paddingHorizontal:20,
    },
    logo_area: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center'
    },
    logo_large: {
        height: 80,
    },
    verify_otp_container: {
        flex: 3,
        marginTop: 70,
    },
    form: {
        flex: 1,
    },
    otp_area: {
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
        fontFamily:'Poppins Regular',
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
    verify_otp: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    verify_otp_text: {
        color: '#000000',
        fontSize: 18,
        fontFamily:'Poppins Medium',
        marginLeft:40,

    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5
    },
})
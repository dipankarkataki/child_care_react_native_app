import { ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalComponent from '../../components/ModalComponent';

const background = require('../../assets/images/background.png')
const logo_large = require('../../assets/images/child-care-logo-large.png');

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(true);

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

    const submitForm = () => {
        if (validateForm()) {
            setLoader(true);
            setTimeout( () => {
                setLoader(false);
                setModalVisible(true);
                console.log('email :', email);
            },2000);
        }
    }

    const handleOnClose = () => {
        if(shouldNavigate){
            navigation.navigate('VerifyOtp')
        }
    }

    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={styles.logo_area}>
                <Image source={logo_large} style={styles.logo_large} />
            </View>
            <View style={styles.forgot_password_container}>
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
                message="Reset password code has been sent to your registered email"
                onClose={handleOnClose}
                icon="success"
            />
        </ImageBackground>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo_area: {
        flex: 1,
        marginTop: 60,
        alignItems: 'center'
    },
    logo_large: {
        height: 80,
    },
    forgot_password_container: {
        flex: 3,
        marginTop: 30,
    },
    form: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    },
    email_area: {
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
        height: 50
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
    forgot_password: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgot_password_text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '700',
        marginLeft:43,

    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5
    },
    activity_indicator:{
        marginLeft:10, 
    },  
})
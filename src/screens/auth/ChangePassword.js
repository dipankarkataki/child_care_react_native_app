import { ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalComponent from '../../components/ModalComponent';

const background = require('../../assets/images/background.png')
const logo_large = require('../../assets/images/child-care-logo-large.png');

const ChangePassword = ({ navigation }) => {

    const [passwordVisibilty, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibilty, setConfirmPasswordVisibility] = useState(true);
    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(true);

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

    const submitForm = () => {
        if (validateForm()) {
            setLoader(true);
            setTimeout( () => {
                setLoader(false);
                console.log('password :', password);
                console.log('confirmPassword :', confirmPassword);
                setModalVisible(true);
            },2000);
            
        }
    }

    const handleOnClose = () => {
        if(shouldNavigate){
            navigation.replace('Login')
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
                <ScrollView alwaysBounceVertical>
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
                    message="Password changed successfully"
                    onClose={handleOnClose}
                    icon="success"
                
                />
            </ImageBackground>
        </SafeAreaView>
        
    )
}

export default ChangePassword

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
    change_password_container: {
        flex: 1,
        marginTop: 125,
    },
    form: {
        flex: 1,
    },
    password_area: {
        marginBottom: 25
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
    form_btn_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    change_password: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    change_password_text: {
        color: '#000000',
        fontSize: 18,
        fontFamily:'Poppins Medium',
        marginLeft:40,

    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    }
})
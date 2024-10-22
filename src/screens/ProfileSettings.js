import { ImageBackground, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView, Modal, Animated } from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileDetailsApi from '../api/ProfileDetailsApi';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const backgroundImage = require('../assets/images/background.png');
const defaultProfileImage = require('../assets/images/profile-image.png'); 
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


const ProfileSettings = ({ navigation }) => {

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [kioskPin, setKioskPin] = useState('12345');
    let [phone, setPhone] = useState('');
    let [familyId, setFamilyId] = useState('');
    let [siteId, setSiteId] = useState('');
    let [oldPassword, setOldPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    const [kioskVisibilty, setKioskVisibility] = useState(true);
    const [oldPassVisibilty, setOldPassVisibility] = useState(true);
    const [newPassVisibilty, setNewPassVisibility] = useState(true);
    const [confirmPassVisibilty, setConfirmPassVisibility] = useState(true);
    const [profileImage, setProfileImage] = useState(defaultProfileImage);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const avatarRef = React.createRef();


    const selectProfileImage = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.7,
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                Alert.alert('Error', response.errorMessage || 'Something went wrong while selecting the image.');
            } else if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                setProfileImage({ uri: selectedImage.uri }); // Update the profile image state
                // TODO: Upload the selected image to your server if needed
                console.log('Selected Image -->', selectedImage.uri)
            }
        });
    };

    useEffect( () => {
        const profileHeaderAnimated = Animated.stagger(400, [avatarRef.current.getAnimated()]);
        Animated.loop(profileHeaderAnimated).start();


        ProfileDetailsApi()
        .then( (result) => {
            if(result.status == 200){
                setFirstName(result.data.data.firstname);
                setLastName(result.data.data.lastname);
                setEmail(result.data.data.email);
                setPhone(result.data.data.phone);
                setFamilyId(result.data.data.family_id);
                setSiteId(result.data.data.site_id);
                setLoading(false);
            }
            console.log('Result Data --', result.data)
        })
        .catch((err) => {
            console.log('Error --> ',err);
        });
    },[])

    const handleModalClose = () => {
        setModalVisible(false);
        setOldPassVisibility(true)
        setNewPassVisibility(true)
        setConfirmPassVisibility(true)
    };

    const handleSaveDetails = () => {
        handleModalClose();
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            {loading ? (
                <View style={styles.profile_header}>
                    <ShimmerPlaceholder ref={avatarRef} style={styles.profile_header_image} stopAutoRun />
                </View>
            ) : (
                <View style={styles.profile_header}>
                    <TouchableOpacity style={styles.profile_back_button} onPress={ () => navigation.navigate('Dashboard') }>
                        <Icon name="angle-left" style={styles.back_btn_icon} />
                    </TouchableOpacity>

                    <View style={styles.profile_image_container}>
                        <Image source={profileImage} style={styles.profile_header_image} />
                        <TouchableOpacity style={styles.edit_image_btn} onPress={selectProfileImage}> 
                            <Icon name="pencil" style={styles.icon} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.profile_header_name}>{firstName} {lastName}</Text>
                    <Text style={styles.profile_header_email}>{email}</Text>
                </View>
            )}
            <ScrollView style={styles.profile_content_container}>
                {loading ? (
                    <View>
                        <ShimmerPlaceholder style={styles.shimmerInputPlaceholder} />
                        <ShimmerPlaceholder style={styles.shimmerInputPlaceholder} />
                        <ShimmerPlaceholder style={styles.shimmerInputPlaceholder} />
                    </View>
                ) : (
                    <View style={styles.card}>
                        <View style={styles.text_input_container}>
                            <Text style={styles.input_title}>First Name</Text>
                            <TextInput 
                                style={styles.text_input} 
                                placeholder='William.J' 
                                placeholderTextColor='#b9b9b9' 
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                            />
                        </View>
                        <View style={styles.text_input_container}>
                            <Text style={styles.input_title}>Last Name</Text>
                            <TextInput 
                                style={styles.text_input} 
                                placeholder='Sartor' 
                                placeholderTextColor='#b9b9b9'
                                value={lastName}
                                onChangeText={(text) => setLastName(text)} 
                            />
                        </View>
                        <View style={styles.text_input_container}>
                            <Text style={styles.input_title}>Phone Number</Text>
                            <TextInput 
                                style={styles.text_input} 
                                maxLength={10} keyboardType="number-pad" 
                                placeholder='631-932-5700' 
                                placeholderTextColor='#b9b9b9'
                                value={phone}
                                onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))} 
                            />
                        </View>
                    </View>
                )}

                {loading ? (
                    <View>
                        <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                    </View>
                ) : (
                    <View style={styles.card}>
                        <TouchableOpacity style={styles.family_details_card} onPress={() => navigation.navigate('FamilyDetails', {familyId, siteId} )}>
                            <Text style={styles.family_details_text}>Family Details</Text>
                            <Icon name="angle-right" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                )}
                {loading ? (
                    <View>
                        <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                    </View>
                ) : (
                    <View style={styles.card}>
                        <Text style={styles.title_text}>Security</Text>
                        <TouchableOpacity style={styles.family_details_card} onPress={ () => setModalVisible(true)}>
                            <Text style={styles.change_password_text}>Change Password</Text>
                            <Icon name="angle-right" style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.title_text}>KIOSK ACCESS (PIN)</Text>
                        <View style={styles.kiosk_container}>
                            <TextInput 
                                style={styles.kiosk_input}
                                maxLength={4} keyboardType="number-pad" 
                                placeholder='* * * *' 
                                placeholderTextColor='#b9b9b9'
                                value={kioskPin}
                                secureTextEntry={kioskVisibilty}
                                onChangeText={(text) => setKioskPin(text.replace(/[^0-9]/g, ''))}
                                readOnly
                            />
                            <TouchableOpacity 
                                onPress={ () => setKioskVisibility(!kioskVisibilty) } 
                                style={styles.show_kiosk_pin_text}>
                                <Text style={styles.show_kiosk_pin_text}>{ !kioskVisibilty ? 'Hide PIN' : 'Show PIN'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.backdrop}>
                    <View style={styles.modal_view}>
                        <Text style={styles.modal_text}>Change Password</Text>
                        <ScrollView style={{ maxHeight: '80%' }}>
                            <View style={styles.form}>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        Old Password<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <View style={[styles.horizontal_container]}>
                                        <TextInput
                                            style={[styles.text_input, {backgroundColor:'#fff'}]}
                                            placeholder="e.g. * * * * *"
                                            placeholderTextColor="#b9b9b9"
                                            value={oldPassword}
                                            onChangeText={setOldPassword}
                                            secureTextEntry={oldPassVisibilty}
                                        />
                                        {
                                            oldPassVisibilty ?
                                            <TouchableOpacity onPress={() => setOldPassVisibility(false)}>
                                                <Icon name="eye-slash" size={20} style={[styles.icon, {color:'#797979'}]} />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => setOldPassVisibility(true)}>
                                                <Icon name="eye" size={20} style={[styles.icon, {color:'#797979'}]} />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        New Password<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <View style={[styles.horizontal_container]}>
                                        <TextInput
                                            style={[styles.text_input, {backgroundColor:'#fff'}]}
                                            placeholder="e.g. * * * * *"
                                            placeholderTextColor="#b9b9b9"
                                            value={newPassword}
                                            onChangeText={setNewPassword}
                                            secureTextEntry={newPassVisibilty}
                                        />
                                        {
                                            newPassVisibilty ?
                                            <TouchableOpacity onPress={() => setNewPassVisibility(false)}>
                                                <Icon name="eye-slash" size={20}  style={[styles.icon, {color:'#797979'}]} />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => setNewPassVisibility(true)}>
                                                <Icon name="eye" size={20}  style={[styles.icon, {color:'#797979'}]} />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        Confirm Password<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <View style={[styles.horizontal_container]}>
                                        <TextInput
                                            style={[styles.text_input, {backgroundColor:'#fff'}]}
                                            placeholder="e.g. * * * * *"
                                            placeholderTextColor="#b9b9b9"
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            secureTextEntry={confirmPassVisibilty}
                                        />
                                        {
                                            confirmPassVisibilty ?
                                            <TouchableOpacity onPress={() => setConfirmPassVisibility(false)}>
                                                <Icon name="eye-slash" size={20} style={[styles.icon, {color:'#797979'}]} />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => setConfirmPassVisibility(true)}>
                                                <Icon name="eye" size={20} style={[styles.icon, {color:'#797979'}]} />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                            </View>
                        </ScrollView>

                        {/* Modal Buttons */}
                        <View style={styles.modal_button_container}>
                            <TouchableOpacity style={[styles.button, styles.button_save_details]} onPress={handleSaveDetails}>
                                <Text style={styles.textStyle}>Save Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.button_close]}
                                onPress={handleModalClose}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
}

export default ProfileSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile_header: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2CABE2',
        borderStyle: 'solid',
        backgroundColor: '#2CABE2',
        padding: 20,
    },
    profile_image_container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile_header_image: {
        height: 156,
        width: 156,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: 80,
        marginBottom: 20,
    },
    edit_image_btn: {
        position: 'absolute',
        bottom: 20,
        right: 10,          
        height: 35,
        width: 35,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    profile_header_name: {
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        color: 'white',
        marginBottom: 5,
    },
    profile_header_email: {
        fontSize: 14,
        fontFamily: 'Poppins Regular',
        color: '#C6D0DE'
    },
    back_btn_icon: {
        fontSize: 24,
    },
    icon: {
        fontSize: 20,
        fontWeight:'bold',
        color: '#2CABE2',
    },
    profile_back_button: {
        marginBottom: 20,
    },
    profile_content_container:{
        paddingLeft:10,
        paddingRight:15,
        paddingTop:10,
        marginBottom:80
    },
    card:{
        borderRadius:10,
        backgroundColor:'#fff',
        padding:15,
        elevation:2,
        marginBottom:20
    },
    text_input_container:{
        marginBottom:20
    },
    form_group: {
        marginBottom: 16,
    },
    text_input:{
        flex:1,
        backgroundColor:'#F1F6F6',
        fontSize:17,
        fontFamily:'Poppins Regular',
        borderRadius:6,
        paddingLeft:12,
        color:'#797979'
    },
    input_title:{
        color:'black',
        fontSize:17,
        fontFamily:'Poppins Medium',
        marginBottom:8
    },
    input_label: {
        marginBottom: 8,
        color: '#797979',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    family_details_card:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    family_details_text:{
        color:'black',
        fontSize:17,
        fontFamily:'Poppins Medium',
    },
    title_text:{
        color:'#797979',
        fontSize:17,
        fontFamily:'Poppins Medium',
        marginBottom:16
    },
    change_password_text:{
        color:'black',
        fontSize:17,
        fontFamily:'Poppins Medium',
        paddingBottom:10
    },
    kiosk_container:{
        flexDirection:'row',
        alignItems:'center'
    }, 
    kiosk_input:{
        height:40,
        width:100,
        backgroundColor:'#F1F6F6',
        fontSize:17,
        fontFamily:'Poppins Regular',
        borderRadius:6,
        marginRight:20,
        color:'#797979',
        textAlign:'center',
        paddingBottom:5
    }, 
    show_kiosk_pin_text:{
        color:'#2CABE2',
        fontSize:17,
        fontFamily:'Poppins Medium',
    },
    asterics: {
        color: 'crimson',
    },
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal_view: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modal_text: {
        marginBottom: 30,
        color: '#000',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    modal_button_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
    button_save_details: {
        backgroundColor: '#FFB52E',
        marginRight: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    button_close: {
        backgroundColor: '#cdcdcd',
    },
    horizontal_container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    shimmerInputPlaceholder: {
        height: 50,
        marginBottom: 20,
        borderRadius: 6,
        width:'100%'
    },
    shimmerViewPlaceholder:{
        height: 200,
        marginBottom: 20,
        borderRadius: 6,
        width:'100%'
    }
});

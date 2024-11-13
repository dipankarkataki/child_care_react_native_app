import { ImageBackground, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView, Modal, Animated, Alert, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import ProfileDetailsApi from '../api/ProfileApi/ProfileDetailsApi';
import DocumentPicker from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import ModalComponent from '../components/ModalComponent';
import UploadImageApi from '../api/ProfileApi/UploadImageApi';
import TokenManager from '../api/TokenManager';
import ChangePasswordApi from '../api/ProfileApi/ChangePasswordApi';
import LogoutApi from '../api/LogoutApi';
import { setGlobalProfileImage } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const backgroundImage = require('../assets/images/background.png');
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


const ProfileSettings = ({ navigation }) => {

    const dispatch = useDispatch();

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
    const [newUploadAlert, setNewUploadAlert] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activityLoader, setActivityLoader] = useState(false);
    const [logoutActivityLoader, setLogoutActivityLoader] = useState(false);
    const [sendingFile, setSendingFile] = useState(false);
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalIcon, setModalIcon] = useState(null);
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword:'',
        passwordMatch: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!oldPassword) {
            newErrors.oldPassword = 'Old password is required';
            isValid = false;
        } else {
            newErrors.oldPassword = '';
        }

        if (!newPassword) {
            newErrors.newPassword = 'New password is required';
            isValid = false;
        } else {
            newErrors.newPassword = '';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
            isValid = false;
        } else {
            newErrors.confirmPassword = '';
        }

        if (newPassword != confirmPassword) {
            newErrors.passwordMatch = 'Password not matched';
            isValid = false;
        } else {
            newErrors.passwordMatch = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const avatarRef = React.createRef();

    const selectProfileImage = async () => {
        try{
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            await uploadProfileImage(result[0]);
        }catch(err){
            if (DocumentPicker.isCancel(err)) {
                console.log('User Cancelled Profile Image Picker');
            }else {
                throw err;
            }
        }
    };

    const validateImage = (image) => {
        let isValid = true;

        if(image){
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const maxSizeInKB = 1024; // 1 MB = 1024 KB
            const maxSizeInBytes = maxSizeInKB * 1024;

            if (!validTypes.includes(image.type)) {
                setModalMessage('Invalid file type. Only JPG, PNG, and JPEG are allowed.');
                setMessageModalVisible(true);
                setModalIcon('error');  
                isValid = false;
            }else if (image.size > maxSizeInBytes) {
                setModalMessage('File size exceeds 1 MB. Please select image within 1 MB.');
                setMessageModalVisible(true);
                setModalIcon('error');                  
                isValid = false;
            }
        }else{
            setModalMessage('No image selected.');
            setMessageModalVisible(true);
            setModalIcon('error');
            isValid = false;
        }

        return isValid;
    };

    const uploadProfileImage = async (image, retries = 3) => {
        if(validateImage(image)){
            setSendingFile(true)

            const formData = new FormData();
            formData.append('image', {
                uri: image.uri,
                name: image.name,
                type: image.type,
            });

            const upload = async (retryCount) => {
                try {
                    const result = await UploadImageApi(formData);
    
                    if (result?.data && result.data.status) {
                        setNewUploadAlert(true)
                        setSendingFile(false);
                        setMessageModalVisible(true);
                        setModalMessage('Image uploaded successfully');
                        setModalIcon('success');
                    }else if (retries > 0) {
                        console.log('Retrying upload...');
                        setTimeout(() => upload(retryCount - 1), 2000); // Retry after 2 seconds
                    } else {
                        setSendingFile(false);
                        setMessageModalVisible(true);
                        setModalMessage('Oops Something went wrong. Please try again later');
                        setModalIcon('error');
                    }
                } catch (err) {
                    console.log('Error --> ', err);
                    setSendingFile(false);
                    setMessageModalVisible(true);
                    setModalMessage('Oops! Something went wrong. Please try again later');
                    setModalIcon('error');
                }
            };
    
            upload(retries);
        }
    }

    const userProfileImage = useSelector((state) => state.profileImageReducer)

    useEffect( () => {
        if(avatarRef.current){
            const profileDetailsAnimated = Animated.stagger(400, [avatarRef.current.getAnimated()]);
            Animated.loop(profileDetailsAnimated).start();
        }

        const getProfileDetails = async () => {
            try{
                const result = await ProfileDetailsApi();
                if(result.data && result.data.status){
                    setFirstName(result.data.data.firstname);
                    setLastName(result.data.data.lastname);
                    setEmail(result.data.data.email);
                    setPhone(result.data.data.phone);
                    setFamilyId(result.data.data.family_id);
                    setSiteId(result.data.data.site_id);
                    dispatch(setGlobalProfileImage(result.data.data.profile_image));
                    setLoading(false);
                }
            }catch(err){
                console.log('Error! Failed to get profile details : ', err);
            }
        }

        getProfileDetails();

    },[avatarRef.current, newUploadAlert])

    const handleMessageModalOnClose = () => {
        setMessageModalVisible(false);
    }

    const handleModalClose = () => {
        setModalVisible(false);
        setOldPassVisibility(true)
        setNewPassVisibility(true)
        setConfirmPassVisibility(true)
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors('')
    };

    const changePassword = () => {
       if(validateForm()){
            setActivityLoader(true);
            try{
                let data = {
                    'old_password' : oldPassword,
                    'password' : newPassword,
                    'confirm_password' : confirmPassword
                };

                const update = async () => {
                    const result = await ChangePasswordApi(data);
                    if(result.data && result.data.status){
                        setActivityLoader(false);
                        setModalVisible(false);
                        setMessageModalVisible(true);
                        setModalMessage(result.data.message);
                        setModalIcon('success');
                    }else{
                        setActivityLoader(false);
                        setMessageModalVisible(true);
                        setModalMessage(result.data.message);
                        setModalIcon('error');
                    }
                };

                update();
            }catch(err){
                console.log('Update failed! Something went wrong : ', err)
            }
       }
    };

    const revokeTokenAndNavigate = async () =>{
        await TokenManager.removeToken();
        await TokenManager.removeUserId();
        await TokenManager.removeCustomerProfileId();
        await TokenManager.removeUserProfileImage();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    const handleLogout = () => {
        const logout = async () => {
            try{
                setLogoutActivityLoader(true)
                const result = await LogoutApi();
                if(result.status == 200){
                    Alert.alert('Success', result.data.message, [
                        {
                            text : 'Close',
                            onPress:revokeTokenAndNavigate
                        }
                    ])
                }else{
                    Alert.alert('Error', result.data.message);
                }
            }catch(err){
                console.log('Logout Error : ', err)
                Alert.alert('Error', 'Something went wrong while loging out');
            }finally {
                // Ensure loading indicator is disabled regardless of success or error
                setLogoutActivityLoader(false);
            }
            
        }

        logout();
    }

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
                        <Image source={userProfileImage} style={styles.profile_header_image} />
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

                    <>
                        <View> 
                            { sendingFile && ( 
                                <Text style={[styles.input_title, {color:'crimson'}]}>Uploading profile pic please wait...</Text> 
                            ) } 
                        </View>
                        
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
                    
                    </>
                    
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
                    <>
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
                        <View style={styles.card}>
                            <TouchableOpacity  onPress={handleLogout}  style={styles.logout_btn} disabled={logoutActivityLoader}>
                                <View style={styles.logout_btn_inner}>
                                    <SimpleIcon name="logout" style={styles.logout_icon}/>
                                    <Text style={styles.logout_btn_text}>{logoutActivityLoader ? 'Loging out...' : 'Log Out'}</Text>
                                    {
                                        logoutActivityLoader && ( <ActivityIndicator size="large" color='#2E78FF' animating={logoutActivityLoader}/> )
                                    }
                                </View>
                            </TouchableOpacity>
                        </View >
                        
                    </>
                    
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
                                    {errors.oldPassword ? <Text style={styles.error_text}>{errors.oldPassword}</Text> : null}
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
                                    {errors.newPassword ? <Text style={styles.error_text}>{errors.newPassword}</Text> : null}
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
                                    {errors.confirmPassword ? <Text style={styles.error_text}>{errors.confirmPassword}</Text> : null}
                                    {errors.passwordMatch ? <Text style={styles.error_text}>{errors.passwordMatch}</Text> : null}
                                </View>
                            </View>
                        </ScrollView>

                        {/* Modal Buttons */}
                        <View style={styles.modal_button_container}>
                            
                            <TouchableOpacity style={[styles.button, styles.button_save_details]} onPress={changePassword} disabled={activityLoader}>
                                <Text style={styles.medium_text}>{activityLoader ? 'Updating password ...' : 'Save Details'}</Text>
                                {
                                    activityLoader && ( <ActivityIndicator size="large" color='#2E78FF' animating={activityLoader}/> )
                                }
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={[styles.button, styles.button_close]} onPress={handleModalClose}>
                                <Text style={styles.medium_text}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <ModalComponent 
                modalVisible={messageModalVisible}
                setModalVisible={setMessageModalVisible}
                message={modalMessage}
                onClose={handleMessageModalOnClose}
                icon={modalIcon}
            
            />
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
        borderColor: '#dcdcdc',
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
        fontSize: 30,
        fontWeight:'bold',
        color:'#fff'
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
    medium_text:{
        color:'black',
        fontSize:14,
        fontFamily:'Poppins Medium',
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
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
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
    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5
    },
    logout_btn:{
        backgroundColor:'#FFB52E',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        width:'60%',
        borderWidth:1,
        borderRadius:5,
        borderStyle:'solid',
        borderColor:'#FFB52E',
        elevation:1
    },
    logout_btn_inner:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    logout_btn_text:{
        fontSize:18,
        color:'black',
        marginRight:10
    },
    logout_icon:{
        fontSize:18,
        color:'black',
        fontWeight:'bold',
        marginRight:10
    }
});

import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera  } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';


const profileImage = require('../../assets/images/pro-image.jpg')
const background = require('../../assets/images/background.png');
const placeholder_img = require('../../assets/images/placeholder-img.png');

const SendMessageArea = ({navigation}) => {

    const [message, setMessage] = useState('');
    const [bottomSheet, setBottomSheet] = useState(false)

    const toggleBottomSheet = () =>{
        setBottomSheet(!bottomSheet);
    }

    const openGallery = () => {
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
                setBottomSheet(!bottomSheet);
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                Alert.alert('Error', response.errorMessage || 'Something went wrong while selecting the image.');
            } else if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                // setProfileImage({ uri: selectedImage.uri }); // Update the profile image state
                // TODO: Upload the selected image to your server if needed
                console.log('Selected Image -->', selectedImage.uri)
            }
        });
    };

    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            cameraType: 'back',
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.7,
            includeBase64: false,
            saveToPhotos: true, // Save the captured image to the device's gallery
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
                setBottomSheet(!bottomSheet);
            } else if (response.errorCode) {
                console.log('Camera Error: ', response.errorMessage);
                Alert.alert('Error', response.errorMessage || 'Something went wrong while accessing the camera.');
            } else if (response.assets && response.assets.length > 0) {
                const capturedImage = response.assets[0];
                // Handle the captured image (e.g., upload to server)
                console.log('Captured Image -->', capturedImage.uri);
            }
        });
    };

    const openDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.xls, DocumentPicker.types.xlsx],
            });

            const data = res[0];
            console.log('Selected Document:', data);
            // You can handle the selected document here, e.g., upload to server or display in UI
            // Example: setSelectedDocument(res);
            Alert.alert('Document Selected', `Name: ${data.name}\nType: ${data.type}\nSize: ${data.size} bytes`);
            setBottomSheet(!bottomSheet); // Close the bottom sheet after selection
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picker');
                setBottomSheet(!bottomSheet);
            } else {
                console.log('Unknown Error: ', err);
                Alert.alert('Error', 'An error occurred while selecting the document.');
            }
        }
    };
    

    return (
        <ImageBackground source={background} style={styles.container}>
            <TouchableOpacity style={styles.chat_header} onPress={ () => navigation.navigate('SenderProfile')}>
                <TouchableOpacity onPress={ () => navigation.navigate('MessagingDashboard')}>
                    <Icon name="arrow-left" style={styles.back_button} />
                </TouchableOpacity>
                <View style={styles.chat_user_area}>
                    <Image source={profileImage} style={styles.chat_profile_image}/>
                    <View style={styles.chat_title_area}>
                        <Text style={styles.chat_user_title_text}>The Shining Star Day Care School</Text>
                        <Text style={[styles.chat_user_status]}>Active Now</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.chat_body}>
                <ScrollView>
                    <View style={styles.chat_time_badge_container}>
                        <Text style={styles.chat_time_badge_text}>Today</Text>
                    </View>
                    <View style={styles.message_area}>
                        <View style={styles.inner_chat_user_area}>
                            <Image source={profileImage} style={styles.inner_chat_profile_image}/>
                            <View style={styles.chat_title_area}>
                                <Text style={styles.inner_chat_user_title_text}>The Shining Star Day Care School</Text>
                            </View>
                        </View>
                        <View style={styles.sender_container}>
                            <View style={styles.sender_message_area}>
                                <View style={styles.sender_tail} />
                                <Text style={styles.sender_text}>Hello Mr William.</Text>
                                <Text style={styles.sender_message_time}> <Icon name="clock" /> 09:30 AM</Text>
                            </View>
                            <View style={styles.sender_message_area}>
                                <View style={styles.sender_tail} />
                                <Text style={styles.sender_text}>
                                    Make sure you're saving and retrieving the token properly at appropriate times in the app lifecycle, 
                                    like in your useEffect in the main app component or your authentication logic. This ensures that even 
                                    in development mode, the app behaves consistently.
                                </Text>
                                <Text style={styles.sender_message_time}> <Icon name="clock" /> 10:30 AM</Text>
                            </View>
                            <View style={styles.sender_message_area}>
                                <View style={styles.sender_tail} />
                                <Text style={styles.sender_text}>
                                Hope this will help!
                                </Text>
                                <Text style={styles.sender_message_time}> <Icon name="clock" /> 11:20 AM</Text>
                            </View>
                        </View>
                        <View style={styles.receiver_container}>
                            <View style={styles.receiver_message_area}>
                                <View style={styles.receiver_tail} />
                                <Text style={styles.receiver_text}>
                                    Make sure you're saving and retrieving the token properly at appropriate times in the app lifecycle, 
                                    like in your useEffect in the main app component or your authentication logic. This ensures that even 
                                    in development mode, the app behaves consistently.
                                </Text>
                                <Text style={styles.receiver_message_time}> <Icon name="clock" /> 10:30 AM</Text>
                            </View>
                            <View style={styles.receiver_message_area}>
                                <View style={styles.receiver_tail} />
                                <Image source={placeholder_img} style={styles.chat_media_items}/>
                                <Text style={styles.receiver_message_time}> <Icon name="clock" /> 11:20 AM</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                
            </View>
            <View style={styles.send_message_btn_container}>
                <TouchableOpacity onPress={toggleBottomSheet}>
                    <Icon name="paperclip" style={styles.attachment_icon}/>
                </TouchableOpacity>
                <View style={styles.input_container}>
                    <TextInput 
                        style={styles.text_input}
                        placeholder="Write your message"
                        placeholderTextColor="#b9b9b9"
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                    />
                </View>
                <TouchableOpacity style={styles.send_message_btn}>
                    <IonicIcon name="send" style={styles.send_message_icon}/>
                </TouchableOpacity>
            </View>
            
            {bottomSheet && (
                <View style={styles.bottom_sheet_container}>
                    <View style={styles.bottom_sheet_items}>
                        <View style={{marginRight:20}}>
                            <TouchableOpacity style={styles.item_outline} onPress={openCamera}>
                                <Icon name="camera" style={styles.item_icon} />
                            </TouchableOpacity>
                            <Text style={styles.title_text}>Camera</Text>
                        </View>
                        <View style={{marginRight:20}}>
                            <TouchableOpacity style={styles.item_outline} onPress={openGallery}>
                                <Icon name="images" style={styles.item_icon} />
                            </TouchableOpacity>
                            <Text style={styles.title_text}>Gallery</Text>
                        </View>
                        <View style={{marginRight:20}}>
                            <TouchableOpacity style={styles.item_outline} onPress={openDocument}>
                                <Icon name="file-alt" style={styles.item_icon} />
                            </TouchableOpacity>
                            <Text style={styles.title_text}>Document</Text>
                        </View>
                    </View>
                </View>
            )}
           
        </ImageBackground>
    )
}

export default SendMessageArea

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    chat_header:{
        backgroundColor: '#E8F2F4',
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#E8F2F4',
    },
    back_button:{
        fontSize:20,
        color:'#000E08',
        marginLeft:5
    },
    chat_user_area:{
        flexDirection:'row',
        marginLeft:10,
        alignItems:'center'
    },
    inner_chat_user_area:{
        flexDirection:'row',
        alignItems:'center'
    },
    inner_chat_profile_image:{
        height:40,
        width:40,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#fff',
        borderRadius:70,
        padding:5,
        elevation:3,
        marginLeft:10
    },
    chat_profile_image:{
        height:60,
        width:60,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#fff',
        borderRadius:70,
        padding:5,
        elevation:3,
        marginLeft:10
    },
    chat_title_area:{
        marginLeft:10
    },
    inner_chat_user_title_text:{
        fontSize:14,
        color:'#000000',
        fontFamily:'Poppins Medium',
        fontWeight:'bold'
    },
    chat_user_title_text:{
        fontSize:17,
        color:'#000000',
        fontFamily:'Poppins Medium'
    },
    chat_user_status:{
        color:'green',
        fontSize:12,
        fontFamily:'Poppins Medium',
        fontWeight:'bold'
    },
    chat_body:{
        flex:3,
        marginBottom:5
    },
    chat_time_badge_container:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20,
        marginBottom:20
    },
    chat_time_badge_text:{
        backgroundColor:'#F2F7FB',
        fontSize:17,
        fontFamily:'Poppins Medium',
        color:'#000000',
        fontWeight:'bold',
        paddingHorizontal:20,
        paddingVertical:5,
        borderWidth:1,
        borderColor:'#F2F7FB',
        textAlign:'center',
        borderRadius:20,
    },
    message_area:{
        padding:20
    },
    sender_message_area:{
        backgroundColor:'#F2F7FB',
        padding:10,
        borderWidth:1,
        borderColor:'#e5e4e2',
        borderRadius:10,
        marginLeft:50,
        marginBottom:10,
        width:'80%'
    },
    sender_text:{
        color:'#000E08',
        fontSize:14,
        fontFamily:'Poppins Medium',
        textAlign:'justify'
    },
    sender_message_time:{
        color:'#797C7B',
        fontSize:12,
        fontFamily:'Poppins Medium',
        fontWeight:'bold',
        textAlign:'right'
    },
    receiver_message_area:{
        backgroundColor:'#414a4c',
        padding:10,
        borderWidth:1,
        borderColor:'#36454F',
        borderRadius:10,
        marginLeft:50,
        marginBottom:10,
        width:'80%'
    },
    receiver_text:{
        color:'#fff',
        fontSize:14,
        fontFamily:'Poppins Medium',
        textAlign:'justify'
    },
    receiver_message_time:{
        color:'#fff',
        fontSize:12,
        fontFamily:'Poppins Medium',
        fontWeight:'bold',
        textAlign:'right'
    },
    send_message_btn_container:{
        flex:1/3,
        backgroundColor:'#E8F2F4',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        overflow:'hidden',
        paddingHorizontal:20,
        paddingVertical:10
    },
    input_container: {
        borderWidth: 1,
        borderColor: 'rgba(84, 84, 84, 0.44)',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        width:'70%'
    },
    text_input: {
        fontSize: 17,
        color: '#535353',
        padding: 12,
        fontFamily:'Poppins Regular',
    },
    attachment_icon:{
        fontSize: 25,
        color: '#535353',
    },
    send_message_btn:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#20A090',
        height:55,
        width:55,
        borderRadius:80,
    },
    send_message_icon:{
        fontSize:25,
        fontWeight:'bold',
        color:'#fff'
    },
    receiver_container:{
        marginTop:20
    },
    sender_tail: {
        position: 'absolute',
        left: -10,
        top: 10,
        width: 0,
        height: 0,
        borderTopWidth: 10,
        borderTopColor: '#F2F7FB', // same color as receiver bubble
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        borderBottomWidth: 10,
        borderBottomColor: 'transparent',
    },
    receiver_tail: {
        position: 'absolute',
        right: -10,
        top: 10,
        width: 0,
        height: 0,
        borderTopWidth: 10,
        borderTopColor: '#36454F', // same color as sender bubble
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderBottomWidth: 10,
        borderBottomColor: 'transparent',
    },
    chat_media_items:{
        height:80,
        width:80,
        borderRadius:10,
        marginRight:10,
        marginBottom:10
    },
    title_text:{
        color:"#080808",
        fontSize:12,
        fontFamily:'Poppins Medium',
        textAlign:'center'
    },
    showBottomSheet:{
        display:'flex'
    },
    hideBottomSheet:{
        display:'none'
    },
    bottom_sheet_container:{
        height:250,
        backgroundColor:"#fff",
        padding:20
    },
    bottom_sheet_items:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    item_outline:{
        backgroundColor:'#f8f8ff',
        justifyContent:'center',
        alignItems:'center',
        height:70,
        width:70,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#004040',
        borderRadius:10,
        padding:10,
        marginBottom:8,
        elevation:2
    },
    item_icon:{
        fontSize:28,
        color:'#000'
    },

})
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView, Alert, FlatList } from 'react-native'
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera  } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import GetMessagesApi from '../../api/MessagingApi/GetMessagesApi';
import SendMessageApi from '../../api/MessagingApi/SendMessageApi';
import TokenManager from '../../api/TokenManager';
import initializePusher from '../../../pusherConfig';
import UrlProvider from '../../api/UrlProvider';

const profileImage =  undefined;
const background = require('../../assets/images/background.png');

const SendMessageArea = ({navigation, route }) => {

    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [bottomSheet, setBottomSheet] = useState(false);
    const scrollViewRef = useRef(null); 
    const [pusher, setPusher] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [sendingFile, setSendingFile] = useState(false);
    let channel;

    const { userId, userName, initials, type} = route.params;

    const toggleBottomSheet = () =>{
        setBottomSheet(!bottomSheet);
    }

    const openGallery = async () => {

        try{
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });

            const fileStats = await RNFS.stat(result[0].uri);
            const maxSize = 5 * 1024 * 1024; // 5 MB

            if (fileStats.size > maxSize) {
                Alert.alert('File Size Limit Exceeded', 'Please select a file up to 5 MB.');
                return;
            }

            setSelectedFile(result[0]);
            console.log('Selected File:', result[0]);
            setBottomSheet(false);
        }catch(err){
            if (DocumentPicker.isCancel(err)) {
                console.log('User Cancelled Doc Picker');
            }else {
                throw err;
            }
        }
    };

    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            cameraType: 'back',
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.7,
            includeBase64: false,
            saveToPhotos: true,
        };
    
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
                setBottomSheet(false);
            } else if (response.errorCode) {
                console.log('Camera Error: ', response.errorMessage);
                Alert.alert('Error', response.errorMessage || 'Something went wrong while accessing the camera.');
            } else if (response.assets && response.assets.length > 0) {
                const capturedImage = response.assets[0];
                console.log('Captured Image -->', capturedImage.uri);
                setBottomSheet(false);
            }
        });
    };

    const openDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.xls, DocumentPicker.types.xlsx],
            });
    
            const data = res[0];
            setSelectedFile(data);
            console.log('Selected Document:', data);
            Alert.alert('Document Selected', `Name: ${data.name}\nType: ${data.type}\nSize: ${data.size} bytes`);
            setBottomSheet(false); // Close the bottom sheet after selection
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picker');
                setBottomSheet(false);
            } else {
                console.log('Unknown Error: ', err);
                Alert.alert('Error', 'An error occurred while selecting the document.');
                setBottomSheet(false);
            }
        }
    };
    
    const  getCurrentTime = () => {
        const now = new Date();
    
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert 24-hour time to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // if hour is 0, set it to 12
        hours = hours < 10 ? '0' + hours : hours; // add leading zero to hours if needed
        minutes = minutes < 10 ? '0' + minutes : minutes; // add leading zero to minutes
        
        return hours + ':' + minutes + ' ' + ampm;
    }

    const sendMessage = () => {
        if (inputMessage.trim() || selectedFile != null) {
            const newMessage = {
                text: inputMessage.trim(),
                time: getCurrentTime(),
                type:'sent',
                attachment: selectedFile ? selectedFile.uri : null,
                attachment_type: selectedFile ? selectedFile.type.split('/')[1] : null,
                receiverId: userId,
            };

            console.log('Message is ******', newMessage.text )

            const formData = new FormData();
            formData.append('message', newMessage.text);
            formData.append('receiver_id', newMessage.receiverId);

            if(selectedFile){
                formData.append('attachment', {
                    uri: selectedFile.uri,
                    name: selectedFile.name,
                    type: selectedFile.type,
                });
            }
            
            setSendingFile(true);
            try {
                // Send FormData to your API
                SendMessageApi(formData)
                .then((result) => {
                    console.log('Send Message ==> ', result.data)
                    setSelectedFile('');
                    setSendingFile(false);
                })
                .catch((err) => {
                    console.log('Error', err);
                    setSendingFile(false);
                });
    
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setInputMessage(''); // Clear the input field after sending the message
        
                // Scroll to the bottom after sending the message
                setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);

            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }


    const fetchMessages = async () => {
        try {
            const result = await GetMessagesApi();
            // console.log('Fetch Message Data ==> ', result.data.data);
            let data = result.data.data;

            const newMessages = data.map(item => ({
                text: item.text,
                time: item.time,
                type: item.type,
                attachment: item.attachment,
                attachment_type: item.attachment ? item.attachment.split('.').pop().toLowerCase() : null,
            }));

            setMessages(newMessages);
            // console.log('Messages ----> ', newMessages);

            // Scroll to the bottom after updating messages
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        } catch (err) {
            console.log('Error', err);
        }
    };

    const subscribeToChannel = (userId, pusherInstance) => {
        const channelName = `chat-channel-${userId}`;
        console.log(`Subscribing to channel ---- : ${channelName}`);

        channel = pusherInstance.subscribe(channelName);

        channel.bind('pusher:subscription_succeeded', () => {
            console.log(`Successfully subscribed to channel: ${channelName}`);
        });

        channel.bind('pusher:subscription_error', (status) => {
            console.error(`Subscription to ${channelName} failed with status:`, status);
        });

        channel.bind('message-sent', (data) => {
            console.log('New message received:', data);
            console.log('Receiver ID:', data.receiver_id);
            const newMessage = {
                text: data.content,
                time: data.created_at,
                attachment: data.attachment,
                attachment_type:data.attachment_type,
                type: userId == data.receiver_id ? 'received' : 'sent',
                receiverId: userId,
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);

            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
            // await fetchMessages();
        });

        pusherInstance.connection.bind('state_change', (states) => {
            console.log('Pusher state changed from', states.previous, 'to', states.current);
        });

        pusherInstance.connection.bind('error', (error) => {
            console.error('Pusher connection error:', error);
        });
    };

    const setupPusherAndSubscribe = async () => {
        try {
            const token = await TokenManager.getToken();
            if (!token) {
                console.error('User is not authenticated.');
                return;
            }

            const userId = await TokenManager.getUserId();
            console.log('User ID --- :', userId);
            setCurrentUserId(userId);

            const pusherInstance = await initializePusher();

            if (pusherInstance) {
                setPusher(pusherInstance);
                subscribeToChannel(userId, pusherInstance);
            }
        } catch (error) {
            console.error('Error during setup:', error);
        }
    };

    useEffect(() => {
        setupPusherAndSubscribe();
        fetchMessages();

        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
        
        // Cleanup on unmount
        return () => {
            if (channel) {
                channel.unbind_all(); // Unbind all events
                channel.unsubscribe();
                console.log(`Unsubscribed from channel chat-channel-${currentUserId}`);
            }
        };
    }, []);

    // const getMimeType = (filePath) => {
    //     const extension = filePath.split('.').pop();
    //     switch (extension) {
    //         case 'pdf': return 'application/pdf';
    //         case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    //         // Add more file types as needed
    //         default: return '';
    //     }
    // };
    

    // const handleDocumentPress = async (uri) => {
    //     const mimeType = getMimeType(uri);
    //     try {
    //         let localPath = uri;
    //         if (uri.startsWith('http')) {
    //             const downloadDest = `${RNFS.DocumentDirectoryPath}/${uri.split('/').pop()}`;
    //             const { promise } = RNFS.downloadFile({ fromUrl: uri, toFile: downloadDest });
    //             await promise;
    //             localPath = downloadDest;
    //         }
    
    //         await FileViewer.open(localPath, { showOpenWithDialog: true, mimeType }); // Optionally specify the MIME type
    //     } catch (error) {
    //         console.log('Error opening file:', error);
    //         Alert.alert('Error', 'Could not open the file.');
    //     }
    // };


    if (!pusher || !currentUserId) {
        console.log('Current User id -->', currentUserId);
        return (
          <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
            <Text style={styles.chat_user_title_text} >Unable to initialize Pusher.</Text>
          </View>
        );
    }


    return (
        <ImageBackground source={background} style={styles.container}>
            <TouchableOpacity style={styles.chat_header} onPress={ () => navigation.navigate('SenderProfile', {userId: userId, userName: userName})}>
                <TouchableOpacity onPress={ () => navigation.navigate('MessagingDashboard')}>
                    <Icon name="arrow-left" style={styles.back_button} />
                </TouchableOpacity>
                <View style={styles.chat_user_area}>
                    {
                        profileImage ? (
                            <Image source={profileImage}  style={styles.chat_profile_image}/>
                        ) : (
                            <View style={styles.contact_initials_container}>
                                <Text style={styles.contact_initials_text}>{initials}</Text>
                            </View>
                        )
                    }
                    <View style={styles.chat_title_area}>
                        <Text style={styles.chat_user_title_text}>{userName}</Text>
                        <Text style={styles.sub_title}>Account : {type}</Text>
                        <Text style={[styles.chat_user_status]}>Active Now</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.chat_body}>
                <FlatList
                    ref={scrollViewRef}
                    data={messages}
                    initialNumToRender={10}
                    maxToRenderPerBatch={5}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <>
                            {item.type === 'sent' && (
                            // If item.type is 'sent', show the sender's message layout
                                <View style={styles.sender_container}>
                                    <View style={styles.sender_message_area}>
                                        <View style={styles.sender_tail} />
                                        
                                        {item.text ? (
                                            <Text style={styles.sender_text}>
                                                {item.text}
                                            </Text>
                                        ) : null}
                                        
                                        {item.attachment && (
                                            item.attachment?.startsWith('content') ? (
                                                <Image
                                                    source={{ uri: item.attachment }}
                                                    style={{ width: 200, height: 200, borderRadius: 8 }}
                                                    resizeMode="cover"
                                                />
                                            ) : (
                                                <Image
                                                    source={{ uri: `${UrlProvider.asset_url_local}/${item.attachment}` }}
                                                    style={{ width: 200, height: 200, borderRadius: 8 }}
                                                    resizeMode="cover"
                                                />
                                            )
                                        )}
                                        
                                        
                                        <Text style={styles.sender_message_time}>
                                            <Icon name="clock" /> {item.time}
                                        </Text>
                                    </View>
                                </View>
                            )}


                            {item.type === 'received' && (
                                // If item.type is 'receive', show receiver's message layout
                                <View style={styles.receiver_container}>
                                    <View style={styles.receiver_message_area}>
                                        <View style={styles.receiver_tail} />
                                        {item.text ? (
                                            <Text style={styles.receiver_text}>
                                                {item.text}
                                            </Text>
                                        ) : null}

                                        {item.attachment && (item.attachment_type === 'png' || item.attachment_type === 'jpg' || item.attachment_type === 'jpeg') ? (
                                            <Image
                                                source={{ uri: `${UrlProvider.asset_url_local}/${item.attachment}` }}
                                                style={{ width: 200, height: 200, borderRadius: 8 }}
                                                resizeMode="contain"
                                            />
                                        ) : item.attachment ? (
                                            <TouchableOpacity
                                                onPress={() => handleDocumentOpen(`${UrlProvider.asset_url_local}/${item.attachment}`)}
                                                style={{ padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 5 }}
                                            >
                                                <Text style={{ color: '#007AFF', textDecorationLine: 'underline' }}>Open Document</Text>
                                            </TouchableOpacity>
                                        ) : null}
                                        
                                        <Text style={styles.receiver_message_time}> 
                                            <Icon name="clock" /> {item.time}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </>
                    )}

                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                    onLayout={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                />
                
                {/* Attachment Preview */}
                
                {selectedFile && (
                    <View style={styles.sender_container}>
                        <View style={styles.sender_message_area}>
                            <View style={styles.sender_tail} />
                            
                            <View style={styles.attachmentPreview}>
                                {selectedFile.type?.startsWith('image/') && (
                                    <Image
                                        source={{ uri: selectedFile.uri }}
                                        style={{ width: 200, height: 200, borderRadius: 8 }}
                                        resizeMode="cover"
                                    />
                                )}

                                {selectedFile.type?.startsWith('application/') && (
                                    <Text>Selected Attachment: {selectedFile.name}</Text>
                                )}

                                <TouchableOpacity onPress={() => !sendingFile && setSelectedFile(null)}>
                                    <Text style={styles.removeAttachmentText}>
                                        {!sendingFile   ? 'Remove Item' : 'Sending Wait ....'}
                                    </Text>
                                </TouchableOpacity>
                                
                                
                            </View>
                        </View>
                    </View>
                )}
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
                        value={inputMessage}
                        onChangeText={(text) => setInputMessage(text)}
                    />
                </View>
                <TouchableOpacity style={styles.send_message_btn} onPress={sendMessage}>
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
    container: {
        flex: 1
    },
    chat_header: {
        backgroundColor: '#E8F2F4',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#E8F2F4',
    },
    back_button: {
        fontSize: 20,
        color: '#000E08',
        marginLeft: 5
    },
    chat_user_area: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center'
    },
    inner_chat_user_area: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inner_chat_profile_image: {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: 70,
        padding: 5,
        elevation: 3,
        marginLeft: 10
    },
    chat_profile_image: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: 70,
        padding: 5,
        elevation: 3,
        marginLeft: 10
    },
    chat_title_area: {
        marginLeft: 10
    },
    inner_chat_user_title_text: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold'
    },
    chat_user_title_text: {
        fontSize: 17,
        color: '#000000',
        fontFamily: 'Poppins Medium'
    },
    chat_user_status: {
        color: 'green',
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold'
    },
    chat_body: {
        flex: 3,
        marginBottom: 5
    },
    chat_time_badge_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    chat_time_badge_text: {
        backgroundColor: '#F2F7FB',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        color: '#000000',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#F2F7FB',
        textAlign: 'center',
        borderRadius: 20,
    },
    message_area: {
        padding: 20
    },
    receiver_message_area: {
        backgroundColor: '#F2F7FB',
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e4e2',
        borderRadius: 10,
        marginLeft: 20,
        marginBottom: 10,
        width: '60%'
    },
    receiver_text: {
        color: '#000E08',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
        textAlign: 'justify'
    },
    receiver_message_time: {
        color: '#797C7B',
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop:10
    },
    sender_message_area: {
        backgroundColor: '#414a4c',
        padding: 10,
        borderWidth: 1,
        borderColor: '#36454F',
        borderRadius: 10,
        marginLeft: 50,
        marginBottom: 10,
        width: '60%',

    },
    sender_text: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
        textAlign: 'justify'
    },
    sender_message_time: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop:10
    },
    send_message_btn_container: {
        flex: 1 / 3,
        backgroundColor: '#E8F2F4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    input_container: {
        borderWidth: 1,
        borderColor: 'rgba(84, 84, 84, 0.44)',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        width: '70%'
    },
    text_input: {
        fontSize: 17,
        color: '#535353',
        padding: 12,
        fontFamily: 'Poppins Regular',
    },
    attachment_icon: {
        fontSize: 25,
        color: '#535353',
    },
    send_message_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20A090',
        height: 55,
        width: 55,
        borderRadius: 80,
    },
    send_message_icon: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },
    sender_container: {
        marginTop: 20,
        alignItems:'flex-end',
        marginRight:20
    },
    receiver_container:{
        marginTop: 20,
        alignItems:'flex-start',
    },
    receiver_tail: {
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
    sender_tail: {
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
    chat_media_items: {
        height: 80,
        width: 80,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10
    },
    title_text: {
        color: "#080808",
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        textAlign: 'center'
    },
    showBottomSheet: {
        display: 'flex'
    },
    hideBottomSheet: {
        display: 'none'
    },
    bottom_sheet_container: {
        height: 250,
        backgroundColor: "#fff",
        padding: 20
    },
    bottom_sheet_items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    item_outline: {
        backgroundColor: '#f8f8ff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#004040',
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        elevation: 2
    },
    item_icon: {
        fontSize: 28,
        color: '#000'
    },
    attachments_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: '#F9F9F9',
    },
    attachment_item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5,
        elevation: 2,
    },
    attachment_image: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight: 5,
    },
    attachment_document: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    attachment_text: {
        fontSize: 12,
        color: '#000',
        marginLeft: 5,
        maxWidth: 100,
    },
    message_attachment: {
        marginTop: 5,
    },
    message_image: {
        height: 150,
        width: 150,
        borderRadius: 10,
        marginTop: 5,
    },
    message_document: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    message_document_text: {
        marginLeft: 5,
        color: '#000',
    },
    contact_info_container:{
        marginLeft:10
    },
    contact_initials_container:{
        height:60,
        width:60,
        borderRadius:60,
        borderWidth:1,
        borderStyle:'dashed',
        borderColor:'#fff',
        elevation:1,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#6a5acd'
    },contact_initials_text:{
        fontSize:18,
        fontFamily:'Poppins Medium',
        color:'#fff'
    },
    main_title:{
        fontSize:17,
        fontFamily:'Poppins Medium',
        color:'#101618'
    },
    sub_title:{
        fontSize:12,
        fontFamily:'Poppins Medium',
        color:'#101618'
    },
    attachmentPreview: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    removeAttachmentText: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop:10,
        backgroundColor:'crimson',
        padding:8,
        borderRadius:10
    },
});

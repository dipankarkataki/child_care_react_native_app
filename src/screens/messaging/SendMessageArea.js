import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView, Alert, FlatList, PermissionsAndroid, Linking, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
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
import RNFetchBlob from 'rn-fetch-blob';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';

const profileImage =  undefined;
const background = require('../../assets/images/background.png');
const isImage = ['jpeg', 'png', 'jpg'];

const SendMessageArea = ({navigation, route }) => {

    const [userScrolling, setUserScrolling] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [bottomSheet, setBottomSheet] = useState(false);
    const scrollViewRef = useRef(null); 
    const [pusher, setPusher] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [sendingFile, setSendingFile] = useState(false);
    const [inputHeight, setInputHeight] = useState(40);
    const MAX_HEIGHT = 60;
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

            const maxSizeInMB = 5; // 1 MB = 1024 KB
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

            if (result[0].size > maxSizeInBytes) {
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
            setBottomSheet(false);
        }
    };

    const openDocument = async () => {
        try{
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.xls, DocumentPicker.types.xlsx],
            });

            const maxSizeInMB = 5; // 1 MB = 1024 KB
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

            if (result[0].size > maxSizeInBytes) {
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
            setBottomSheet(false);
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
        console.log('My message ---', inputMessage.trim())
        if((inputMessage.trim().length == 0 && selectedFile == null)){
            Alert.alert('Please type a message or select an attachment.');
            return;
        }else{
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
                // try {
                //     // Send FormData to your API
                //     SendMessageApi(formData)
                //     .then((result) => {
                //         console.log('Send Message ==> ', result.data)
                //         setSelectedFile('');
                //         setSendingFile(false);
                //     })
                //     .catch((err) => {
                //         console.log('Error', err);
                //         setSendingFile(false);
                //     });
        
                //     setMessages(prevMessages => [...prevMessages, newMessage]);
                //     setInputMessage(''); // Clear the input field after sending the message
            
                //     // Scroll to the bottom after sending the message
                //     setTimeout(() => {
                //         scrollViewRef.current?.scrollToEnd({ animated: true });
                //     }, 100);
    
                // } catch (error) {
                //     console.error('Error sending message:', error);
                // }

                const send = async (retries = 3) => {
                    try {
                        const result = await SendMessageApi(formData);
    
                        console.log('Send Message ==> ', result.data);
                        if(result.data){
                            setSelectedFile('');
                            setSendingFile(false);
                            setMessages(prevMessages => [...prevMessages, newMessage]);
                            setInputMessage(''); // Clear the input field after sending the message
        
                            // Scroll to the bottom after sending the message
                            setTimeout(() => {
                                scrollViewRef.current?.scrollToEnd({ animated: true });
                            }, 100);
                        }else{
                            Alert.alert('Error', 'Oops! Network error failed to send message. Please try again.', [
                                {
                                    text: 'Retry',
                                    onPress: () => {
                                        console.log('Retrying to send message ...');
                                        send(retries - 1);  // Trigger retry if retries are remaining
                                    },
                                },
                                {
                                    text: 'Close',
                                    onPress: () => {
                                        console.log('Alert closed without retry');
                                        setSelectedFile('');
                                        setSendingFile(false);
                                        setInputMessage('');
                                    },
                                    style: 'cancel',  // Optional: Style to differentiate the close button
                                }
                            ])
                        }
                        
                    } catch (err) {
                        console.log('Error sending message:', err);
    
                        if (retries > 0) {
                            // Retry after 2 seconds if retries are remaining
                            console.log('Retrying to send message ...');
                            setTimeout(() => send(retries - 1), 2000);
                        } else {
                            // Final failure message after all retries
                            setSendingFile(false);
                            Alert.alert('Failed to send message. Please try again later.');
                        }
                    }
                };
    
                // Call the retry logic
                send();
            }
        }
        
    }

    const deviceTimeZone = RNLocalize.getTimeZone();
    const formatCreatedAt = (timestamp) => {
        // Create a moment object from the timestamp in the server's timezone
        const momentDate = moment.tz(timestamp, "YYYY-MM-DD HH:mm:ss", "Asia/Ho_Chi_Minh");
    
        // Convert it to the device's timezone
        const localTime = momentDate.tz(deviceTimeZone);
    
        // Format the time in AM/PM
        return localTime.format('hh:mm A');
    };


    const fetchMessages = async () => {
        try {
            const result = await GetMessagesApi();
            // console.log('Fetch Message Data ==> ', result.data.data);
            let data = result.data.data;

            const newMessages = data.map(item => ({
                text: item.text,
                time: formatCreatedAt(item.time),
                type: item.type,
                attachment: item.attachment,
                attachment_type: item.attachment ? item.attachment.split('.').pop().toLowerCase() : null,
            }));

            setMessages(newMessages);

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
            const newMessage = {
                text: data.content,
                time: formatCreatedAt(data.created_at),
                attachment: data.attachment,
                attachment_type:data.attachment_type,
                type: userId == data.receiver_id ? 'received' : 'sent',
                receiverId: userId,
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);

            if (!userScrolling) {
                setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);
            }
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

        if (firstLoad) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 150);
            setFirstLoad(false);
        }
        
        // Cleanup on unmount
        return () => {
            if (channel) {
                channel.unbind_all(); // Unbind all events
                channel.unsubscribe();
                console.log(`Unsubscribed from channel chat-channel-${currentUserId}`);
            }
        };
    }, []);


    if (!pusher || !currentUserId) {
        console.log('Current User id -->', currentUserId);
        return (
          <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
            <Text style={styles.chat_user_title_text} >Unable to initialize Pusher.</Text>
          </View>
        );
    }

    const downloadFiles = (item) => {
        console.log(item)
        const {config, fs} = RNFetchBlob;
        const fileDir = fs.dirs.DownloadDir;
        config({
            fileCache: true,
            addAndroidDownloads:{
                useDownloadManager:true,
                notification:true,
                path: fileDir+'/child_care_software/parent_app/'+item.attachment,
                description:'File download'
            }
        })
        .fetch("GET", UrlProvider.asset_url_staging+'/'+item.attachment, {
            //some headers ..
        })
        .then((res) => {
            // the temp file path
            console.log("The file saved to ", res.path());
            Alert.alert('File has been downloaded successfully');
        });
    }
      


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
                <TouchableOpacity style={styles.chat_header} onPress={ () => navigation.navigate('SenderProfile', {userId: userId, userName: userName, initials: initials, type: type})}>
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
                                                isImage.includes(item.attachment_type) ? (
                                                    <Image
                                                        source={{ uri: item.attachment.startsWith('content') ? item.attachment : `${UrlProvider.asset_url_staging}/${item.attachment}` }}
                                                        style={{ width: 200, height: 200, borderRadius: 8 }}
                                                        resizeMode="cover"
                                                    />
                                                ) : (
                                                    <TouchableOpacity style={{ padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 5 }} onPress={ () => downloadFiles(item)}>
                                                        <View style={{justifyContent:'center', alignItems:'center', marginBottom:10}}>
                                                            <Icon name="file-alt" style={styles.attachment_icon} />
                                                        </View>
                                                    
                                                        <Text style={{ color: '#007AFF', textAlign:'center', textDecorationLine: 'underline' }}>
                                                            Open {item.attachment_type} Document
                                                        </Text>
                                                    </TouchableOpacity>
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

                                            {item.attachment && (
                                                isImage.includes(item.attachment_type) ? (
                                                    <TouchableOpacity onPress={ () => downloadFiles(item)}>
                                                        <Image
                                                            source={{ uri: item.attachment.startsWith('content') ? item.attachment : `${UrlProvider.asset_url_staging}/${item.attachment}` }}
                                                            style={{ width: 200, height: 200, borderRadius: 8 }}
                                                            resizeMode="cover"
                                                        />
                                                    </TouchableOpacity>
                                                    
                                                ) : (
                                                    <TouchableOpacity style={{ padding: 15, backgroundColor: '#36454f', borderRadius: 8, marginBottom: 5 }} onPress={ () => downloadFiles(item)}>
                                                        <View style={{justifyContent:'center', alignItems:'center', marginBottom:10}}>
                                                            <Icon name="file-alt" style={[styles.attachment_icon, {color:'#f0f0f0'}]} />
                                                        </View>
                                                    
                                                        <Text style={{ color: '#f0f0f0', textAlign:'center', textDecorationLine: 'underline' }}>
                                                            Open {item.attachment_type} Document
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            )}
                                            <Text style={styles.receiver_message_time}> 
                                                <Icon name="clock" /> {item.time}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </>
                        )}

                        onScrollBeginDrag={() => setUserScrolling(true)}
                        onScrollEndDrag={() => setUserScrolling(false)}
                    />
                    
                    {/* Attachment Preview */}
                    {selectedFile && (
                        <View style={styles.sender_container}>
                            <View style={styles.sender_message_area}>
                                <TouchableOpacity onPress={() => !sendingFile && setSelectedFile(null)}>
                                    <Text style={styles.removeAttachmentText}>
                                        {!sendingFile   ? ( <Icon name="times-circle" style={{fontSize:30}} /> ) : 'Sending Wait ....'}
                                    </Text>
                                </TouchableOpacity>
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

                                        <TouchableOpacity style={{ padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 5 }}>
                                            <View style={{justifyContent:'center', alignItems:'center', marginBottom:10}}>
                                                <Icon name="file-alt" style={[styles.attachment_icon, {color:'#36454f'}]} />
                                            </View>

                                            <Text style={{ color: '#36454f', textAlign:'center', textDecorationLine: 'underline' }}>
                                                Open Document - {selectedFile.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )}

                                    {/* <TouchableOpacity onPress={() => !sendingFile && setSelectedFile(null)}>
                                        <Text style={styles.removeAttachmentText}>
                                            {!sendingFile   ? 'Remove Item' : 'Sending Wait ....'}
                                        </Text>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.send_message_btn_container}>
                    <TouchableOpacity onPress={toggleBottomSheet}>
                        <Icon name="paperclip" style={styles.attachment_icon}/>
                    </TouchableOpacity>
                    <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : null} style={styles.input_container}>
                        <TextInput 
                            style={[styles.text_input, { textAlignVertical: 'top', height: Math.min(inputHeight, MAX_HEIGHT) }]}
                            placeholder="Write your message"
                            placeholderTextColor="#b9b9b9"
                            value={inputMessage}
                            onChangeText={(text) => setInputMessage(text)}
                            scrollEnabled={inputHeight > MAX_HEIGHT}
                            multiline={true}
                            returnKeyType="default"
                            onContentSizeChange={(event) => 
                                setInputHeight(event.nativeEvent.contentSize.height)
                            } 
                        />
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={styles.send_message_btn} onPress={sendMessage}>
                        <IonicIcon name="send" style={styles.send_message_icon}/>
                    </TouchableOpacity>
                </View>
                
                {bottomSheet && (
                    <View style={styles.bottom_sheet_container}>
                        <View style={styles.bottom_sheet_items}>
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
        </SafeAreaView>
       
    )
}

export default SendMessageArea

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background:{
        flex:1,
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
        backgroundColor: '#009b7d',
        padding: 10,
        borderWidth: 1,
        borderColor: '#009b7d',
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
        color: '#f8f8ff',
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
        marginHorizontal: 10,
        marginVertical:20,
        backgroundColor: '#fff',
        width: '70%',
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
        borderTopColor: '#009b7d', // same color as sender bubble
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
        marginTop:20
    },
    removeAttachmentText: {
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor:'crimson',
        borderRadius:20,
        position:'absolute',
        top:0,
        right:0
    },
});

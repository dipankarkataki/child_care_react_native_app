import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView, Alert, FlatList, PermissionsAndroid, Linking, KeyboardAvoidingView, Platform, SafeAreaView, useWindowDimensions } from 'react-native'
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import GetMessagesApi from '../../../api/MessagingApi/GetMessagesApi';
import SendMessageApi from '../../../api/MessagingApi/SendMessageApi';
import TokenManager from '../../../api/TokenManager';
import initializePusher from '../../../../pusherConfig';
import UrlProvider from '../../../api/UrlProvider';
import RNFetchBlob from 'rn-fetch-blob';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';
import styles from './styles';
import Constants from '../../../Navigation/Constants';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';


const profileImage =  undefined;
const background = require('../../../assets/images/background.png');
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
            // console.log('Selected File:', result[0]);
            setBottomSheet(false);
        }catch(err){
            if (DocumentPicker.isCancel(err)) {
                // console.log('User Cancelled Doc Picker');
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
            // console.log('Selected File:', result[0]);
            setBottomSheet(false);
        }catch(err){
            if (DocumentPicker.isCancel(err)) {
                // console.log('User Cancelled Doc Picker');
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
        // console.log('My message ---', inputMessage.trim())
        if((inputMessage.trim().length == 0 && selectedFile == null)){
            Alert.alert('Oops! ', 'Please type a message or select an attachment.');
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
                                        // console.log('Retrying to send message ...');
                                        send(retries - 1);  // Trigger retry if retries are remaining
                                    },
                                },
                                {
                                    text: 'Close',
                                    onPress: () => {
                                        // console.log('Alert closed without retry');
                                        setSelectedFile('');
                                        setSendingFile(false);
                                        setInputMessage('');
                                    },
                                    style: 'cancel',  // Optional: Style to differentiate the close button
                                }
                            ])
                        }
                        
                    } catch (err) {
                        // console.log('Error sending message:', err);
    
                        if (retries > 0) {
                            // Retry after 2 seconds if retries are remaining
                            // console.log('Retrying to send message ...');
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
        const momentDate = moment.utc(timestamp, "YYYY-MM-DD HH:mm:ss").tz(moment.tz.guess()).format('hh:mm A');
        

        // Convert it to the device's timezone
        // const localTime = momentDate.tz(deviceTimeZone);
        // Format the time in AM/PM
        return momentDate;
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
            // console.log('Error', err);
        }
    };

    const subscribeToChannel = (userId, pusherInstance) => {
        const channelName = `chat-channel-${userId}`;
        // console.log(`Subscribing to channel ---- : ${channelName}`);

        channel = pusherInstance.subscribe(channelName);

        channel.bind('pusher:subscription_succeeded', () => {
            // console.log(`Successfully subscribed to channel: ${channelName}`);
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
            // console.log('Pusher state changed from', states.previous, 'to', states.current);
        });

        pusherInstance.connection.bind('error', (error) => {
            // console.error('Pusher connection error:', error);
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
            // console.log('User ID --- :', userId);
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
                // console.log(`Unsubscribed from channel chat-channel-${currentUserId}`);
            }
        };
    }, []);


    if (!pusher || !currentUserId) {
        // console.log('Current User id -->', currentUserId);
        return (
          <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
            <Text style={styles.chat_user_title_text} >Unable to initialize Pusher.</Text>
          </View>
        );
    }

    const downloadFiles = (item) => {
        // console.log(item)
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
        .fetch("GET", UrlProvider.asset_url_production+'/'+item.attachment, {
            //some headers ..
        })
        .then((res) => {
            // the temp file path
            // console.log("The file saved to ", res.path());
            Alert.alert('File has been downloaded successfully');
        });
    }
      


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
                <TouchableOpacity style={styles.chat_header} onPress={ () => navigation.navigate(Constants.CHAT_PROFILE, {userId: userId, userName: userName, initials: initials, type: type})}>
                    <TouchableOpacity onPress={ () => navigation.navigate(Constants.CHAT_DASHBOARD)}>
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
                                                        source={{ uri: item.attachment.startsWith('content') ? item.attachment : `${UrlProvider.asset_url_production}/${item.attachment}` }}
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
                                                            source={{ uri: item.attachment.startsWith('content') ? item.attachment : `${UrlProvider.asset_url_production}/${item.attachment}` }}
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
                                        {!sendingFile   ? ( <Icon name="times-circle" style={{fontSize:scale(15)}} /> ) : 'Sending Wait ....'}
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
                    <TouchableOpacity onPress={toggleBottomSheet} activeOpacity={0.8}>
                        <Icon name="paperclip" style={styles.attachment_icon}/>
                    </TouchableOpacity>
                    <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : null} style={styles.input_container}>
                        <TextInput 
                            style={[styles.text_input, { textAlignVertical: 'top', maxHeight: moderateScale(130), overflow:'scroll' }]}
                            placeholder="Write your message"
                            placeholderTextColor="#b9b9b9"
                            value={inputMessage}
                            onChangeText={(text) => setInputMessage(text)}
                            scrollEnabled={true}
                            multiline={true}
                            returnKeyType="default"
                        />
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={styles.send_message_btn} onPress={sendMessage}>
                        <IonicIcon name="send" style={styles.send_message_icon}/>
                    </TouchableOpacity>
                </View>
                
                {bottomSheet && (
                    <View style={styles.bottom_sheet_container}>
                        <View style={styles.bottom_sheet_items}>
                            <View style={{marginRight: moderateScale(20)}}>
                                <TouchableOpacity style={styles.item_outline} onPress={openGallery}>
                                    <Icon name="images" style={styles.item_icon} />
                                </TouchableOpacity>
                                <Text style={styles.title_text}>Gallery</Text>
                            </View>
                            <View style={{marginRight: moderateScale(20)}}>
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

export default SendMessageArea;

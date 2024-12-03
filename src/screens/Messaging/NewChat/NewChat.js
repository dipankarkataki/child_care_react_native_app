import { FlatList, ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Animated, Alert } from 'react-native'
import React,{useState, useEffect} from 'react'
import NewChatApi from '../../../api/MessagingApi/NewChatApi';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import styles from './styles';
import Constants from '../../../Navigation/Constants';

const background = require('../../../assets/images/background.png');
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


const NewChat = ({navigation}) => {

    const [contactList, setContactList] = useState([]);
    const contactListRef = React.createRef();
    const [shimmerLoader, setShimmerLoader] = useState(false);

    useEffect( () => {

        if(contactListRef.current){
            const contactListAnimated = Animated.stagger(400, [contactListRef.current.getAnimated()]);
            Animated.loop(contactListAnimated).start();
        }

        
        const getContactList = async () => {
            try{
                setShimmerLoader(true)
                const result = await NewChatApi();
                if(result.data && result.data.status){
                    setShimmerLoader(false)
                    setContactList(result.data.data)
                }else{
                    setShimmerLoader(false);
                    Alert.alert('Oops !', 'Something went wrong while fetching contact list. Please try again.');
                }
            }catch(err){
                setShimmerLoader(false);
                Alert.alert('Oops!', 'An error occurred while fetching contact list. Please try again.');
                console.log('Contact List Error ----- ', err);
            }
            
        }

        getContactList();

    }, [contactListRef.current]);

    const getInitials = (firstname, lastname) => {
        const firstNameInitial = firstname[0]?.charAt(0).toUpperCase() || '';
        const lastNameInitial = lastname[0]?.charAt(0).toUpperCase() || '';
        return firstNameInitial + lastNameInitial;
    }

    const getAccountType = (type) => {
        if(type == 13){
            return 'Parent';
        }else if(type == 31){
            return 'Teacher';
        }else{
            return 'Owner';
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
                <View style={styles.header_container}>
                    <TouchableOpacity onPress={ () => navigation.navigate(Constants.CHAT_DASHBOARD)}>
                        <Icon name="long-arrow-alt-left" style={styles.header_icon}/>
                    </TouchableOpacity>
                    <View style={styles.header_text_container}>
                        <Text style={styles.header_text}>Start New Chat</Text>
                    </View>
                </View>
                {
                    shimmerLoader ? (
                        <View>
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                        </View>
                    ) : (
                        <>
                            <Text style={[styles.header_title, styles.header_style]}>Contact List</Text>
                            <FlatList
                                data={contactList}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => (
                                    <TouchableOpacity style={styles.contact_container} onPress={ () => navigation.navigate(Constants.CHAT_AREA, {userId : item.id, userName: item.firstname + ' ' + item.lastname, initials : getInitials(item.firstname, item.lastname), type : getAccountType(item.user_type) })}>
                                        <View style={styles.contact_initials_container}>
                                            <Text style={styles.contact_initials_text}>{getInitials(item.firstname, item.lastname)}</Text>
                                        </View>
                                        {
                                            item.profile_image ? (
                                                <Image source={item.profile_image}  style={styles.contact_image}/>
                                            ) : (
                                                <View style={styles.contact_info_container}>
                                                    <Text style={styles.main_title}>{item.firstname} {item.lastname}</Text>
                                                    <Text style={styles.sub_title}>Account : {getAccountType(item.user_type)} </Text>
                                                </View>
                                            )
                                        }
                                        
                                    </TouchableOpacity>
                                )}      
                            />
                        </>
                    )
                }
                
        </ImageBackground>
        </SafeAreaView>
        
    )
}

export default NewChat;
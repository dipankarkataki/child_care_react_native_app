import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import GetSenderProfileAndMediaApi from '../../../api/MessagingApi/GetSenderProfileAndMediaApi';
import UrlProvider from '../../../api/UrlProvider';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import styles from './styles';
import Constants from '../../../Navigation/Constants';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const profileImage = require('../../../assets/images/pro-image.jpg')
const background = require('../../../assets/images/background.png');
const placeholder_img = require('../../../assets/images/placeholder-img.png');

const SenderProfile = ({navigation, route}) => {

    const { userId, userName, initials, type } = route.params;
    const [profileMedia, setProfileMedia] = useState({});
    const [shimmerLoader, setShimmerLoader] = useState(false);

    const senderProfileRef = React.createRef();

    useEffect(() => {
        if(senderProfileRef.current){
            const senderProfileAnimated = Animated.stagger(400, [senderProfileRef.current.getAnimated()]);
            Animated.loop(senderProfileAnimated).start();
        }

        setShimmerLoader(true)

        GetSenderProfileAndMediaApi(userId)
        .then((result) => {
            setShimmerLoader(false)
            setProfileMedia(result.data.data);
        })
        .catch((err) => {
            setShimmerLoader(false)
            console.log('Error', err);
        });

    }, [senderProfileRef.current]);

    
    console.log('Sender Profile Data ==> ', profileMedia)
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
            <View style={styles.profile_header}>
                <TouchableOpacity style={styles.profile_back_button} onPress={ () => navigation.navigate(Constants.CHAT_AREA, {userId: userId, userName: userName, initials: initials, type: type}) }>
                    <Icon name="angle-left" style={styles.back_btn_icon} />
                </TouchableOpacity>

                <View style={styles.profile_image_container}>
                    <Image source={profileImage} style={styles.profile_header_image} />
                </View>
                <Text style={styles.profile_header_name}>{userName}</Text>
                <Text style={styles.profile_header_email}>{profileMedia?.profile?.email}</Text>
            </View>
            <View style={styles.account_type}>
                <Icon name="info-circle" style={styles.icon}/>
                <View style={styles.account_info_container}>
                    <Text style={styles.main_title}>Owner Account</Text>
                    <Text style={styles.sub_title}>This account uses ChildCareSoftware Account Type : {type}</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.chat_media}>
                    <TouchableOpacity style={styles.chat_media_header}>
                        <View style={styles.media_info_container}>
                            <Icon name="photo-video" style={styles.icon}/>
                            <Text style={[styles.main_title, {marginLeft:10}]}>Chat Media</Text>
                        </View>
                        <Icon name="angle-right" style={styles.icon}/>
                    </TouchableOpacity>
                    {shimmerLoader ? (
                            <View style={styles.shimmerContainer}>
                                <ShimmerPlaceholder ref={senderProfileRef} style={styles.shimmerInputPlaceholder} />
                                <ShimmerPlaceholder ref={senderProfileRef} style={styles.shimmerInputPlaceholder} />
                                <ShimmerPlaceholder ref={senderProfileRef} style={styles.shimmerInputPlaceholder} />
                            </View>
                        ) : (
                            <ScrollView horizontal style={styles.chat_media_content}>
                                {profileMedia?.media?.map((item, index) => {
                                    const extension = item.attachment.split('.').pop().toLowerCase();

                                    // Define the condition to check if it's an image
                                    const isImage = ['jpg', 'jpeg', 'png'].includes(extension);

                                    return (
                                        <View key={index} style={styles.chat_media_content}>
                                            {isImage ? (
                                                // Render Image if it's an image file
                                                <Image
                                                    key={index}
                                                    source={{ uri: `${UrlProvider.asset_url_staging}/${item.attachment}` }}
                                                    style={styles.chat_media_items}
                                                />
                                            ) : (
                                                // Render document icon or text if it's a document
                                                <View style={styles.chat_doc_items}>
                                                    <Icon name="file-alt" style={styles.doc_icon_style}/>
                                                    <Text style={styles.main_title2}>File: {extension.toUpperCase()}</Text>
                                                </View>
                                            )}
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        )
                    }
                    
                </View>
                <View style={styles.account_creator_details}>
                    <View style={styles.account_details_header}>
                        <Icon name="address-card"style={styles.icon}/>
                        <Text style={[styles.main_title, {marginLeft:10}]}>Account Details</Text>
                    </View>
                    <View style={styles.form_group}>
                        <Text style={styles.main_title2}>Phone Number:</Text>
                        <Text style={styles.sub_title2}>{profileMedia?.profile?.country_code} {profileMedia?.profile?.phone}</Text>
                    </View>
                    <View style={styles.form_group}>
                        <Text style={styles.main_title2}>Day Care Name:</Text>
                        <Text style={styles.sub_title2}>{profileMedia?.profile?.site_name}</Text>
                    </View>
                </View>
            </ScrollView>
            
            </ImageBackground>
        </SafeAreaView>
        
    )
}

export default SenderProfile;
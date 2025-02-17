import { Alert, Animated, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessagingDashboardApi from '../../../api/MessagingApi/MessagingDashboardApi';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import styles from './styles';
import Constants from '../../../Navigation/Constants';

const profileImage = undefined
const background = require('../../../assets/images/background.png');
const userAvatar = require('../../../assets/images/profile-image.png');

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const MessagingDashboard = ({ navigation }) => {

    const messageDashboardRef = React.createRef();

    const [chatUserList, setChatUserList] = useState([]);

    const userProfileImage = useSelector((state) => state.profileImage)
    const [shimmerLoader, setShimmerLoader] = useState(false);

    useEffect(() => {

        if (messageDashboardRef.current) {
            const messageDashboardAnimated = Animated.stagger(400, [messageDashboardRef.current.getAnimated()]);
            Animated.loop(messageDashboardAnimated).start();
        }

        const getChatUsers = async () => {
            try {
                setShimmerLoader(true);
                const result = await MessagingDashboardApi();
                if (result.data && result.status) {
                    setShimmerLoader(false);
                    setChatUserList(result.data.data)
                } else {
                    setShimmerLoader(false);
                    Alert.alert('Oops !', 'Something went wrong while fetching chat users. Please try again.');
                }
            } catch (err) {
                setShimmerLoader(false);
                Alert.alert('Oops !', 'Something went wrong while fetching chat users. Please try again.');
                // console.log('Message Dashboard Error ', err)
            }


        }

        getChatUsers();

    }, [messageDashboardRef.current]);

    const getInitials = (name) => {
        const names = name.split(' ');
        const firstNameInitial = names[0]?.charAt(0).toUpperCase() || '';
        const lastNameInitial = names[1]?.charAt(0).toUpperCase() || '';
        return firstNameInitial + lastNameInitial;
    }

    const deviceTimeZone = RNLocalize.getTimeZone();
    const formatCreatedAt = (timestamp) => {
        // Create a moment object from the timestamp in the server's timezone
        const momentDate = moment.utc(timestamp, "YYYY-MM-DD HH:mm:ss").tz(moment.tz.guess()).format('hh:mm A');

        // Format the time in AM/PM
        return momentDate;
    };

    const getAccountType = (type) => {
        if (type == 13) {
            return 'Parent';
        } else if (type == 31) {
            return 'Teacher';
        } else {
            return 'Owner';
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.image_background}>
                <View style={styles.header_container}>
                    <TouchableOpacity onPress={() => navigation.navigate(Constants.DASHBOARD)}>
                        <Icon name="long-arrow-alt-left" style={styles.header_icon} />
                    </TouchableOpacity>
                    <Text style={styles.header_text}>Chat Dashboard</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(Constants.PROFILE_SETTINGS)}>
                        <Image source={userProfileImage} style={styles.user_avatar} />
                    </TouchableOpacity>
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
                            {
                                chatUserList.length > 0 ? (
                                    <FlatList
                                        data={chatUserList}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <View style={styles.chat_container}>
                                                <View style={styles.card}>
                                                    <TouchableOpacity style={styles.card_content} onPress={() => navigation.navigate(Constants.CHAT_AREA,
                                                        {
                                                            userId: item.id,
                                                            userName: item.name,
                                                            initials: getInitials(item.name),
                                                            type: getAccountType(item.type),
                                                        })
                                                    }>
                                                        {
                                                            profileImage ? (
                                                                <Image source={profileImage} style={styles.chat_profile_image} />
                                                            ) : (
                                                                <View style={styles.contact_initials_container}>
                                                                    <Text style={styles.contact_initials_text}>{getInitials(item.name)}</Text>
                                                                </View>
                                                            )
                                                        }
                                                        <View style={styles.chat_user_area}>
                                                            <Text style={styles.chat_user_title_text}>{item.name}</Text>
                                                            <Text style={styles.preview_user_chat} numberOfLines={2}>
                                                                {item.message}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.chat_notification_area}>
                                                            <Text style={styles.chat_time_text}> {formatCreatedAt(item.latest_time)}</Text>
                                                            <View style={styles.notification_count_container}>
                                                                {/* <Text style={styles.notification_count_text}>3</Text>
                                                                <Icon name="bell" style={styles.notification_icon}/> */}
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}
                                    />
                                ) : (
                                    <View style={styles.select_contact_to_start_chat_container}>
                                        <TouchableOpacity style={styles.select_contact_to_start_chat_btn}>
                                            <Text style={styles.heading_title}>Press the button at the bottom right to start a new chat.</Text>
                                        </TouchableOpacity>
                                    </View>


                                )
                            }
                        </>
                    )
                }

                <View style={styles.floating_new_chat_btn_container}>
                    <TouchableOpacity style={styles.floating_new_chat_btn} onPress={() => navigation.navigate(Constants.NEW_CHAT)}>
                        <IonicIcon name="chatbox-ellipses" style={styles.new_chat_icon} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>


    )
}

export default MessagingDashboard;
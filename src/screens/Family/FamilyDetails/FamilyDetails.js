// FamilyDetails.js
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Modal, Image, SafeAreaView} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import StudentDetails from '../StudentDetails/StudentDetails';
import MemberDetails from '../MemberDetails/MemberDetails';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import Constants from '../../../Navigation/Constants';

const backgroundImage = require('../../../assets/images/background.png');
const userAvatar = require('../../../assets/images/profile-image.png')

const FamilyDetails = ({ navigation, route }) => {

    const { familyId, siteId } = route.params;
    const [familyName, setFamilyName] = useState('');
    const handleFamilyNameFetched = useCallback((name) => {
        setFamilyName(name);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.image_background}>
                <View style={styles.header_container}>
                    <TouchableOpacity onPress={ () => navigation.navigate(Constants.PROFILE_SETTINGS)}>
                        <Icon name="long-arrow-alt-left" style={styles.header_icon}/>
                    </TouchableOpacity>
                    <View style={styles.header_text_container}>
                        <Text style={styles.header_text}>Family Details</Text>
                    </View>
                </View>
                <View style={styles.family_content_container}>
                    <View style={styles.family_name_container}>
                        <Text style={styles.family_name_text}>Family Name: {familyName}</Text>
                    </View>
                    <StudentDetails familyId={familyId} siteId={siteId} navigation={navigation} />
                    <MemberDetails familyId={familyId} siteId={siteId} onFamilyNameFetched={handleFamilyNameFetched} navigation={navigation} />
                </View>
            </ImageBackground>
        </SafeAreaView>
        
    );
};

export default FamilyDetails;

import { ImageBackground, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import FamilyDetailsApi from '../../api/FamilyDetailsApi';

const backgroundImage = require('../../assets/images/background.png');
const profileImage = require('../../assets/images/profile-image.png');

const FamilyDetails = ({ navigation, route }) => {

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [kioskPin, setKioskPin] = useState('12345');
    let [phone, setPhone] = useState('');
    const [familyMembers, setFamilyMembers] = useState([]);
    const {familyId} = route.params;

    const [confirmPasswordVisibilty, setConfirmPasswordVisibility] = useState(true);

    useEffect( () => {
        FamilyDetailsApi(familyId)
        .then( (result) => {
            if(result.status == 200){
                setFamilyMembers(result.data.data);
            }
            console.log('Family Details Result --', result.data.data)
        })
        .catch( (err) => {
            console.log('Error', err)
        }) 
    },[familyId]);

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <ScrollView style={styles.family_content_container}>
                <View style={styles.card}>
                    <Text style={styles.title_text}>CHILDREN</Text>
                    {familyMembers.map((member) => (
                        <TouchableOpacity
                            key={member.id} // Use the unique ID for the key
                            style={styles.family_details_card}
                            onPress={() => navigation.navigate('FamilyDetails', { familyId: member.family_id })}
                        >
                            <Text style={styles.family_details_text}>
                                {member.firstname} {member.lastname}
                            </Text>
                            <Icon name="angle-right" style={styles.icon} />
                        </TouchableOpacity>
                    ))}

                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('FamilyDetails')}>
                        <Text style={styles.primary_title_text}>Add New Student</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <Text style={styles.title_text}>FAMILY MEMBERS</Text>
                    <TouchableOpacity style={styles.family_details_card} onPress={() => navigation.navigate('FamilyDetails')}>
                        <Text style={styles.family_details_text}>William J. Sartor</Text>
                        <Icon name="angle-right" style={styles.icon} />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('FamilyDetails')}>
                        <Text style={styles.primary_title_text}>Add New Family Member</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

export default FamilyDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        fontSize: 20,
        fontWeight:'bold',
        color: 'black',
    },
    family_content_container:{
        paddingLeft:10,
        paddingRight:15,
        paddingTop:10,
        marginBottom:20
    },
    card:{
        borderRadius:10,
        backgroundColor:'#fff',
        padding:15,
        elevation:2,
        marginBottom:20
    },text_input_container:{
        marginBottom:20
    },
    family_details_card:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10 ,
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
    divider: {
        height: 1,
        backgroundColor: '#E8F2F4',
        width: '100%',
        marginVertical: 10,
    },
    primary_title_text:{
        color:'#2CABE2',
        fontSize:18,
        fontFamily:'Poppins Medium',
        marginBottom:16
    },
    add_new_btn:{
       
    },
});

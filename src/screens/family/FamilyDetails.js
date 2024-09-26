import { ImageBackground, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView, Modal } from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import FamilyDetailsApi from '../../api/FamilyDetailsApi';
import DropDownPicker from 'react-native-dropdown-picker';

const backgroundImage = require('../../assets/images/background.png');
const profileImage = require('../../assets/images/profile-image.png');

const FamilyDetails = ({ navigation, route }) => {
    
    let [familyName, setFamilyName] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [gender, setGender] = useState('');
    let [status, setStatus] = useState('');
    let [phone, setPhone] = useState('');

    const [familyMembers, setFamilyMembers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dropdownGenderVisible, setDropdownGenderVisible] = useState(false);
    const [dropdownStatusVisible, setDropdownStatusVisible] = useState(false);

    const genderItems = [
        {label: 'Male' , value: 'Male'},
        {label: 'FeMale' , value: 'FeMale'},
        {label: 'Other' , value: 'Other'},
    ];
    const statusItems = [
        {label: 'Active' , value: 1},
        {label: 'Inactive' , value: 0},
    ];

    const {familyId} = route.params;

    useEffect( () => {
        FamilyDetailsApi(familyId)
        .then( (result) => {
            if(result.status == 200){
                setFamilyMembers(result.data.data);
                setFamilyName(result.data.data[0].name)
            }
            console.log('Family Details Result --', result.data.data)
        })
        .catch( (err) => {
            console.log('Error', err)
        }) 
    },[familyId]);


    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <ScrollView style={styles.family_content_container}>
                <View style={styles.family_name_container}>
                    <Text style={styles.family_name_text}>Family Name: {familyName}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.title_text}>CHILDREN</Text>
                    {familyMembers.map((member) => (
                        <TouchableOpacity
                            key={member.id}
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
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                    <TouchableOpacity>
                        <Text style={styles.primary_title_text}>Add New Family Member</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.backdrop}>
                    <View style={styles.modal_view}>
                        <Text style={styles.modal_text}>Add Student</Text>
                        <View style={styles.form}>
                            <View style={styles.form_group}>
                                <Text style={styles.input_label}>First Name<Text style={styles.asterics}>*</Text></Text>
                                <TextInput
                                    style={styles.text_input}
                                    placeholder="e.g Jhon"
                                    placeholderTextColor="#b9b9b9"
                                    value={firstName}
                                    onChangeText={(text) => setFirstName(text)}
                                />
                            </View>
                            <View style={styles.form_group}>
                                <Text style={styles.input_label}>Last Name<Text style={styles.asterics}>*</Text></Text>
                                <TextInput
                                    style={styles.text_input}
                                    placeholder="e.g Doe"
                                    placeholderTextColor="#b9b9b9"
                                    value={lastName}
                                    onChangeText={(text) => setLastName(text)}
                                />
                            </View>
                            <View style={styles.form_group}>
                                <Text style={styles.input_label}>Gender<Text style={styles.asterics}>*</Text></Text>
                                <DropDownPicker 
                                    style={styles.text_input}
                                    items={genderItems}
                                    open={dropdownGenderVisible}
                                    value={gender}
                                    setOpen={ () => setDropdownGenderVisible(!dropdownGenderVisible)}
                                    setValue={(val) => setGender(val)}
                                    placeholder="Please Select Gender"
                                    placeholderStyle={{color:'#b9b9b9'}}
                                    autoScroll
                                    dropDownDirection='TOP'
                                />
                            </View>
                            <View style={styles.form_group}>
                                <Text style={styles.input_label}>Status<Text style={styles.asterics}>*</Text></Text>
                                <DropDownPicker 
                                    style={styles.text_input}
                                    items={statusItems}
                                    open={dropdownStatusVisible}
                                    value={status}
                                    setOpen={ () => setDropdownStatusVisible(!dropdownStatusVisible)}
                                    setValue={(val) => setStatus(val)}
                                    placeholder="Please Select Status"
                                    placeholderStyle={{color:'#b9b9b9'}}
                                    autoScroll
                                />
                            </View>
                            <View style={styles.form_group}>
                                <Text style={styles.input_label}>Date of Birth<Text style={styles.asterics}>*</Text></Text>
                                <TextInput
                                    style={styles.text_input}
                                    placeholder="e.g mm/dd/YYYY"
                                    placeholderTextColor="#b9b9b9"
                                    value={lastName}
                                    onChangeText={(text) => setLastName(text)}
                                />
                            </View>
                        </View>
                        <View style={styles.modal_button_container}>
                            <TouchableOpacity
                                style={[styles.button, styles.button_save_details]}
                                onPress={handleModalClose}
                            >
                                <Text style={styles.textStyle}>Save Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.button_close]}
                                onPress={handleModalClose}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    },
    form_group:{
        marginBottom:16
    },
    input_label:{
        marginBottom:8,
        color:'#797979',
        fontSize:17,
        fontFamily:'Poppins Medium',
    },
    text_input:{
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        fontSize: 17,
        color: '#535353',
        fontFamily:'Poppins Regular',
    },
    asterics:{
        color:'crimson'
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
    modal_button_container:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        

    },  
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    button_close: {
        backgroundColor: '#cdcdcd',
    },
    button_save_details:{
        backgroundColor: '#FFB52E',
        marginRight:10,
    },
    textStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize:14,
        fontFamily:'Poppins Regular'
    },
    modal_text: {
        marginBottom: 30,
        color:"#000",
        fontSize:17,
        fontFamily:'Poppins Medium'
    },
    family_name_container:{
        marginBottom:16,
        marginTop:10
    },
    family_name_text:{
        color:'#000',
        fontFamily:'Poppins Medium',
        fontSize:20
    },
});

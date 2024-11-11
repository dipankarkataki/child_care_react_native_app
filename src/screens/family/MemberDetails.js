import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native'
import React,  { useEffect, useState } from 'react'
import GetMemberApi from '../../api/FamilyApi/Member/GetMemberApi'
import CustomDropDownPicker from '../../components/CustomDropDownPicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import AddMemberApi from '../../api/FamilyApi/Member/AddMemberApi';
import ModalComponent from '../../components/ModalComponent';

const MemberDetails = ({familyId, siteId, navigation}) => {
    const [member, setMember] = useState([]);
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [contactType, setContactType] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [address, setAddress] = useState('');
    let [city, setCity] = useState('');
    let [countryState, setCountryState] = useState('');
    let [zipCode, setZipCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [responseModalVisible, setResponseModalVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(true);
    const [modalMessage, setModalMessage] = useState('');
    const [modalIcon, setModalIcon] = useState(null); 

    const contactTypeItems = [
        { label: 'Parent', value: 1 },
        { label: 'Guardian', value: 2 },
        { label: 'Approve Pickup', value: 3 },
        { label: 'Emergency Contact', value: 4},
    ];

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        contactType:'',
        email: '',
        phone: '',
        address: '',
        city: '',
        countryState: '',
        zipCode: '',
    });

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setContactType('');
        setPhone('');
        setEmail('');
        setAddress('');
        setCity('');
        setCountryState('');
        setZipCode('');
    }

    const handleModalClose = () => {
        setModalVisible(false);
        setErrors('')
        setLoader(false);
        resetForm();
    };

    useEffect(() => {
        GetMemberApi(familyId)
        .then((result) => {
            if (result.status === 200) {
                setMember(result.data.data.reverse());
            }
            // console.log('Member Details --', result.data.data);
        })
        .catch((err) => {
            console.log('Error', err);
        });
    }, [familyId]);

    const reloadApiData = () => {
        GetMemberApi(familyId)
        .then((result) => {
            if (result.status === 200) {
                setMember(result.data.data.reverse());
            }
            console.log('Member Details --', result.data.data);
        })
        .catch((err) => {
            console.log('Error', err);
        });
    }


    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!firstName) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        } else {
            newErrors.firstName = '';
        }

        if (!lastName) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        } else {
            newErrors.lastName = '';
        }

        if (!contactType) {
            newErrors.contactType = 'Contact Type is required';
            isValid = false;
        } else {
            newErrors.contactType = '';
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Valid email is required';
            isValid = false;
        } else {
            newErrors.email = '';
        }

        if (!phone || phone.length !== 10) {
            newErrors.phone = 'Please enter a valid phone number';
            isValid = false;
        } else {
            newErrors.phone = '';
        }

        if (!address) {
            newErrors.address = 'Address is required';
            isValid = false;
        } else {
            newErrors.address = '';
        }

        if (!city) {
            newErrors.city = 'City is required';
            isValid = false;
        } else {
            newErrors.city = '';
        }

        if (!countryState) {
            newErrors.countryState = 'State is required';
            isValid = false;
        } else {
            newErrors.countryState = '';
        }

        if (!zipCode) {
            newErrors.zipCode = 'ZipCode is required';
            isValid = false;
        } else {
            newErrors.zipCode = '';
        }

        setErrors(newErrors);
        return isValid;
    }

    const submitForm = () => {
        if (validateForm()) {
            setLoader(true);
            AddMemberApi({
                'firstname': firstName,
                'lastname': lastName,
                'type': contactType,
                'email': email.toLocaleLowerCase(),
                'phone1_code': 'US',
                'phone1_prefix' : '+1',
                'phone1': phone,
                'address1': address,
                'city': city,
                'state': countryState,
                'zipcode': zipCode,
                'family_id' : familyId,
                'site_id': siteId
            }).then((result) => {
                if(result.data.status === true){
                    setResponseModalVisible(true)
                    setModalIcon('success');
                    setModalMessage(result.data.message);
                    setLoader(false);
                    reloadApiData();
                    
                }else{
                    setResponseModalVisible(true)
                    setModalIcon('error');
                    setModalMessage(result.data.message);
                    setShouldNavigate(false)
                    setLoader(false);
                }
                console.log('Store Data Result--- ', result.data);
            }).catch((err) => {
                console.log('Error --> ',err);
            });
        }
    }

    const handleResponseModalOnClose = () => {
        setResponseModalVisible(false)
        if(shouldNavigate){
            navigation.navigate('FamilyDetails', {familyId, siteId})
            handleModalClose();
        }

        console.log('Should Navigate -->', shouldNavigate)
    }

    return (
        <>
            <View style={styles.card}>
                <Text style={styles.title_text}>FAMILY MEMBERS</Text>
                {member.map((member) => (
                    <TouchableOpacity
                        key={member.id}
                        style={styles.family_details_card}
                        onPress={() =>
                            navigation.navigate('FamilyDetails', { familyId: member.family_id })
                        }
                    >
                        <Text style={styles.family_details_text}>
                            {member.firstname} {member.lastname}
                        </Text>
                        <Icon name="angle-right" style={styles.icon} />
                    </TouchableOpacity>
                ))}
                <View style={styles.divider} />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.primary_title_text}>Add New Member</Text>
                </TouchableOpacity>
            </View>

             {/* Modal for Adding New Contact */}
             <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.backdrop}>
                    <View style={styles.modal_view}>
                        <Text style={styles.modal_text}>Add Contact</Text>
                        <ScrollView style={{ maxHeight: '80%' }}>
                            <KeyboardAvoidingView>
                                <View style={styles.form}>
                                    {/* First Name */}
                                    <View style={styles.form_group}>
                                        <Text style={styles.input_label}>
                                            First Name<Text style={styles.asterics}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={styles.text_input}
                                            placeholder="e.g. John"
                                            placeholderTextColor="#b9b9b9"
                                            value={firstName}
                                            onChangeText={setFirstName}
                                        />
                                        {errors.firstName ? <Text style={styles.error_text}>{errors.firstName}</Text> : null}
                                    </View>

                                    {/* Last Name */}
                                    <View style={styles.form_group}>
                                        <Text style={styles.input_label}>
                                            Last Name<Text style={styles.asterics}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={styles.text_input}
                                            placeholder="e.g. Doe"
                                            placeholderTextColor="#b9b9b9"
                                            value={lastName}
                                            onChangeText={setLastName}
                                        />
                                         {errors.lastName ? <Text style={styles.error_text}>{errors.lastName}</Text> : null}
                                    </View>

                                    {/* Gender */}
                                    <View style={styles.form_group}>
                                        <Text style={styles.input_label}>
                                            Contact Type<Text style={styles.asterics}>*</Text>
                                        </Text>
                                        <CustomDropDownPicker
                                            placeholder="Please Select Contact Type"
                                            items={contactTypeItems}
                                            value={contactType}
                                            setValue={setContactType}
                                            zIndex={3000}
                                        />
                                        {errors.contactType ? <Text style={styles.error_text}>{errors.contactType}</Text> : null}
                                    </View>

                                    <View style={styles.form_group}>
                                        <Text style={styles.input_label}>
                                            Phone Number<Text style={styles.asterics}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={styles.text_input}
                                            placeholder="e.g. 784xxxx785"
                                            placeholderTextColor="#b9b9b9"
                                            value={phone}
                                            onChangeText={setPhone}
                                        />
                                        {errors.phone ? <Text style={styles.error_text}>{errors.phone}</Text> : null}
                                    </View>

                                    <View style={styles.form_group}>
                                        <Text style={styles.input_label}>
                                            Email<Text style={styles.asterics}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={styles.text_input}
                                            placeholder="e.g. jhondoe@xyz.com"
                                            placeholderTextColor="#b9b9b9"
                                            value={email}
                                            onChangeText={setEmail}
                                        />
                                        {errors.email ? <Text style={styles.error_text}>{errors.email}</Text> : null}
                                    </View>
                                    <View style={styles.form_group}>
                                        <Text style={styles.input_label}>
                                            Address<Text style={styles.asterics}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={styles.text_input}
                                            placeholder="e.g. 123 example street"
                                            placeholderTextColor="#b9b9b9"
                                            value={address}
                                            onChangeText={setAddress}
                                        />
                                        {errors.address ? <Text style={styles.error_text}>{errors.address}</Text> : null}
                                    </View>
                                    <View style={styles.form_group}>
                                        <Text style={styles.input_label}>
                                            City<Text style={styles.asterics}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={styles.text_input}
                                            placeholder="e.g. Birmingham"
                                            placeholderTextColor="#b9b9b9"
                                            value={city}
                                            onChangeText={setCity}
                                        />
                                        {errors.city ? <Text style={styles.error_text}>{errors.city}</Text> : null}
                                    </View>
                                    <View style={styles.form_group}>
                                        <Text style={styles.input_label}>
                                            Select State<Text style={styles.asterics}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={styles.text_input}
                                            placeholder="e.g. Alabama"
                                            placeholderTextColor="#b9b9b9"
                                            value={countryState}
                                            onChangeText={setCountryState}
                                        />
                                        {errors.countryState ? <Text style={styles.error_text}>{errors.countryState}</Text> : null}
                                    </View>
                                    <View style={styles.form_group}>
                                        <Text style={styles.input_label}>
                                            Zip Code<Text style={styles.asterics}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={styles.text_input}
                                            placeholder="e.g. 1234567"
                                            placeholderTextColor="#b9b9b9"
                                            value={zipCode}
                                            onChangeText={setZipCode}
                                        />
                                        {errors.zipCode ? <Text style={styles.error_text}>{errors.zipCode}</Text> : null}
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                            
                        </ScrollView>

                        {/* Modal Buttons */}
                        <View style={styles.modal_button_container}>
                            <TouchableOpacity style={[styles.button, styles.button_save_details]} onPress={() => submitForm()} disabled={loader}>
                                <Text style={[styles.textStyle, styles.save_details_text]}>{loader ? 'Please wait...' : 'Save Details'}</Text>
                                <ActivityIndicator size="large" color='#2E78FF' style={styles.activity_indicator} animating={loader}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.button_close]} onPress={handleModalClose}>
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            <ModalComponent 
                modalVisible={responseModalVisible}
                setModalVisible={setResponseModalVisible}
                message={modalMessage}
                onClose={handleResponseModalOnClose}
                icon={modalIcon}
            
            />
        </>
    )
}

export default MemberDetails

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    family_content_container: {
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 10,
        marginBottom: 20,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        elevation: 2,
        marginBottom: 20,
    },
    form_group: {
        marginBottom: 16,
    },
    input_label: {
        marginBottom: 8,
        color: '#797979',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    text_input: {
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        fontSize: 17,
        color: '#535353',
        fontFamily: 'Poppins Regular',
    },
    asterics: {
        color: 'crimson',
    },
    family_details_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    family_details_text: {
        color: 'black',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    title_text: {
        color: '#797979',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#E8F2F4',
        width: '100%',
        marginVertical: 10,
    },
    primary_title_text: {
        color: '#2CABE2',
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        marginBottom: 16,
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
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modal_button_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    button_close: {
        backgroundColor: '#cdcdcd',
        marginTop:20,
        paddingHorizontal:30,
    },
    button_save_details: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:36,
        marginRight:10,
        marginTop:20

    },
    save_details_text:{
        
        marginBotoom:0
    },
    textStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    modal_text: {
        marginBottom: 30,
        color: '#000',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    }
})
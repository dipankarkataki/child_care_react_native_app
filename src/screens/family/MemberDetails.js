import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal} from 'react-native'
import React,  { useEffect, useState } from 'react'
import MemberApi from '../../api/FamilyApi/MemberApi'
import CustomDropDownPicker from '../../components/CustomDropDownPicker'
import CustomDatePicker from '../../components/CustomDatePicker'
import Icon from 'react-native-vector-icons/FontAwesome';

const MemberDetails = ({familyId, navigation}) => {
    const [member, setMember] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactType, setContactType] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const contactTypeItems = [
        { label: 'Parent', value: 'Parent' },
        { label: 'Guardian', value: 'Guardian' },
        { label: 'Approve Pickup', value: 'Approve Pickup' },
        { label: 'Emergency Contact', value: 'Emergency Contact' },
    ];

    const handleModalClose = () => {
        setModalVisible(false);
        // Optionally, reset form fields here
        setFirstName('');
        setLastName('');
        setContactType(null);
        setPhone(null);
        setEmail('');
        setAddress('');
        setCity('');
        setState('');
        setZipCode('');
        
    };

    const handleSaveDetails = () => {
        console.log('Saving details:', {
            firstName,
            lastName,
            contactType,
            phone,
            email,
            address,
            city,
            state,
            zipCode,

        });
        handleModalClose();
    };

    useEffect(() => {
        MemberApi(familyId)
        .then((result) => {
            if (result.status === 200) {
                setMember(result.data.data);
            }
            console.log('Member Details --', result.data.data);
        })
        .catch((err) => {
            console.log('Error', err);
        });

    }, [familyId]);

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
                    <Text style={styles.primary_title_text}>Add New Family Member</Text>
                </TouchableOpacity>
            </View>

             {/* Modal for Adding New Student */}
             <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.backdrop}>
                    <View style={styles.modal_view}>
                        <Text style={styles.modal_text}>Add Member</Text>
                        <ScrollView style={{ maxHeight: '80%' }}>
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
                                </View>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        City<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder="e.g. Wahington"
                                        placeholderTextColor="#b9b9b9"
                                        value={city}
                                        onChangeText={setCity}
                                    />
                                </View>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        Select State<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder="e.g. Alabama"
                                        placeholderTextColor="#b9b9b9"
                                        value={state}
                                        onChangeText={setState}
                                    />
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
                                </View>
                            </View>
                        </ScrollView>

                        {/* Modal Buttons */}
                        <View style={styles.modal_button_container}>
                            <TouchableOpacity
                                style={[styles.button, styles.button_save_details]}
                                onPress={handleSaveDetails}
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
    },
    button_save_details: {
        backgroundColor: '#FFB52E',
        marginRight: 10,
    },
    textStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins Regular',
    },
    modal_text: {
        marginBottom: 30,
        color: '#000',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
})
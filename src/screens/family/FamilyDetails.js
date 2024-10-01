// FamilyDetails.js
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Modal,} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomDropDownPicker from '../../components/CustomDropDownPicker';
import StudentApi from '../../api/FamilyApi/StudentApi';
import MemberApi from '../../api/FamilyApi/MemberApi';

const backgroundImage = require('../../assets/images/background.png');

const FamilyDetails = ({ navigation, route }) => {
    // State variables
    const [familyName, setFamilyName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState(null);
    const [status, setStatus] = useState(null);
    const [phone, setPhone] = useState('');

    const [student, setStudent] = useState([]);
    const [member, setMember] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const { familyId } = route.params;

    // State for DatePickers
    const [dob, setDob] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');

    // DropDownPicker items
    const genderItems = [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' },
    ];

    const statusItems = [
        { label: 'Active', value: 1 },
        { label: 'Inactive', value: 0 },
    ];

    // Fetch family details
    useEffect(() => {
        StudentApi(familyId)
        .then((result) => {
            if (result.status === 200) {
                setStudent(result.data.data);
                setFamilyName(result.data.data[0]?.name || '');
            }
            console.log('Student Details --', result.data.data);
        })
        .catch((err) => {
            console.log('Error', err);
        });


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

    const handleModalClose = () => {
        setModalVisible(false);
        // Optionally, reset form fields here
        setFirstName('');
        setLastName('');
        setGender(null);
        setStatus(null);
        setDob('');
        setAdmissionDate('');
    };

    const handleSaveDetails = () => {
        // Implement your save logic here
        // For example, validate inputs and make an API call
        console.log('Saving details:', {
            firstName,
            lastName,
            gender,
            status,
            dob,
            admissionDate,
        });
        // After saving, close the modal
        handleModalClose();
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <ScrollView style={styles.family_content_container}>
                <View style={styles.family_name_container}>
                    <Text style={styles.family_name_text}>Family Name: {familyName}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.title_text}>CHILDREN</Text>
                    {student.map((student) => (
                        <TouchableOpacity
                            key={student.id}
                            style={styles.family_details_card}
                            onPress={() =>
                                navigation.navigate('FamilyDetails', { familyId: student.family_id })
                            }
                        >
                            <Text style={styles.family_details_text}>
                                {student.firstname} {student.lastname}
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
                    <TouchableOpacity>
                        <Text style={styles.primary_title_text}>Add New Family Member</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modal for Adding New Student */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.backdrop}>
                    <View style={styles.modal_view}>
                        <Text style={styles.modal_text}>Add Student</Text>
                        <ScrollView style={{ maxHeight: '90%' }}>
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
                                        Gender<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <CustomDropDownPicker
                                        placeholder="Please Select Gender"
                                        items={genderItems}
                                        value={gender}
                                        setValue={setGender}
                                        zIndex={3000} // Higher zIndex
                                    />
                                </View>

                                {/* Status */}
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        Status<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <CustomDropDownPicker
                                        placeholder="Please Select Status"
                                        items={statusItems}
                                        value={status}
                                        setValue={setStatus}
                                        zIndex={2000} // Lower zIndex than Gender if necessary
                                    />
                                </View>

                                {/* Date of Birth */}
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        Date of Birth<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <CustomDatePicker label="mm/dd/YYYY" value={dob} onChange={setDob} />
                                </View>

                                {/* Admission Date */}
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>Admission Date</Text>
                                    <CustomDatePicker
                                        label="mm/dd/YYYY"
                                        value={admissionDate}
                                        onChange={setAdmissionDate}
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
        </ImageBackground>
    );
};

export default FamilyDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    family_name_container: {
        marginBottom: 16,
        marginTop: 10,
    },
    family_name_text: {
        color: '#000',
        fontFamily: 'Poppins Medium',
        fontSize: 20,
    },
});

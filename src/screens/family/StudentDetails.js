import { StyleSheet, Text, View, TextInput, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import StudentApi from '../../api/FamilyApi/StudentApi';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomDropDownPicker from '../../components/CustomDropDownPicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const StudentDetails = ({familyId, onFamilyNameFetched, navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState(null);
    const [status, setStatus] = useState(null);
    const [student, setStudent] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dob, setDob] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');
    const [familyName, setFamilyName] = useState('');

    useEffect(() => {
        console.log('Family Id ', familyId)
        StudentApi(familyId)
        .then((result) => {
            if (result.status === 200) {
                setStudent(result.data.data);
                const fetchedFamilyName = result.data.data[0]?.name || '';
                setFamilyName(fetchedFamilyName);
                if (onFamilyNameFetched && typeof onFamilyNameFetched === 'function') {
                    onFamilyNameFetched(fetchedFamilyName);
                }
            }
            console.log('Student Details --', result.data.data);
        })
        .catch((err) => {
            console.log('Error', err);
        });

    }, [familyId, onFamilyNameFetched]);


    

    const genderItems = [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' },
    ];

    const statusItems = [
        { label: 'Active', value: 1 },
        { label: 'Inactive', value: 0 },
    ];

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
        console.log('Saving details:', {
            firstName,
            lastName,
            gender,
            status,
            dob,
            admissionDate,
        });
        handleModalClose();
    };


    return (
        <>
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
        </>
       
    )
}

export default StudentDetails

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
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
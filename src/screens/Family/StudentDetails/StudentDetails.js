import { StyleSheet, Text, View, TextInput, ScrollView, Modal, TouchableOpacity, ActivityIndicator, Alert, Animated } from 'react-native'
import React, {useEffect, useState} from 'react'
import StudentApi from '../../../api/FamilyApi/StudentApi';
import GetTuitionPlanApi from '../../../api/TuitionPlanApi/GetTuitionPlanApi';
import CustomDatePicker from '../../../components/CustomDatePicker';
import CustomDropDownPicker from '../../../components/CustomDropDownPicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import GetClassRoomApi from '../../../api/ClassRoomApi/GetClassRoomApi';
import AddNewStudentApi from '../../../api/FamilyApi/AddNewStudentApi';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import styles from './styles';
import Constants from '../../../Navigation/Constants';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const StudentDetails = ({familyId, siteId, navigation}) => {

    // console.log('Family Id in Student Details ----', familyId)
    // console.log('Site Id in Student Details ----', siteId)
    const studentDetailsRef = React.createRef();
    
    const [loader, setLoader] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState(null);
    const [status, setStatus] = useState(null);
    const [student, setStudent] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dob, setDob] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');
    const [tuitionPlanItems, setTuitionPlanItems] = useState([]);
    const [selectedTuitionPlan, setSelectedTuitionPlan] = useState('');
    const [classRoomItems, setClassRoomItems] = useState([]);
    const [selectedClassRoom, setSelectedClassRoom] = useState([]);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [newStudents, setNewStudents] = useState(false);
    const [shimmerLoader, setShimmerLoader] = useState(false);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        gender:'',
        status:'',
        dob:'',
        admissionDate:'',
        selectedTuitionPlan:'',
    });

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

        if (!gender) {
            newErrors.gender = 'Gender is required';
            isValid = false;
        } else {
            newErrors.gender = '';
        }

        if (!status) {
            newErrors.status = 'Status is required';
            isValid = false;
        } else {
            newErrors.status = '';
        }

        if (!dob) {
            newErrors.dob = 'Date of birth is required';
            isValid = false;
        } else {
            newErrors.dob = '';
        }

        if (!admissionDate) {
            newErrors.admissionDate = 'Admission date is required';
            isValid = false;
        } else {
            newErrors.admissionDate = '';
        }

        if (!selectedTuitionPlan) {
            newErrors.selectedTuitionPlan = 'Tution plan is required';
            isValid = false;
        } else {
            newErrors.selectedTuitionPlan = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    useEffect(() => {

        if(studentDetailsRef.current){
            const studentDetailsAnimated = Animated.stagger(400, [studentDetailsRef.current.getAnimated()]);
            Animated.loop(studentDetailsAnimated).start();
        }

        setShimmerLoader(true)


        StudentApi(familyId)
        .then((result) => {
            if (result.status === 200 && result.data.data) {
                setShimmerLoader(false)
                setStudent(result.data.data);
                // console.log('Student Details ----', result.data.data )
            }
        })
        .catch((err) => {
            setShimmerLoader(false)
            // console.log('Error', err);
        });


        GetTuitionPlanApi(siteId)
        .then((result) => {
            if (result.status === 200 && result.data.data) {
                setTuitionPlanItems(result.data.data)
            }
            // console.log('Tuition Plan Details --', result.data.data);
        })
        .catch((err) => {
            // console.log('Error', err);
        });


        GetClassRoomApi(siteId)
        .then((result) => {
            if (result.data && result.data.status) {
                setClassRoomItems(result.data.data)
            }
        })
        .catch((err) => {
            // console.log('Error', err);
        });



    }, [studentDetailsRef.current, familyId, newStudents]);


    const tuitionPlans= tuitionPlanItems.map(plan => ({
        label: ( 
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }]}>
                <Text style={[styles.dropdown_list_item,{marginTop:moderateVerticalScale(0), marginRight: moderateScale(5)}]}>{plan.plan_name} - Amount :</Text>
                <Text><Icon name="dollar" style={[styles.currencyIcon]} /></Text>
                <Text style={[styles.dropdown_list_item, {marginTop:moderateVerticalScale(3), marginLeft:moderateScale(2)}]}>{plan.plan_amount}</Text>
            </View>
        ),
        value: plan.id 
    }));

    const classRooms = classRoomItems.map(room => ({
        label: ( 
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }]}>
                <Text style={[styles.dropdown_list_item,{marginTop:moderateVerticalScale(0), marginRight:moderateScale(5)}]}>{room.name}</Text>
            </View>
        ),
        value: room.id 
    }));

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
        setSelectedTuitionPlan('');
        setSelectedClassRoom('');
        setAddress('');
        setCity('');
        setState('');
        setZipCode('');
        setErrors('');
    };

    const handleSaveDetails = () => {
        if(validateForm()){
            setLoader(true)
            const studentData = {
                'site_id' : siteId,
                'family_id' : familyId,
                'firstname' : firstName,
                'lastname' : lastName,
                'gender' : gender,
                'status' : status,
                'birthday' : dob,
                'admission_date' : admissionDate,
                'tuition_plan_id' : selectedTuitionPlan,
                'address1' : address,
                'city' : city,
                'state' : state,
                'zipcode' : zipCode,
                'homeroom_id' : selectedClassRoom
            }
            // console.log('Saving details: ---', studentData);

            AddNewStudentApi(studentData)
            .then((result) => {
                if(result.data.status){
                    setLoader(false)
                    setNewStudents(true);
                    Alert.alert('Success', result.data.message, [{
                        text: 'OK',
                        onPress: handleModalClose
                    }]);
                }else{
                    setLoader(false)
                    Alert.alert('Error', result.data.data+' '+result.data.message, [{
                        text: 'OK',
                    }]);
                }
                // console.log('Add New Student Api Result ===', result.data)
            })
            .catch((err) => {
                // console.log('Error', err);
            });
        }
       
    };


    return (
        <>
            { shimmerLoader ? (
                    <View>
                        <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                    </View>
                ) : (
                    <View style={styles.card}>
                        <Text style={styles.title_text}>CHILDREN</Text>
                        {student.length > 0 ? student.map((student) => (
                            <TouchableOpacity
                                key={student.id}
                                style={styles.family_details_card}
                                onPress={() =>
                                    navigation.navigate(Constants.FAMILY_DETAILS, { familyId: student.family_id })
                                }
                            >
                                <Text style={styles.family_details_text}>
                                    {student.firstname} {student.lastname}
                                </Text>
                                <Icon name="angle-right" style={styles.icon} />
                            </TouchableOpacity>
                        )) : <Text style={styles.title_text}>No Students Details Found.</Text> }

                        <View style={styles.divider} />
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={styles.primary_title_text}>Add New Student</Text>
                        </TouchableOpacity>
                    </View>
                )
                
            }
            

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
                        <ScrollView>
                            <View style={styles.form}>
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

                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        Gender<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <CustomDropDownPicker
                                        placeholder="Please Select Gender"
                                        items={genderItems}
                                        value={gender}
                                        setValue={setGender}
                                        zIndex={3000}
                                    />
                                    {errors.gender ? <Text style={styles.error_text}>{errors.gender}</Text> : null}
                                </View>

                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        Status<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <CustomDropDownPicker
                                        placeholder="Please Select Status"
                                        items={statusItems}
                                        value={status}
                                        setValue={setStatus}
                                        zIndex={2000}
                                    />
                                    {errors.status ? <Text style={styles.error_text}>{errors.status}</Text> : null}
                                </View>

                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        Date of Birth<Text style={styles.asterics}>*</Text>
                                    </Text>
                                    <CustomDatePicker label="mm/dd/YYYY" value={dob} onChange={setDob} />
                                    {errors.dob ? <Text style={styles.error_text}>{errors.dob}</Text> : null}
                                </View>

                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>Admission Date <Text style={styles.asterics}>*</Text></Text>
                                    <CustomDatePicker
                                        label="mm/dd/YYYY"
                                        value={admissionDate}
                                        onChange={setAdmissionDate}
                                    />
                                    {errors.admissionDate ? <Text style={styles.error_text}>{errors.admissionDate}</Text> : null}
                                </View>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>Tution Plan <Text style={styles.asterics}>*</Text></Text>
                                    <CustomDropDownPicker
                                        placeholder="Please Select Tuition Plan"
                                        items={tuitionPlans}
                                        value={selectedTuitionPlan}
                                        setValue={setSelectedTuitionPlan}
                                        zIndex={2000}
                                    />
                                    {errors.selectedTuitionPlan ? <Text style={styles.error_text}>{errors.selectedTuitionPlan}</Text> : null}
                                </View>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>Class Room</Text>
                                    <CustomDropDownPicker
                                        placeholder="Please Select Class Room"
                                        items={classRooms}
                                        value={selectedClassRoom}
                                        setValue={setSelectedClassRoom}
                                        zIndex={2000}
                                    />
                                </View>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        Address
                                    </Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder="e.g. John"
                                        placeholderTextColor="#b9b9b9"
                                        value={address}
                                        onChangeText={setAddress}
                                    />
                                </View>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        City
                                    </Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder="e.g. John"
                                        placeholderTextColor="#b9b9b9"
                                        value={city}
                                        onChangeText={setCity}
                                    />
                                </View>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        State
                                    </Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder="e.g. John"
                                        placeholderTextColor="#b9b9b9"
                                        value={state}
                                        onChangeText={setState}
                                    />
                                </View>
                                <View style={styles.form_group}>
                                    <Text style={styles.input_label}>
                                        Zip Code
                                    </Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder="e.g. John"
                                        placeholderTextColor="#b9b9b9"
                                        value={zipCode}
                                        onChangeText={setZipCode}
                                        keyboardType='numeric'
                                    />
                                </View>
                            </View>
                        </ScrollView>

                        {/* Modal Buttons */}
                        <View style={styles.modal_button_container}>
                            <TouchableOpacity style={[styles.button, styles.button_save_details]} onPress={handleSaveDetails} disabled={loader}>
                                <Text style={[styles.textStyle]}>{loader ? 'Adding Student...' : 'Save Details'}</Text>
                                {
                                    loader && (
                                        <ActivityIndicator size="large" color='#2E78FF' animating={loader}/>
                                    )
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.button_close]} onPress={handleModalClose}>
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
       
    )
}

export default StudentDetails;
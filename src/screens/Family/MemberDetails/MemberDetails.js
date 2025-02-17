import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal, KeyboardAvoidingView, Platform, ActivityIndicator, Animated} from 'react-native'
import React,  { useEffect, useState } from 'react'
import GetMemberApi from '../../../api/FamilyApi/Member/GetMemberApi'
import CustomDropDownPicker from '../../../components/CustomDropDownPicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import AddMemberApi from '../../../api/FamilyApi/Member/AddMemberApi';
import ModalComponent from '../../../components/ModalComponent';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import styles from './styles';
import Constants from '../../../Navigation/Constants';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const MemberDetails = ({familyId, siteId, navigation, onFamilyNameFetched}) => {

    // console.log('Family Id in Member Details ----', familyId)

    const memberDetailsRef = React.createRef();

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
    const [newMember, setNewMember] = useState(false);
    const [shimmerLoader, setShimmerLoader] = useState(false);

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

        if(memberDetailsRef.current){
            const memberDetailsAnimated = Animated.stagger(400, [memberDetailsRef.current.getAnimated()]);
            Animated.loop(memberDetailsAnimated).start();
        }

        setShimmerLoader(true)

        GetMemberApi(familyId)
        .then((result) => {
            if (result.status === 200) {
                const fetchedFamilyName = result.data.data[0]?.lastname+"'s Family" || '';
                if (onFamilyNameFetched && typeof onFamilyNameFetched === 'function') {
                    onFamilyNameFetched(fetchedFamilyName);
                }
                setMember(result.data.data.reverse());
                setShimmerLoader(false)
            }
            // console.log('Member Details --', result.data.data);
        })
        .catch((err) => {
            // console.log('Error', err);
            setShimmerLoader(false)
        });
    }, [memberDetailsRef.current, familyId, newMember]);


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
                    setNewMember(true);
                    
                }else{
                    setResponseModalVisible(true)
                    setModalIcon('error');
                    setModalMessage(result.data.message);
                    setShouldNavigate(false)
                    setLoader(false);
                }
            }).catch((err) => {
                // console.log('Error --> ',err);
            });
        }
    }

    const handleResponseModalOnClose = () => {
        setResponseModalVisible(false)
        if(shouldNavigate){
            navigation.navigate(Constants.FAMILY_DETAILS, {familyId, siteId})
            handleModalClose();
        }
    }

    return (
        <>
            { shimmerLoader ? (
                    <View>
                        <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                    </View>
                ) : (
                    <View style={styles.card}>
                        <Text style={styles.title_text}>FAMILY MEMBERS</Text>
                        {member.map((member) => (
                            <TouchableOpacity
                                key={member.id}
                                style={styles.family_details_card}
                                onPress={() =>
                                    navigation.navigate(Constants.FAMILY_DETAILS, { familyId: member.family_id })
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
                )
            }
            

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
                        <ScrollView>
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
                                            keyboardType='numeric'
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
                                            keyboardType='numeric'
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
                                {
                                    loader && (
                                        <ActivityIndicator size="small" color='#2E78FF' animating={loader}/>
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

export default MemberDetails;
import { ImageBackground, Text, TouchableOpacity, Image, View, TextInput, ScrollView, Switch, Modal, ActivityIndicator, Animated, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import CustomMonthYearPicker from '../../../components/CustomMonthYearPicker';
import CreateCustomerProfileApi from '../../../api/BillingApi/CreateCustomerProfileApi';
import AddCreditCardApi from '../../../api/BillingApi/AddCreditCardApi';
import GetCustomerProfileApi from '../../../api/BillingApi/GetCustomerProfileApi';
import TokenManager from '../../../api/TokenManager';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import ModalComponent from '../../../components/ModalComponent';
import DeletePaymentProfileApi from '../../../api/BillingApi/DeletePaymentProfileApi';
import styles from './styles';
import Constants from '../../../Navigation/Constants';

const backgroundImage = require('../../../assets/images/background.png');
const warningImage = require('../../../assets/images/warning.png');
const crediCardBg = require('../../../assets/images/map-bg.jpg');
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


const AutoPay = ({ navigation }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [activeTab, setActiveTab] = useState('ACH');
    const [isShowTab, setShowTab] = useState(false);
    const [isPaymentMethod, setPaymentMethod] = useState(false);
    const [isCrediCard, setCreditCard] = useState(false);
    const [isACH, setACH] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [aNetCustomerProfileId, setANetCustomerProfileId] = useState('');
    const [aNetPaymentProfileId, setANetPaymentProfileId] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [selectedPaymentProfile, setSelectedPaymentProfile] = useState(null);
    const savedCardRef = React.createRef();
    const [shimmerLoading, setShimmerLoading] = useState(true);
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalIcon, setModalIcon] = useState(null);
    const [deletePayMethodModalVisible, setDeletePayMethodModalVisible] = useState(false);
    const [isPaymentMethodDeleted, setIsPaymentMethodDeleted] = useState(false);
    const [deletePaymentMethodLoader, setDeletePaymentMethodLoader] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
    }

    const fetchCustomerProfile = async () => {
        const profileId = await TokenManager.getCustomerProfileId();
        if (profileId) {
            try {
                const customerProfile = await GetCustomerProfileApi({ 'customer_profile_id': profileId })
                if (customerProfile.data && customerProfile.data.data && customerProfile.data.data.profile) {
                    const profileData = customerProfile.data.data.profile;
                    return profileData;
                } else {
                    // console.log("No Customer Profile");
                    return null;
                }
            } catch (error) {
                // console.error("Error fetching customer profile:", error);
                return null;
            }

        }
    }

    useEffect(() => {

        if (savedCardRef.current) {
            const savedPayMethod = Animated.stagger(400, [savedCardRef.current.getAnimated()]);
            Animated.loop(savedPayMethod).start();
        }

        const getProfileData = async () => {
            const profileData = await fetchCustomerProfile();
            if (profileData) {
                if (profileData.paymentProfiles.length > 0) {
                    setPaymentMethod(true);
                } else {
                    setPaymentMethod(false);
                }
                setProfileData(profileData)
                setCreditCard(true);
                setShimmerLoading(false);
                setIsPaymentMethodDeleted(false);

            } else {
                setShimmerLoading(false);
            }

        };

        getProfileData();

    }, [aNetCustomerProfileId, aNetPaymentProfileId, savedCardRef.current, isPaymentMethodDeleted]);

    const [errors, setErrors] = useState({
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCVV: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!cardNumber || !cardNumber.length == 16) {
            newErrors.cardNumber = 'Valid card number is required';
            isValid = false;
        } else {
            newErrors.cardNumber = '';
        }

        if (!cardName) {
            newErrors.cardName = 'Card name is required';
            isValid = false;
        } else {
            newErrors.cardName = '';
        }

        if (!cardExpiry) {
            newErrors.cardExpiry = 'Card expiry is required';
            isValid = false;
        } else {
            newErrors.cardExpiry = '';
        }

        if (!cardCVV) {
            newErrors.cardCVV = 'Card CVV is required';
            isValid = false;
        } else {
            newErrors.cardCVV = '';
        }


        setErrors(newErrors);
        return isValid;
    };

    const addCreditCard = async () => {
        if (validateForm()) {
            setLoader(true);

            try {
                const createProfileResult = await CreateCustomerProfileApi();
                if (createProfileResult.data.status && createProfileResult.data.data) {
                    const customerProfileId = createProfileResult.data.data;
                    setANetCustomerProfileId(customerProfileId)
                    await TokenManager.setCustomerProfileId(customerProfileId);
                    // Add credit card
                    const addCardResult = await AddCreditCardApi({
                        'customer_profile_id': customerProfileId,
                        'card_number': cardNumber.replace(/\s+/g, ''),
                        'expiration_date': cardExpiry,
                        'card_code': cardCVV,
                    });

                    if (addCardResult.status) {
                        // console.log('addCardResult ---> ', addCardResult.data)
                        setANetPaymentProfileId(addCardResult.data.data);
                        setMessageModalVisible(true);
                        setModalIcon('success');
                        setModalMessage('Card Added Successfully');
                        setShowTab(false);
                        setPaymentMethod(true);
                        setCreditCard(true);
                        setLoader(false);
                        setCardNumber('');
                        setCardName('');
                        setCardCVV('');
                        setCardExpiry('');
                    } else {
                        setMessageModalVisible(true);
                        setModalIcon('error');
                        setModalMessage('Oops! Failed to add credit card. Please try again later.');
                        setLoader(false);
                    }
                } else {
                    const customerProfileId = await TokenManager.getCustomerProfileId();
                    if (customerProfileId) {
                        const addCardResult = await AddCreditCardApi({
                            'customer_profile_id': customerProfileId,
                            'card_number': cardNumber.replace(/\s+/g, ''),
                            'expiration_date': cardExpiry,
                            'card_code': cardCVV,
                        });

                        if (addCardResult.status) {
                            setANetPaymentProfileId(addCardResult.data.data);
                            setMessageModalVisible(true);
                            setModalIcon('success');
                            setModalMessage('Card Added Successfully');
                            setShowTab(false);
                            setPaymentMethod(true);
                            setCreditCard(true);
                            setLoader(false);
                            setCardNumber('');
                            setCardName('');
                            setCardCVV('');
                            setCardExpiry('');
                        } else {
                            setLoader(false);
                            setMessageModalVisible(true);
                            setModalIcon('error');
                            setModalMessage('Oops! Failed to add credit card. Please try again later.');
                        }
                    } else {
                        setLoader(false);
                        setMessageModalVisible(true);
                        setModalIcon('error');
                        setModalMessage('Oops! Failed to add credit card. No customer profile found.');
                    }

                }
            } catch (error) {
                // console.log('Response Error --> ', error);
                setMessageModalVisible(true);
                setModalIcon('error');
                setModalMessage('Oops! An error occurred while creating the payment method.');
                setLoader(false);
            }

        }

    };

    const addACH = () => {
        setShowTab(false)
        setPaymentMethod(true)
        setACH(true)
    };

    const closeShowTab = () => {
        const errors = {
            cardNumber: '',
            cardName: '',
            cardExpiry: '',
            cardCVV: ''
        };

        setCardNumber('');
        setCardName('');
        setCardCVV('');
        setCardExpiry('');

        setErrors(errors);
        setShowTab(false)
    }

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const formatCardNumber = (text) => {
        // Remove all spaces
        const cleaned = text.replace(/\s+/g, '');
        // Insert a space every 4 digits
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
        return formatted;
    };

    const handleCardNumberChange = (text) => {
        const formattedText = formatCardNumber(text);
        setCardNumber(formattedText);
    };

    const handleMonthYearChange = (selectedDate) => {
        setCardExpiry(selectedDate); // Receive date in YYYY-MM format from picker
    };

    const handlePaymentProfilePress = (paymentProfile) => {
        setSelectedPaymentProfile(paymentProfile);
        setModalVisible(true); // Show modal
    };

    const closeDeletePayMethodModal = () => {
        setDeletePayMethodModalVisible(false)
    };

    const deletePaymentMethod = async () => {
        try {
            setDeletePaymentMethodLoader(true);
            const result = await DeletePaymentProfileApi({
                'customer_profile_id': profileData.customerProfileId,
                'payment_profile_id': selectedPaymentProfile.paymentProfileId
            });

            if (result.data && result.data.status) {
                setMessageModalVisible(true);
                setModalIcon('success');
                setModalMessage('Payment method deleted successfully');
                setIsPaymentMethodDeleted(true);
                setDeletePaymentMethodLoader(false);
                setDeletePayMethodModalVisible(false);
                handleModalClose();
            } else {
                setMessageModalVisible(true);
                setModalIcon('error');
                setModalMessage(result.data.message);
                setDeletePaymentMethodLoader(false);
            }
        } catch (err) {
            setMessageModalVisible(true);
            setModalIcon('error');
            setModalMessage('Oops! An error occurred while deleting the payment method.')
            setDeletePaymentMethodLoader(false);
        }
    }

    const deletePaymentMethodAlert = () => {
        setDeletePayMethodModalVisible(true)
    }

    const handleMessageModalOnClose = () => {
        setMessageModalVisible(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.image_background}>
                <View style={styles.auto_pay_header}></View>
                <View style={styles.auto_pay_content_container}>
                    <TouchableOpacity onPress={() => navigation.navigate(Constants.BILLING)} style={styles.back_button_container}>
                        <FontAwesome name="long-arrow-alt-left" style={styles.header_icon} />
                    </TouchableOpacity>
                    <View style={styles.card}>
                        <View style={styles.pay_now_header}>
                            <View>
                                <Text style={styles.title_text}>Due Date</Text>
                                <Text style={styles.pay_now_header_text}>-</Text>
                            </View>
                            <View>
                                <Text style={styles.title_text}>Auto Pay</Text>
                                <Text style={styles.pay_now_header_text}>OFF</Text>
                            </View>
                        </View>
                        <View style={styles.currency_exchange_icon_container}>
                            <Icon name="currency-exchange" style={styles.currency_exchange_icon} />
                        </View>
                        <View style={styles.auto_pay_switch}>
                            <View style={styles.auto_pay_title_container}>
                                <Text style={styles.input_title}>Auto Pay</Text>
                                <Text style={styles.payment_method_sub_title}>Turn auto pay on and we will take care of the rest.</Text>
                            </View>
                            <Switch
                                trackColor={{ false: '#797979', true: '#4CAF50' }}
                                thumbColor={isEnabled ? '#2CABE2' : '#c4c4c4'}
                                ios_backgroundColor='#797979'
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={[styles.card, { marginTop: 90, marginLeft: 10, marginRight: 10 }]}>
                        <View style={styles.add_pay_method_container}>
                            <View style={styles.add_pay_method_title_container}>
                                <Text style={styles.title_text}>Saved Payment Methods</Text>
                                {
                                    isPaymentMethod ? (
                                        <View style={styles.auto_pay_details_card}>
                                            <Text style={styles.payment_method_sub_title}>Available Payment Methods</Text>
                                        </View>
                                    ) : (
                                        <View style={styles.auto_pay_details_card}>
                                            <Text style={styles.payment_method_sub_title}>No payment method added</Text>
                                        </View>
                                    )
                                }
                            </View>
                            <View>
                                {
                                    isShowTab ? (
                                        <TouchableOpacity style={[styles.add_new_pay_method]} onPress={closeShowTab}>
                                            <Text style={styles.add_new_pay_method_text}>Cancel</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={[styles.add_new_pay_method]} onPress={() => setShowTab(true)}>
                                            <Text style={styles.add_new_pay_method_text}>Add New</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </View>
                        <View style={styles.available_payment_method_container}>
                            {
                                shimmerLoading ? (
                                    <View style={styles.shimmerContainer}>
                                        <ShimmerPlaceholder ref={savedCardRef} style={styles.shimmerInputPlaceholder} />
                                        <ShimmerPlaceholder ref={savedCardRef} style={styles.shimmerInputPlaceholder} />
                                        <ShimmerPlaceholder ref={savedCardRef} style={styles.shimmerInputPlaceholder} />
                                    </View>
                                ) : (
                                    <ScrollView horizontal>
                                        {isCrediCard && profileData?.paymentProfiles && profileData.paymentProfiles.length > 0 && (
                                            profileData.paymentProfiles.map((paymentProfile, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={[styles.available_payment_method, { overflow: 'hidden' }]}
                                                    onPress={() => handlePaymentProfilePress(paymentProfile)}
                                                >
                                                    <ImageBackground source={crediCardBg} style={{ flex: 1 }}>
                                                        <Icon name="credit-card" style={[styles.icon_medium, styles.available_payment_method_icon, { color: 'white' }]} />
                                                        <Text style={[styles.available_payment_method_text, { color: 'white' }]}>
                                                            {paymentProfile.accountType ?? 'Card'} {paymentProfile.cardNumber.slice(-4)}
                                                        </Text>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            ))
                                        )}

                                        {isACH && (
                                            <TouchableOpacity style={styles.available_payment_method}>
                                                <Icon name="auto-mode" style={[styles.icon_medium, styles.available_payment_method_icon]} />
                                                <Text style={styles.available_payment_method_text}>ACH</Text>
                                            </TouchableOpacity>
                                        )}
                                    </ScrollView>

                                )
                            }



                        </View>
                    </View>

                    {
                        isShowTab && (
                            <View style={styles.add_new_ach_container} alwaysBounceVertical>
                                <View style={styles.tabsContainer}>
                                    <TouchableOpacity
                                        style={[styles.tabButton, activeTab === 'ACH' ? styles.activeTab : styles.inactiveTab]}
                                        onPress={() => setActiveTab('ACH')}
                                    >
                                        <Text style={activeTab === 'ACH' ? styles.input_title : styles.title_text}>Add ACH</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.tabButton, activeTab === 'CreditCard' ? styles.activeTab : styles.inactiveTab]}
                                        onPress={() => setActiveTab('CreditCard')}
                                    >
                                        <Text style={activeTab === 'CreditCard' ? styles.input_title : styles.title_text}>Add Credit Card</Text>
                                    </TouchableOpacity>
                                </View>

                                {activeTab === 'ACH' && (
                                    <View style={styles.card}>
                                        <View style={styles.input_group}>
                                            <Text style={[styles.input_title, { marginBottom: 8 }]}>Account #</Text>
                                            <TextInput style={styles.text_input} placeholder="Account Number" placeholderTextColor='#b9b9b9' />
                                        </View>
                                        <View styles={styles.input_group}>
                                            <Text style={[styles.input_title, { marginBottom: 8 }]}>Routing #</Text>
                                            <TextInput style={styles.text_input} placeholder="Routing Number" placeholderTextColor='#b9b9b9' />
                                        </View>
                                        <TouchableOpacity style={styles.save_btn} onPress={addACH}>
                                            <Text style={styles.save_btn_text}>Save ACH</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}

                                {activeTab === 'CreditCard' && (
                                    <View style={styles.card}>
                                        <View style={styles.input_group}>
                                            <Text style={[styles.input_title, { marginBottom: 8 }]}>Name on Card</Text>
                                            <TextInput style={[styles.text_input, { borderColor: errors.cardName ? 'red' : '#E1F3FB' }]}
                                                placeholder="William J. Sartor"
                                                placeholderTextColor='#b9b9b9'
                                                value={cardName}
                                                onChangeText={(text) => setCardName(text)}
                                            />
                                            {errors.cardName ? <Text style={styles.error_text}>{errors.cardName}</Text> : null}
                                        </View>
                                        <View style={styles.input_group}>
                                            <Text style={[styles.input_title, { marginBottom: 8 }]}>Card Number</Text>
                                            <TextInput style={[styles.text_input, { borderColor: errors.cardNumber ? 'red' : '#E1F3FB' }]}
                                                placeholder="XXXX XXXX XXXX 4214"
                                                placeholderTextColor='#b9b9b9'
                                                keyboardType="number-pad"
                                                maxLength={19}
                                                value={cardNumber}
                                                onChangeText={handleCardNumberChange}
                                            />
                                            {errors.cardNumber ? <Text style={styles.error_text}>{errors.cardNumber}</Text> : null}
                                        </View>
                                        <View style={styles.input_group}>
                                            <Text style={[styles.input_title, { marginBottom: 8 }]}>CVV</Text>
                                            <TextInput style={[styles.text_input, { borderColor: errors.cardCVV ? 'red' : '#E1F3FB' }]}
                                                placeholder="* * *"
                                                placeholderTextColor='#b9b9b9'
                                                keyboardType="number-pad"
                                                maxLength={3}
                                                value={cardCVV}
                                                onChangeText={(text) => setCardCVV(text)}
                                            />
                                            {errors.cardCVV ? <Text style={styles.error_text}>{errors.cardCVV}</Text> : null}
                                        </View>
                                        <View style={styles.input_group}>
                                            <Text style={[styles.input_title, { marginBottom: 8 }]}>Expiration Date</Text>
                                            <CustomMonthYearPicker
                                                label="YYYY-MM"
                                                value={cardExpiry}
                                                onChange={handleMonthYearChange}
                                            />
                                            {errors.cardExpiry ? <Text style={styles.error_text}>{errors.cardExpiry}</Text> : null}
                                        </View>
                                        <TouchableOpacity style={styles.save_btn} onPress={addCreditCard} disabled={loader}>
                                            <Text style={styles.save_btn_text}>{loader ? 'Adding Card...' : 'Save Credit Card'}</Text>
                                            {
                                                loader && (
                                                    <ActivityIndicator size="large" color='#2E78FF' style={styles.activity_indicator} animating={loader} />
                                                )
                                            }

                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        )
                    }
                </ScrollView>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleModalClose}
                >
                    <View style={styles.backdrop}>
                        <View style={styles.modal_view}>
                            <Text style={styles.modal_text}>Saved Payment Method</Text>
                            {selectedPaymentProfile && (
                                <View style={styles.saved_credit_card}>
                                    <ImageBackground source={crediCardBg} style={{ flex: 1, padding: 20 }}>
                                        <View style={styles.credit_card_container}>
                                            <Text style={styles.credit_card_header}>CREDIT</Text>
                                            <Text style={styles.credit_card_header}>CARD</Text>
                                        </View>
                                        <Text style={styles.credit_card_number}>
                                            XXXX XXXX XXXX {selectedPaymentProfile.cardNumber.slice(-4)} {/* Display last 4 digits */}
                                        </Text>
                                        <Text style={styles.credit_card_expiry}>Valid Upto</Text>
                                        <Text style={styles.credit_card_expiry_text}>
                                            {selectedPaymentProfile.expirationDate || 'N/A'} {/* Display expiration date */}
                                        </Text>
                                    </ImageBackground>
                                </View>
                            )}
                            <View style={styles.modal_button_container}>
                                <TouchableOpacity style={[styles.button, styles.button_close]} onPress={handleModalClose}>
                                    <Text style={styles.button_close_text}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.button_delete]} onPress={deletePaymentMethodAlert}>
                                    <Text style={styles.button_delete_text}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={deletePayMethodModalVisible}
                    onRequestClose={closeDeletePayMethodModal}
                >
                    <View style={styles.backdrop}>
                        <View style={styles.modal_view}>
                            <View style={styles.modal_image}>
                                <Image source={warningImage} style={{ maxWidth: 60, maxHeight: 60 }} />
                            </View>
                            <Text style={styles.modal_text}>Are you sure you want to delete this payment method? This action cannot be undone.</Text>
                            <View style={styles.modal_button_container}>
                                <TouchableOpacity style={[styles.button, styles.button_close]} onPress={closeDeletePayMethodModal}>
                                    <Text style={styles.button_close_text}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.button_delete, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} onPress={deletePaymentMethod}>
                                    <Text style={styles.button_delete_text}>{deletePaymentMethodLoader ? 'Please wait...' : 'Delete'}</Text>
                                    {
                                        deletePaymentMethodLoader && (
                                            <ActivityIndicator size="small" color='#2E78FF' animating={deletePaymentMethodLoader} />
                                        )
                                    }
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>

                <ModalComponent
                    modalVisible={messageModalVisible}
                    setModalVisible={setMessageModalVisible}
                    message={modalMessage}
                    onClose={handleMessageModalOnClose}
                    icon={modalIcon}
                />

            </ImageBackground>
        </SafeAreaView>

    );
}

export default AutoPay;
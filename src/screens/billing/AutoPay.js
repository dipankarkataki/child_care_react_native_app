import { ImageBackground, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView, Switch, Modal, ActivityIndicator, Alert, Animated } from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomMonthYearPicker from '../../components/CustomMonthYearPicker';
import CreateCustomerProfileApi from '../../api/BillingApi/CreateCustomerProfileApi';
import AddCreditCardApi from '../../api/BillingApi/AddCreditCardApi';
import GetCustomerProfileApi from '../../api/BillingApi/GetCustomerProfileApi';
import TokenManager from '../../api/TokenManager';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const backgroundImage = require('../../assets/images/background.png');
const dollarImage = require('../../assets/images/dollar-autopay.png');
const crediCardBg = require('../../assets/images/map-bg.jpg');
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

    const toggleSwitch = () =>{
        setIsEnabled(previousState => !previousState)
    }

    const fetchCustomerProfile = async () => {
        const profileId = await TokenManager.getCustomerProfileId();
        if(profileId){
            try{
                const customerProfile = await GetCustomerProfileApi({'customer_profile_id' : profileId})
                if (customerProfile.data && customerProfile.data.data && customerProfile.data.data.profile) {
                    const profileData = customerProfile.data.data.profile;
                    return profileData;
                } else {
                    console.log("No Customer Profile");
                    return null;
                }
            }catch (error) {
                console.error("Error fetching customer profile:", error);
                return null;
            }
            
        }
    } 

    useEffect( () => {

        if (savedCardRef.current) {
            const savedPayMethod = Animated.stagger(400, [savedCardRef.current.getAnimated()]);
            Animated.loop(savedPayMethod).start();
        }

        

        const getProfileData = async () => {
            const profileData = await fetchCustomerProfile();
            console.log('Profile Data --- ', profileData)
            if(profileData){
                setProfileData(profileData)
                setPaymentMethod(true);
                setCreditCard(true);
                setShimmerLoading(false);
            }else{
                setShimmerLoading(false);
            }
            
        };

        getProfileData();
        
    }, [aNetCustomerProfileId, aNetPaymentProfileId, savedCardRef.current]);

    const [errors, setErrors] = useState({
        cardNumber: '',
        cardName: '',
        cardExpiry:'',
        cardCVV:''
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

    const addCreditCard = async () =>{
        if(validateForm()){
            setLoader(true);

            try{
                const createProfileResult = await CreateCustomerProfileApi();
                if (createProfileResult.data.status && createProfileResult.data.data) {
                    const customerProfileId = createProfileResult.data.data;
                    // console.log('Customer Profile Id ----', customerProfileId)
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
                        console.log('addCardResult ---> ', addCardResult.data)
                        setANetPaymentProfileId( addCardResult.data.data);
                        Alert.alert('Success', 'Card Added Successfully', [{
                            text: 'OK',
                            onPress: () => {
                                setShowTab(false);
                                setPaymentMethod(true);
                                setCreditCard(true);
                                setLoader(false);
                                setCardNumber('');
                                setCardName('');
                                setCardCVV('');
                                setCardExpiry('');
                            }
                        }]);
                    }
                }else{
                    const customerProfileId = await TokenManager.getCustomerProfileId();
                    const addCardResult = await AddCreditCardApi({
                        'customer_profile_id': customerProfileId,
                        'card_number': cardNumber.replace(/\s+/g, ''),
                        'expiration_date': cardExpiry,
                        'card_code': cardCVV,
                    });
    
                    if (addCardResult.status) {
                        console.log('addCardResult ---> ', addCardResult.data)
                        setANetPaymentProfileId( addCardResult.data.data);
                        Alert.alert('Success', 'Card Added Successfully', [{
                            text: 'OK',
                            onPress: () => {
                                setShowTab(false);
                                setPaymentMethod(true);
                                setCreditCard(true);
                                setLoader(false);
                                setCardNumber('');
                                setCardName('');
                                setCardCVV('');
                                setCardExpiry('');
                            }
                        }]);
                    }
                }
            }catch(error){
                console.log('Response Error --> ', error);
                setLoader(false); 
            }
            
        }
        
    };

    const addACH= () =>{
        setShowTab(false)
        setPaymentMethod(true)
        setACH(true)
    };

    const closeShowTab = () => {
        const errors = {
            cardNumber: '',
            cardName: '',
            cardExpiry:'',
            cardCVV:''
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

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <View style={styles.auto_pay_header}></View>
            <View style={styles.auto_pay_content_container}>
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
                        <Icon name="currency-exchange" style={styles.currency_exchange_icon}/>
                    </View>
                    <View style={styles.auto_pay_switch}>
                        <View style={styles.auto_pay_title_container}>
                            <Text style={styles.input_title}>Auto Pay</Text>
                            <Text style={styles.payment_method_sub_title}>Turn auto pay on and we will take care of the rest.</Text>
                        </View>
                        <Switch 
                            trackColor={{false:'#797979', true:'#4CAF50'}}
                            thumbColor={isEnabled ? '#2CABE2' : '#c4c4c4'}
                            ios_backgroundColor='#797979'
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />  
                    </View>
                </View>
            </View>
            <View style={[styles.card, {marginTop:90, marginLeft:10, marginRight:10}]}>
                <View style={styles.add_pay_method_container}>
                    <View style={styles.add_pay_method_title_container}>
                        <Text style={styles.title_text}>Saved Payment Methods</Text>
                        {
                            isPaymentMethod ? (
                                <View style={styles.auto_pay_details_card}>
                                    <Text style={styles.payment_method_sub_title}>Available Payment Methods</Text>
                                </View>
                            ):(
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
                            <>
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
                                                    {paymentProfile.accountType} {paymentProfile.cardNumber.slice(-4)}
                                                </Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    ))
                                )}

                                { isACH && (
                                    <TouchableOpacity style={styles.available_payment_method}>
                                        <Icon name="auto-mode" style={[styles.icon_medium, styles.available_payment_method_icon]}/>
                                        <Text style={styles.available_payment_method_text}>ACH</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                                
                        )
                    }
                    
                    
                    
                </View>
            </View>

            {
                isShowTab && (
                    <ScrollView style={styles.add_new_ach_container} alwaysBounceVertical>
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
                                    <Text style={[styles.input_title, {marginBottom:8}]}>Account #</Text>
                                    <TextInput style={styles.text_input} placeholder="Account Number" placeholderTextColor='#b9b9b9' />
                                </View>
                                <View styles={styles.input_group}>
                                    <Text style={[styles.input_title, {marginBottom:8}]}>Routing #</Text>
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
                                    <Text style={[styles.input_title, {marginBottom:8}]}>Name on Card</Text>
                                    <TextInput style={[styles.text_input, { borderColor: errors.cardName ? 'red' : '#E1F3FB' }]} 
                                        placeholder="William J. Sartor" 
                                        placeholderTextColor='#b9b9b9' 
                                        value={cardName}
                                        onChangeText={(text) => setCardName(text)}
                                    />
                                    {errors.cardName ? <Text style={styles.error_text}>{errors.cardName}</Text> : null}
                                </View>
                                <View style={styles.input_group}>
                                    <Text style={[styles.input_title, {marginBottom:8}]}>Card Number</Text>
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
                                    <Text style={[styles.input_title, {marginBottom:8}]}>CVV</Text>
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
                                    <Text style={[styles.input_title, {marginBottom:8}]}>Expiration Date</Text>
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
                                            <ActivityIndicator size="large" color='#2E78FF' style={styles.activity_indicator} animating={loader}/>
                                        )
                                    }
                                    
                                </TouchableOpacity>
                                
                            </View>
                        )}
                    </ScrollView>
                )
            }


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

                                    {/* Display payment profile details */}
                                    <Text style={styles.credit_card_name}>
                                        {profileData.description.split('--')[1].trim() || 'No Name Available'} {/* You can use profile description or cardholder name */}
                                    </Text>
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
                            <TouchableOpacity style={[styles.button, styles.button_delete]} onPress={handleModalClose}>
                                <Text style={styles.button_delete_text}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.button_close]} onPress={handleModalClose}>
                                <Text style={styles.button_close_text}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            
        </ImageBackground>
    );
}

export default AutoPay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    auto_pay_header: {
        height:200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2CABE2',
        borderStyle: 'solid',
        backgroundColor: '#2CABE2',
        padding: 20,
        zIndex: 1,
    },
    auto_pay_revenue_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    small_text: {
        fontSize: 14,
        fontFamily: 'Poppins Regular',
        color: 'white',
        marginBottom: 5,
    },
    icon: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#27ce2f',
        marginRight: 10,
    },
    icon_small: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
    },
    icon_medium: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
    },
    icon_large: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.54)',
        marginRight: 10,
    },
    auto_pay_content_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top:30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        marginBottom: 20,
        zIndex: 2,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        elevation: 2,
        marginBottom: 20,
    },
    text_input_container: {
        marginBottom: 20,
    },
    text_input: {
        backgroundColor: '#F1F6F6',
        fontSize: 17,
        fontFamily: 'Poppins Regular',
        borderRadius: 6,
        paddingLeft: 12,
        color: '#797979',
    },
    input_title: {
        color: 'black',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    input_group:{
        marginBottom:20,
    },
    payment_method_sub_title:{
        color: '#797979',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
        fontWeight:'700'
    },
    auto_pay_details_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:8
    },
    title_text: {
        color: '#797979',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        marginBottom: 10,
    },
    pay_now_header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },pay_now_header_text:{
        color: '#000',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        marginBottom: 16,
        textAlign:'center'
    },
    payment_method_container:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:20
    },
    add_new_ach_container:{
        flex:1,
        paddingLeft: 10,
        paddingRight: 15,
        marginBottom:20,
    },
    auto_pay_switch:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    auto_pay_title_container:{
        width:'80%',
    },
    currency_exchange_icon_container:{
        height:60,
        width:60,
        borderRadius:50,
        backgroundColor:'#E8F2F4',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:16
    },
    currency_exchange_icon:{
        fontSize:40,
        color:'#2CABE2'
    },
    add_pay_method_container:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    add_new_pay_method:{

    },
    add_new_pay_method_text:{
        color:'#2CABE2',
        fontSize:17,
        fontFamily:'Poppins Medium',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomColor: '#2CABE2',
        borderBottomWidth: 2,
    },
    inactiveTab: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
    },
    save_btn: {
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:16,
    },
    save_btn_text: {
        color: '#000000',
        fontSize: 18,
        fontFamily:'Poppins Medium',
        textAlign:'center',
    },
    add_pay_method_title_container:{
    },
    available_payment_method_container:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
        alignItems:'center'
    },
    available_payment_method:{
        borderRadius:10,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:"#d3d3d3",
        height:80,
        width:120,
        backgroundColor:'#f0f0ff',
        marginBottom:10
    },
    available_payment_method_icon:{
        marginLeft:10,
        marginTop:10,
        color:'#003153'
    },
    available_payment_method_text:{
        color:'#525252',
        fontSize:12,
        fontFamily:'Poppins Medium',
        marginTop:5,
        marginLeft:10
    },
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal_view: {
        width: '90%',
        backgroundColor: '#f8f8ff',
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
    modal_text: {
        marginBottom: 30,
        color: '#000',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
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
    button_delete: {
        backgroundColor: 'crimson',
        marginRight:10
    },
    button_delete_text: {
        fontFamily:'Poppins Medium',
        fontSize:14,
        color:'#fff'
    },
    button_close: {
        backgroundColor: '#cdcdcd',
    },
    button_close_text: {
        fontFamily:'Poppins Medium',
        fontSize:14,
        color:'#242124'
    },
    saved_credit_card:{
        height:220,
        borderWidth:1,
        borderColor:'#eee',
        borderStyle:'solid',
        borderRadius:10,
        backgroundColor:'#dcdcdc',
        marginBottom:20,
        overflow: 'hidden'
    },
    credit_card_container:{
        marginBottom:15,
        alignItems:'flex-end'
    },
    credit_card_header:{
        fontFamily:'Poppins Regular',
        fontSize:22,
        color:'#fff',
        marginBottom:-10,
    },
    credit_card_name:{
        fontFamily:'Poppins Regular',
        fontSize:20,
        color:'#fff',
    },
    credit_card_number:{
        fontFamily:'Poppins Regular',
        fontSize:25,
        color:'#fff',
        marginBottom:5
    },
    credit_card_expiry:{
        fontFamily:'Poppins Regular',
        fontSize:12,
        color:'#fff',
    },
    credit_card_expiry_text:{
        fontFamily:'Poppins Regular',
        fontSize:16,
        color:'#fff',
    },
    error_text: {
        color: 'red',
        fontSize: 14,
        marginTop: 5
    },
    shimmerContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    shimmerInputPlaceholder: {
        height: 80,
        marginBottom: 20,
        borderRadius: 6,
        width:120,
        marginRight:10
    },
});

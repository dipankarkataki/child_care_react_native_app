import { ImageBackground, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView, SafeAreaView, Animated, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import styles from './styles';
import Constants from '../../Navigation/Constants';
import GetInvoiceByFamily from '../../api/BillingApi/Invoice/GetInvoiceByFamily';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import GetCustomerProfileApi from '../../api/BillingApi/GetCustomerProfileApi';

const backgroundImage = require('../../assets/images/background.png');
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Billing = ({ navigation }) => {

    const [invoiceTotal, setInvoiceTotal] = useState(0);
    const [invoiceData, setInvoiceData] = useState([]);
    const [invoiceAmount, setInvoiceAmount] = useState(0);
    const [invoiceDescription, setInvoiceDescription] = useState('');
    const [dropdownValue, setDropdownValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [paymentProfile, setPaymentProfile] = useState([]);
    const [paymentProfileDropdown, setPaymentProfileDropdown] = useState(null);
    const [isPaymentDropdownFocus, setIsPaymentDropdownFocus] = useState(false);
    const [selectPaymentType, setSelectPaymentType] = useState(null);
    const [shimmerLoader, setShimmerLoader] = useState(false);
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    const billingDetailsRef = React.createRef();

    const userProfileImage = useSelector((state) => state.profileImage)
    const userProfileData = useSelector((state) => state.userProfileData);

    useEffect(() => {

        if (billingDetailsRef.current) {
            const billingDetailsAnimated = Animated.stagger(400, [billingDetailsRef.current.getAnimated()]);
            Animated.loop(billingDetailsAnimated).start();
        }
        setShimmerLoader(true);

        const getInvoiceByFamily = async () => {
            try {
                const response = await GetInvoiceByFamily(userProfileData.family_id);
                const data = response?.data?.data; // Safely access the nested data

                // Check if data exists and is an array
                if (data && Array.isArray(data) && data.length > 0) {
                    const invoiceTotalAmount = data
                        .reduce((acc, item) => acc + parseFloat(item.amount || 0), 0)
                        .toFixed(2);
                    setInvoiceTotal(invoiceTotalAmount);
                    setInvoiceData(data);
                    setShimmerLoader(false);
                } else {
                    // If data is null, undefined, or an empty array
                    setInvoiceTotal('0.00');
                    setInvoiceData([]);
                }
            } catch (error) {
                console.log("Error fetching invoice data:", error);
                setInvoiceTotal('0.00');
                setInvoiceData([]);
            }
        }
        getInvoiceByFamily();

        const getProfileData = async () => {
            const profileData = await fetchCustomerProfile();
            if (profileData) {
                if (profileData.paymentProfiles.length > 0) {
                    setPaymentProfile(profileData.paymentProfiles);
                } else {
                    setPaymentProfile(null);
                }

            }
        };

        getProfileData();

        
    }, [billingDetailsRef.current]);

    const fetchCustomerProfile = async () => {
        try {
            const customerProfile = await GetCustomerProfileApi({ 'customer_profile_id': userProfileData.aNet_customer_profile_id})
            if (customerProfile.data && customerProfile.data.data && customerProfile.data.data.profile) {
                const profileData = customerProfile.data.data.profile;
                console.log('Customer Payment Profile ---', profileData)
                return profileData;
            } else {
                console.log("No Customer Profile");
                return null;
            }
        } catch (error) {
            console.error("Error fetching customer profile:", error);
            return null;
        }
    }

    const translateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    

    const togglePayNowBottomSheet = () => {
        if (showBottomSheet) {
            // Close the bottom sheet
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: Dimensions.get('window').height, // Slide to bottom
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0, // Fade out
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => setShowBottomSheet(false));
            setDropdownValue(null);
            setInvoiceAmount(0);
            setInvoiceDescription('');
        } else {
            setShowBottomSheet(true);
            // Open the bottom sheet
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0, // Slide to top
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1, // Fade in
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    const renderLabel = () => {
        if (dropdownValue || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: '#797979' }]}>
                    Select Invoice
                </Text>
            );
        }
        return null;
    };

    const renderPaymentProfileLabel = () => {
        if (paymentProfileDropdown || isPaymentDropdownFocus) {
            return (
                <Text style={[styles.label, isPaymentDropdownFocus && { color: '#797979' }]}>
                    Select Payment Profile
                </Text>
            );
        }
        return null;
    };

    const handleDropdownValue = (item) => {
        console.log('Selected Item ---', item.amount);
        setInvoiceAmount(item.amount);
        setDropdownValue(item.id);
        setIsFocus(false);
    };

    const handlePaymentProfileValue = (item) => {
        console.log('Selected Card ---', item);
        setSelectPaymentType(item.paymentProfileId);
        setIsPaymentDropdownFocus(false);
    };

    const comingSoon = () => {
        Alert.alert("Feature Coming Soon! 🚀.", "We're working hard to bring this feature to you. Stay tuned for updates!")
    }

    console.log('Customer Profile Id ---', userProfileData.aNet_customer_profile_id)

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.image_background}>
                {
                    shimmerLoader ? (
                        <View style={styles.shimmerContainer}>
                            <View style={styles.shimmerHeaderContainer}>
                                <ShimmerPlaceholder style={styles.shimmerHeaderPlaceholder} />
                            </View>
                            <ShimmerPlaceholder style={styles.shimmerBoxPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerBoxPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
                        </View>
                    ) : (
                        <>
                            <View style={styles.header_container}>
                                <TouchableOpacity onPress={() => navigation.navigate(Constants.DASHBOARD)}>
                                    <Icon name="long-arrow-alt-left" style={styles.header_icon} />
                                </TouchableOpacity>
                                <Text style={styles.header_text}>Billing</Text>
                                <TouchableOpacity onPress={() => navigation.navigate(Constants.PROFILE_SETTINGS)}>
                                    <Image source={userProfileImage} style={styles.user_avatar} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.billing_header}>
                                <View style={styles.billing_revenue_container}>
                                    <Icon name='plus' style={styles.icon} />
                                    <Text style={styles.balance}>${invoiceTotal}</Text>
                                </View>
                                <Text style={styles.small_text}>Due Amount</Text>
                            </View>
                            <View style={styles.billing_content_container}>
                                <View style={styles.card}>
                                    <View style={styles.pay_now_header}>
                                        <View>
                                            <Text style={styles.title_text}>Due Date</Text>
                                            <Text style={styles.pay_now_header_text}>MM/DD/YYYY</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.title_text}>Auto Pay</Text>
                                            <Text style={styles.pay_now_header_text}>OFF</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.pay_now_btn} onPress={togglePayNowBottomSheet}>
                                        <Text style={styles.pay_now_btn_text}>Pay Now</Text>
                                    </TouchableOpacity>
                                    <View style={styles.payment_method_container}>
                                        <Icon name='credit-card' style={styles.icon_large} />
                                        <TouchableOpacity onPress={() => navigation.navigate(Constants.AUTO_PAY)}>
                                            {
                                                userProfileData.aNet_customer_profile_id ? (
                                                    <View>
                                                        <Text style={[styles.payment_method_title, { color: 'teal' }]}>Payment Method Available</Text>
                                                        <Text style={styles.payment_method_sub_title}>Tap here to check</Text>
                                                    </View>
                                                ) : (
                                                    <View>
                                                        <Text style={[styles.payment_method_title, { color: 'crimson' }]}>No Payment method found!</Text>
                                                        <Text style={styles.payment_method_sub_title}>Tap here and add one</Text>
                                                    </View>
                                                )
                                            }

                                        </TouchableOpacity>
                                        <Icon name='angle-right' style={styles.icon_small} />
                                    </View>
                                </View>
                            </View>
                            <ScrollView style={styles.statements_container} alwaysBounceVertical>
                                <View style={styles.card}>
                                    <Text style={styles.title_text}>Account Summary</Text>
                                    <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate(Constants.BILLING)}>
                                        <View>
                                            <Text style={styles.input_title}>Statement Balance (Aug 12)</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.payment_method_sub_title}>Details</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.input_title}>-$1500</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate(Constants.BILLING)}>
                                        <View>
                                            <Text style={styles.input_title}>Payments And Credits</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.payment_method_sub_title}>Details</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.input_title}>$800</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate(Constants.BILLING)}>
                                        <View>
                                            <Text style={styles.input_title}>Recent Charges</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.payment_method_sub_title}>Details</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.input_title}>$0</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.card}>
                                    <Text style={styles.title_text}>Recent Activity</Text>
                                    <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate(Constants.BILLING)}>
                                        <Text style={styles.input_title}>No recent activity found.</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.card}>
                                    <Text style={styles.title_text}>Statements</Text>
                                    <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate(Constants.BILLING)}>
                                        <View>
                                            <Text style={styles.input_title}>-$1500</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.payment_method_sub_title}>August 12, 2024</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Icon name="angle-right" style={styles.input_title} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate(Constants.BILLING)}>
                                        <View>
                                            <Text style={styles.input_title}>-$2000</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.payment_method_sub_title}>August 13, 2024</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Icon name="angle-right" style={styles.input_title} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate(Constants.BILLING)}>
                                        <View>
                                            <Text style={styles.input_title}>-$100</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.payment_method_sub_title}>August 14, 2024</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Icon name="angle-right" style={styles.input_title} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate(Constants.BILLING)}>
                                        <View>
                                            <Text style={styles.input_title}>-$25000</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.payment_method_sub_title}>August 15, 2024</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Icon name="angle-right" style={styles.input_title} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate(Constants.BILLING)}>
                                        <View>
                                            <Text style={styles.input_title}>-$10000</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.payment_method_sub_title}>August 16, 2024</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Icon name="angle-right" style={styles.input_title} />
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </>
                    )
                }

                {
                    showBottomSheet && (
                        <Animated.View style={[styles.pay_now_bottom_sheet_container, { opacity }]}>
                            <Animated.View style={[styles.bottom_sheet_card, { transform: [{ translateY }] }]}>
                                <Text style={styles.pay_now_header_text}> Select invoice and make payment</Text>
                                <Text style={[styles.title_text, {marginBottom: 0, paddingBottom: 0}]}>Select Invoice</Text>
                                <View style={styles.select_invoice_container}>
                                    <View style={styles.dropdown_container}>
                                        {renderLabel()}
                                        <Dropdown
                                            style={[styles.dropdown, isFocus && { borderWidth: 0.5, borderColor: 'rgba(158, 158, 158, 0.6)' }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={invoiceData}
                                            itemTextStyle={{ color: '#797979' }}
                                            maxHeight={300}
                                            labelField="name"
                                            valueField="id"
                                            placeholder={!isFocus ? 'Select Invoice' : '...'}
                                            searchPlaceholder="Search..."
                                            value={dropdownValue}
                                            onFocus={() => setIsFocus(true)}
                                            onBlur={() => setIsFocus(false)}
                                            onChange={item => handleDropdownValue(item)}
                                        />
                                    </View>

                                    <View style={styles.text_input_container}>
                                        <Text style={styles.title_text}>Amount</Text>
                                        <View style={[styles.text_input, { backgroundColor: 'rgba(225, 243, 251, 0.7)', borderColor: 'rgba(158, 158, 158, 0.6)' }]}>
                                            <TextInput
                                                placeholder="$0.00"
                                                placeholderTextColor="#b9b9b9"
                                                value={"$" + invoiceAmount}
                                                readOnly={true}
                                                style={styles.text_input_style}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.text_input_container}>
                                        <Text style={styles.title_text}>Enter Description</Text>
                                        <View style={[styles.text_input]}>
                                            <TextInput
                                                placeholder="Type here...."
                                                placeholderTextColor="#b9b9b9"
                                                style={styles.text_input_style}
                                                multiline={true}
                                                value={invoiceDescription}
                                                onChangeText={(text) => setInvoiceDescription(text)}
                                            />
                                        </View>
                                    </View>
                                    <Text style={[styles.title_text, {marginBottom: 0, paddingBottom: 0}]}>Select Payment Profile</Text>
                                    <View style={styles.dropdown_container}>
                                        {renderPaymentProfileLabel()}
                                        <Dropdown
                                            style={[styles.dropdown, isPaymentDropdownFocus && { borderWidth: 0.5, borderColor: 'rgba(158, 158, 158, 0.6)' }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={paymentProfile}
                                            itemTextStyle={{ color: '#797979' }}
                                            maxHeight={300}
                                            labelField="cardNumber"
                                            valueField="paymentProfileId"
                                            placeholder={!isPaymentDropdownFocus ? 'Select Payment Profile' : '...'}
                                            searchPlaceholder="Search..."
                                            value={paymentProfileDropdown}
                                            onFocus={() => setIsPaymentDropdownFocus(true)}
                                            onBlur={() => setIsPaymentDropdownFocus(false)}
                                            onChange={item => handlePaymentProfileValue(item)}
                                        />
                                    </View>

                                    <TouchableOpacity style={[styles.pay_now_btn, { marginVertical: 10 }]} onPress={comingSoon}>
                                        <Text style={styles.pay_now_btn_text}>Complete Transaction</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={togglePayNowBottomSheet}>
                                        <Text style={[styles.title_text, { textAlign: 'center' }]}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        </Animated.View>
                    )
                }

            </ImageBackground>
        </SafeAreaView>

    );
}

export default Billing;

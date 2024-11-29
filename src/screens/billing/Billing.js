import { ImageBackground, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView, SafeAreaView, Animated, Dimensions, Alert} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import TokenManager from '../../api/TokenManager';
import { useSelector } from 'react-redux';

const backgroundImage = require('../../assets/images/background.png');

const Billing = ({ navigation }) => {

    const [customerProfileId, setCustomerProfileId] = useState(null);
    const getCustomerProfileId = async () => {
        const profileId = await TokenManager.getCustomerProfileId();
        setCustomerProfileId(profileId);
    }
    getCustomerProfileId();

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const translateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const userProfileImage = useSelector((state) => state.profileImageReducer)

    // const togglePayNowBottomSheet = () => {
    //     setShowBottomSheet( (previousState) => !previousState)
    // }

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

    const comingSoon = () => {
        Alert.alert("Feature Coming Soon! 🚀.", "We're working hard to bring this feature to you. Stay tuned for updates!")
    }

    console.log('Customer Profile Id ---', customerProfileId)

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.image_background}>
                <View style={styles.header_container}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                        <Icon name="long-arrow-alt-left" style={styles.header_icon} />
                    </TouchableOpacity>
                    <Text style={styles.header_text}>Billing</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
                    <Image  source={userProfileImage}  style={styles.user_avatar} />
                    </TouchableOpacity>
                </View>
                <View style={styles.billing_header}>
                    <View style={styles.billing_revenue_container}>
                        <Icon name='plus' style={styles.icon}/>
                        <Text style={styles.balance}>$2,2200.00</Text>
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
                            <TouchableOpacity onPress={() => navigation.navigate('AutoPay')}>
                                {
                                    customerProfileId ? (
                                        <View>
                                            <Text style={[styles.payment_method_title, {color:'teal'}]}>Payment Method Available</Text>
                                            <Text style={styles.payment_method_sub_title}>Tap here to check</Text>
                                        </View>
                                    ) : (
                                        <View>
                                            <Text style={[styles.payment_method_title, {color:'crimson'}]}>No Payment method found!</Text>
                                            <Text style={styles.payment_method_sub_title}>Tap here and add one</Text>
                                        </View>
                                    )
                                }
                            
                            </TouchableOpacity>
                            <Icon name='angle-right' style={styles.icon_small}/>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.statements_container} alwaysBounceVertical>
                    <View style={styles.card}>
                        <Text style={styles.title_text}>Account Summary</Text>
                        <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate('Billing')}>
                            <View>
                                <Text style={styles.input_title}>Statement Balance (Aug 12)</Text>
                                <TouchableOpacity>
                                    <Text style={styles.payment_method_sub_title}>Details</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.input_title}>-$1500</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate('Billing')}>
                            <View>
                                <Text style={styles.input_title}>Payments And Credits</Text>
                                <TouchableOpacity>
                                    <Text style={styles.payment_method_sub_title}>Details</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.input_title}>$800</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate('Billing')}>
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
                        <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate('Billing')}>
                            <Text style={styles.input_title}>No recent activity found.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.title_text}>Statements</Text>
                        <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate('Billing')}>
                            <View>
                                <Text style={styles.input_title}>-$1500</Text>
                                <TouchableOpacity>
                                    <Text style={styles.payment_method_sub_title}>August 12, 2024</Text>
                                </TouchableOpacity>
                            </View>
                            <Icon name="angle-right" style={styles.input_title} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate('Billing')}>
                            <View>
                                <Text style={styles.input_title}>-$2000</Text>
                                <TouchableOpacity>
                                    <Text style={styles.payment_method_sub_title}>August 13, 2024</Text>
                                </TouchableOpacity>
                            </View>
                            <Icon name="angle-right" style={styles.input_title} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate('Billing')}>
                            <View>
                                <Text style={styles.input_title}>-$100</Text>
                                <TouchableOpacity>
                                    <Text style={styles.payment_method_sub_title}>August 14, 2024</Text>
                                </TouchableOpacity>
                            </View>
                            <Icon name="angle-right" style={styles.input_title} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate('Billing')}>
                            <View>
                                <Text style={styles.input_title}>-$25000</Text>
                                <TouchableOpacity>
                                    <Text style={styles.payment_method_sub_title}>August 15, 2024</Text>
                                </TouchableOpacity>
                            </View>
                            <Icon name="angle-right" style={styles.input_title} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.billing_details_card} onPress={() => navigation.navigate('Billing')}>
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
                {
                    showBottomSheet && (
                        <Animated.View style={[styles.pay_now_bottom_sheet_container, { opacity }]}>
                            <Animated.View style={[styles.bottom_sheet_card, { transform: [{ translateY }] }]}>
                                <Text style={styles.pay_now_header_text}> Select invoice and make payment</Text>
                                <View style={styles.select_invoice_container}>
                                    <View style={styles.text_input_container}>
                                        <Text style={styles.title_text}>Select Invoice</Text>
                                        <View style={[styles.text_input, { borderColor: '#E1F3FB', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }]}>
                                            <TextInput
                                                placeholder="Invoice No - 12F8"
                                                placeholderTextColor="#b9b9b9"
                                                readOnly
                                            />
                                            <Icon name="caret-down" size={20} color="#888" style={[styles.icon, {color:'#000'}]} />
                                        </View>
                                    </View>

                                    <View style={styles.text_input_container}>
                                        <Text style={styles.title_text}>Enter Amount</Text>
                                        <View style={[styles.text_input, { borderColor: '#E1F3FB'}]}>
                                            <TextInput
                                                placeholder="$300"
                                                placeholderTextColor="#b9b9b9"
                                                readOnly
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.text_input_container}>
                                        <Text style={styles.title_text}>Select Payment Type</Text>
                                        <View style={[styles.text_input, { borderColor: '#E1F3FB', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }]}>
                                            <TextInput
                                                placeholder="Credit Card"
                                                placeholderTextColor="#b9b9b9"
                                                readOnly
                                            />
                                            <Icon name="caret-down" size={20} color="#888" style={[styles.icon, {color:'#000'}]} />
                                        </View>
                                    </View>

                                    <TouchableOpacity style={[styles.pay_now_btn, {marginVertical:10}]} onPress={comingSoon}>
                                        <Text style={styles.pay_now_btn_text}>Complete Transaction</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={{marginVertical:5}} onPress={togglePayNowBottomSheet}>
                                        <Text style={[styles.title_text, {textAlign:'center'}]}>Close</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background:{
        flex:1,
    },
    header_container:{
        height:60,
        backgroundColor:'#2CABE2',
        elevation:5,
        borderWidth:1,
        borderColor:'#2CABE2',
        paddingHorizontal:20,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    header_text:{
        color:'#fff',
        fontFamily:'Poppins Medium',
        fontSize:20,
    },
    header_icon:{
        fontSize: 20,
        color: '#fff',
    },
    user_avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white'
    },
    billing_header: {
        height:180,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2CABE2',
        borderStyle: 'solid',
        backgroundColor: '#2CABE2',
        padding: 20,
        zIndex: 1,
    },
    billing_revenue_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    balance: {
        fontSize: 35,
        fontFamily: 'Poppins Medium',
        color: 'white',
    },
    small_text: {
        fontSize: 16,
        fontFamily: 'Poppins Regular',
        color: '#fff',
        marginBottom: 5,
    },
    icon: {
        fontSize: 20,
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
    icon_large: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.54)',
        marginRight: 10,
    },
    billing_content_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top:200,
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
    payment_method_title:{
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
    },
    payment_method_sub_title:{
        color: '#797979',
        fontSize: 14,
        fontFamily: 'Poppins Medium',
    },
    billing_details_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:8
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
    pay_now_btn:{
        flexDirection:'row',
        backgroundColor: '#FFB52E',
        borderRadius: 10,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pay_now_btn_text:{
        color: '#000000',
        fontSize: 20,
        marginLeft:0,
        fontFamily:'Poppins Medium',
    },
    payment_method_container:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:20
    },
    statements_container:{
        flex:1,
        marginTop:205,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop:10,
        marginBottom:10
    },
    pay_now_bottom_sheet_container:{
        flex:1,
        position:'absolute',
        top:0,
        zIndex:3,
        height:'100%',
        width:'100%',
        backgroundColor:'rgba(0,0,0,0.4)'
    },
    bottom_sheet_card:{
        position:'absolute',
        zIndex:4,
        bottom:0,
        left:0,
        right:0,
        maxHeight:600,
        backgroundColor:'#fff',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        paddingHorizontal:20,
        paddingVertical:20,
    }
});

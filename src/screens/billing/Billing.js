import { ImageBackground, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import TokenManager from '../../api/TokenManager';
import UrlProvider from '../../api/UrlProvider';

const backgroundImage = require('../../assets/images/background.png');
const userAvatar = require('../../assets/images/profile-image.png')

const Billing = ({ navigation }) => {

    const customerProfileId = TokenManager.getCustomerProfileId();
    const [userProfileImage, setUserProfileImage] = useState(null);

    useEffect(() => {
        const profileImage = async () => {
            const image = await TokenManager.getUserProfileImage();
            setUserProfileImage(UrlProvider.asset_url_local+'/'+image)
        }
        profileImage();
    }, [])

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <View style={styles.header_container}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Icon name="long-arrow-alt-left" style={styles.header_icon} />
                </TouchableOpacity>
                <Text style={styles.header_text}>Billing</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
                <Image  source={userProfileImage ? { uri: userProfileImage } : userAvatar}  style={styles.user_avatar} />
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
                    <TouchableOpacity style={styles.pay_now_btn}>
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
        </ImageBackground>
    );
}

export default Billing;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header_container:{
        height:60,
        backgroundColor:'#2CABE2',
        elevation:5,
        borderWidth:1,
        borderBottomColor:'#87ceeb',
        paddingHorizontal:20,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
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
        fontSize: 50,
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
});

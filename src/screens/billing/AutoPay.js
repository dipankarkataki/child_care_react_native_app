import { ImageBackground, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView, Switch } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

const backgroundImage = require('../../assets/images/background.png');
const dollarImage = require('../../assets/images/dollar-autopay.png');

const AutoPay = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [activeTab, setActiveTab] = useState('ACH');
    const [isShowTab, setShowTab] = useState(false)


    const toggleSwitch = () =>{
        setIsEnabled(previousState => !previousState)
    }

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
                        <View>
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
            <View style={[styles.card, styles.add_pay_mentod_container]}>
                <View>
                    <Text style={styles.title_text}>Saved Payment Methods</Text>
                    <TouchableOpacity style={styles.auto_pay_details_card}>
                        <Text style={styles.payment_method_sub_title}>No payment method added</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[styles.add_new_pay_method, isShowTab ? styles.hideTab : styles.showTab]} onPress={() => setShowTab(true)}>
                        <Text style={styles.add_new_pay_method_text}>Add New</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.add_new_pay_method, isShowTab ? styles.showTab : styles.hideTab]} onPress={() => setShowTab(false)}>
                        <Text style={styles.add_new_pay_method_text}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={[styles.add_new_ach_container, isShowTab ? styles.showTab : styles.hideTab]} alwaysBounceVertical>
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
                        <TouchableOpacity style={styles.save_btn} >
                            <Text style={styles.save_btn_text}>Save ACH</Text>
                        </TouchableOpacity>
                        
                    </View>
                )}

                {activeTab === 'CreditCard' && (
                    <View style={styles.card}>
                        <View style={styles.input_group}>
                            <Text style={[styles.input_title, {marginBottom:8}]}>Card Number</Text>
                            <TextInput style={styles.text_input} placeholder="4214 4214 4214 4214" placeholderTextColor='#b9b9b9' />
                        </View>
                        <View style={styles.input_group}>
                            <Text style={[styles.input_title, {marginBottom:8}]}>Name on Card</Text>
                            <TextInput style={styles.text_input} placeholder="William J. Sartor" placeholderTextColor='#b9b9b9' />
                        </View>
                        <View style={styles.input_group}>
                            <Text style={[styles.input_title, {marginBottom:8}]}>CVV</Text>
                            <TextInput style={styles.text_input} placeholder="* * *" placeholderTextColor='#b9b9b9' />
                        </View>
                        <View style={styles.input_group}>
                            <Text style={[styles.input_title, {marginBottom:8}]}>Expiration Date</Text>
                            <TextInput style={styles.text_input} placeholder="2028" placeholderTextColor='#b9b9b9' />
                        </View>
                        <TouchableOpacity style={styles.save_btn} >
                            <Text style={styles.save_btn_text}>Save Credit Card</Text>
                        </TouchableOpacity>
                        
                    </View>
                )}
            </ScrollView>
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
        paddingRight: 13,
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
        width:'90%'
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
        justifyContent:'center',
        alignItems:'center',
    },
    currency_exchange_icon_container:{
        height:80,
        width:80,
        borderRadius:50,
        backgroundColor:'#E8F2F4',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:16
    },
    currency_exchange_icon:{
        fontSize:50,
        color:'#2CABE2'
    },
    add_pay_mentod_container:{
        marginTop:120,
        marginLeft:10,
        marginRight:15,
        flexDirection:'row',
        justifyContent:'center',
        paddingLeft:30,
        paddingRight:30
    },
    add_new_pay_method:{

    },
    add_new_pay_method_text:{
        color:'#2CABE2',
        fontSize:17,
        fontFamily:'Poppins Medium'
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
        textAlign:'center'
    },

    showTab:{
        display:'flex'
    },
    hideTab:{
        display:'none'
    }
});

import { FlatList, ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const background = require('../../assets/images/background.png');
const contact1_image = require('../../assets/images/contact1.jpg');
const contact2_image = require('../../assets/images/contact2.jpg');
const contact3_image = require('../../assets/images/contact3.jpg');
const contact4_image = require('../../assets/images/contact4.png');


const NewChat = ({navigation}) => {

    const selectContactArray = [
        {
            id:1,
            name:'Dipankar Kataki',
            user_type: 'Owner',
            profile_image:contact1_image
        },
        {
            id:2,
            name:'Rahul',
            user_type: 'Teacher',
            profile_image:contact2_image
        },
        {
            id:3,
            name:'Sandeep',
            user_type: 'Teacher',
            profile_image:contact3_image
        },
        {
            id:4,
            name:'Jane Doe',
            user_type: 'Director',
            profile_image:contact4_image
        },
        {
            id:5,
            name:'Jhon Doe',
            user_type: 'Teacher',
            profile_image:contact2_image
        },
        {
            id:6,
            name:'Rahul',
            user_type: 'Teacher',
            profile_image:contact2_image
        },
        {
            id:7,
            name:'Sandeep',
            user_type: 'Teacher',
            profile_image:contact3_image
        },
        {
            id:8,
            name:'Jane Doe',
            user_type: 'Director',
            profile_image:contact4_image
        },
        {
            id:9,
            name:'Jhon Doe',
            user_type: 'Teacher',
            profile_image:contact2_image
        },
        {
            id:10,
            name:'Jhon Doe',
            user_type: 'Teacher',
            profile_image:contact2_image
        },
        
    ];

    return (
        <ImageBackground source={background} style={styles.container}>
            <Text style={[styles.header_title, styles.header_style]}>Contacts on ChildCareSoftware App</Text>
            <FlatList
                data={selectContactArray}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.contact_container} onPress={ () => navigation.navigate('SendMessageArea')}>
                        <Image source={item.profile_image}  style={styles.contact_image}/>
                        <View style={styles.contact_info_container}>
                            <Text style={styles.main_title}>{item.name}</Text>
                            <Text style={styles.sub_title}>Account Type : {item.user_type}</Text>
                        </View>
                    </TouchableOpacity>
                )}      
            />
        </ImageBackground>
    )
}

export default NewChat

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header_style:{
        marginLeft:15,
        marginTop:15,
        marginBottom:20,
    },
    header_title:{
        fontSize:16,
        fontFamily:'Poppins Medium',
        color:'#535353'
    },
    main_title:{
        fontSize:17,
        fontFamily:'Poppins Medium',
        color:'#101618'
    },
    sub_title:{
        fontSize:14,
        fontFamily:'Poppins Medium',
        color:'#101618'
    },
    contact_container:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:10,
        marginBottom:10,
        backgroundColor:'#f5f5f5'
    },
    contact_image:{
        height:60,
        width:60,
        borderRadius:60,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#000',
        elevation:1,
        padding:5
    },
    contact_info_container:{
        marginLeft:20
    }
})
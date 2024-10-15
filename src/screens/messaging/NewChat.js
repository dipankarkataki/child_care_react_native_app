import { FlatList, ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import NewChatApi from '../../api/MessagingApi/NewChatApi';

const background = require('../../assets/images/background.png');
const contact1_image = require('../../assets/images/contact1.jpg');
const contact2_image = require('../../assets/images/contact2.jpg');
const contact3_image = require('../../assets/images/contact3.jpg');
const contact4_image = require('../../assets/images/contact4.png');


const NewChat = ({navigation}) => {

    const [contactList, setContactList] = useState([]);

    useEffect( () => {
        NewChatApi()
        .then((result) => {
            if(result.data.status == true){
                console.log('Contact List ==> ', result.data)
                setContactList(result.data.data)
            }else{
                console.log('Oops! Something went wrong')
            }
            
        })
        .catch((err) => {
            console.log('Error', err);
        });
    }, []);

    const getInitials = (firstname, lastname) => {
        const firstNameInitial = firstname[0]?.charAt(0).toUpperCase() || '';
        const lastNameInitial = lastname[0]?.charAt(0).toUpperCase() || '';
        return firstNameInitial + lastNameInitial;
    }

    const getAccountType = (type) => {
        if(type == 13){
            return 'Parent';
        }else if(type == 31){
            return 'Teacher';
        }else{
            return 'Owner';
        }
    }

    return (
        <ImageBackground source={background} style={styles.container}>
            <Text style={[styles.header_title, styles.header_style]}>Contacts on ChildCareSoftware App</Text>
            <FlatList
                data={contactList}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.contact_container} onPress={ () => navigation.navigate('SendMessageArea', {userId : item.id, userName: item.firstname + ' ' + item.lastname, initials : getInitials(item.firstname, item.lastname), type : getAccountType(item.user_type) })}>
                        <View style={styles.contact_initials_container}>
                            <Text style={styles.contact_initials_text}>{getInitials(item.firstname, item.lastname)}</Text>
                        </View>
                        {
                            item.profile_image ? (
                                <Image source={item.profile_image}  style={styles.contact_image}/>
                            ) : (
                                <View style={styles.contact_info_container}>
                                    <Text style={styles.main_title}>{item.firstname} {item.lastname}</Text>
                                    <Text style={styles.sub_title}>Account : {getAccountType(item.user_type)} </Text>
                                </View>
                            )
                        }
                        
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
        fontSize:12,
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
    },contact_initials_container:{
        height:60,
        width:60,
        borderRadius:60,
        borderWidth:1,
        borderStyle:'dashed',
        borderColor:'#fff',
        elevation:1,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#6a5acd'
    },contact_initials_text:{
        fontSize:18,
        fontFamily:'Poppins Medium',
        color:'#fff'
    }
})
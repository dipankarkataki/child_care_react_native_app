import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal} from 'react-native'
import React,  { useEffect, useState } from 'react'
import MemberApi from '../../api/FamilyApi/MemberApi'
import CustomDropDownPicker from '../../components/CustomDropDownPicker'
import CustomDatePicker from '../../components/CustomDatePicker'
import Icon from 'react-native-vector-icons/FontAwesome';

const MemberDetails = ({familyId, navigation}) => {
    const [member, setMember] = useState([]);

    useEffect(() => {
        MemberApi(familyId)
        .then((result) => {
            if (result.status === 200) {
                setMember(result.data.data);
            }
            console.log('Member Details --', result.data.data);
        })
        .catch((err) => {
            console.log('Error', err);
        });

    }, [familyId]);

    return (
        <>
            <View style={styles.card}>
                <Text style={styles.title_text}>FAMILY MEMBERS</Text>
                {member.map((member) => (
                    <TouchableOpacity
                        key={member.id}
                        style={styles.family_details_card}
                        onPress={() =>
                            navigation.navigate('FamilyDetails', { familyId: member.family_id })
                        }
                    >
                        <Text style={styles.family_details_text}>
                            {member.firstname} {member.lastname}
                        </Text>
                        <Icon name="angle-right" style={styles.icon} />
                    </TouchableOpacity>
                ))}
                <View style={styles.divider} />
                <TouchableOpacity>
                    <Text style={styles.primary_title_text}>Add New Family Member</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default MemberDetails

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    family_content_container: {
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 10,
        marginBottom: 20,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        elevation: 2,
        marginBottom: 20,
    },
    form_group: {
        marginBottom: 16,
    },
    input_label: {
        marginBottom: 8,
        color: '#797979',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
    text_input: {
        borderWidth: 1,
        borderColor: '#E1F3FB',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        fontSize: 17,
        color: '#535353',
        fontFamily: 'Poppins Regular',
    },
    asterics: {
        color: 'crimson',
    },
    family_details_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
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
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#E8F2F4',
        width: '100%',
        marginVertical: 10,
    },
    primary_title_text: {
        color: '#2CABE2',
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        marginBottom: 16,
    },
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal_view: {
        width: '90%',
        backgroundColor: 'white',
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
    button_close: {
        backgroundColor: '#cdcdcd',
    },
    button_save_details: {
        backgroundColor: '#FFB52E',
        marginRight: 10,
    },
    textStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins Regular',
    },
    modal_text: {
        marginBottom: 30,
        color: '#000',
        fontSize: 17,
        fontFamily: 'Poppins Medium',
    },
})
import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomMonthYearPicker = ({ label, value, onChange }) => {
    const [month, setMonth] = useState(value ? new Date(value).getMonth() + 1 : 1);
    const [year, setYear] = useState(value ? new Date(value).getFullYear() : new Date().getFullYear());
    const [showModal, setShowModal] = useState(false);
    const currentMonth = new Date().getMonth() + 1;

    const formatDate = () => `${year}-${month.toString().padStart(2, '0')}`;

    const handleConfirm = () => {
        setShowModal(false);
        onChange(formatDate());
    };

    return (
        <View style={{ marginBottom: 16 }}>
            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: '#E1F3FB',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#F1F6F6',
                    fontSize: 17,
                    color: '#535353',
                }}
                placeholder={label}
                placeholderTextColor="#b9b9b9"
                value={value}
                onFocus={() => setShowModal(true)}
                showSoftInputOnFocus={false}
            />

            {showModal && (
                <Modal transparent={true} animationType="slide" visible={showModal}>
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10 }}>
                            <Text style={{color:'black'}}>Select Month</Text>
                            
                            {/* Month Picker */}
                            <Picker
                                style={{backgroundColor:'black', marginTop:10, marginBottom:20}}
                                selectedValue={month}
                                onValueChange={(itemValue) => setMonth(itemValue)}>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                    <Picker.Item key={m} label={m.toString()} value={m} enabled={m >= currentMonth} />
                                ))}
                            </Picker>

                            {/* Year Picker */}
                            <Text style={{color:'black'}}>Select Year</Text>
                            <Picker
                                style={{backgroundColor:'black', marginTop:10, marginBottom:10}}
                                selectedValue={year}
                                onValueChange={(itemValue) => setYear(itemValue)}>
                                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                                    <Picker.Item key={y} label={y.toString()} value={y}/>
                                ))}
                            </Picker>

                            <TouchableOpacity onPress={handleConfirm} style={{borderWidth:1,borderColor:'blue', borderStyle:'solid', borderRadius:10,  justifyContent:'center', alignItems:'center', padding:10, marginTop:10}}>
                                <Text style={{ color: 'blue', textAlign: 'center', fontSize:18}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default CustomMonthYearPicker;

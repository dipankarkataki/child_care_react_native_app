import { StyleSheet, Text, View, TextInput, Platform } from 'react-native'
import React,{useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({ label, value, onChange }) => {

    const [date, setDate] = useState(value ? new Date(value) : new Date());
    const [show, setShow] = useState(false);
    const showDatepicker = () => {
        setShow(true);
    };

    const handleChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        onChange(formatDate(currentDate));
    };

    const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    return (
        <View style={{ marginBottom: 16 }}>
            <TextInput
            style={{
                borderWidth: 1,
                borderColor: '#E1F3FB',
                borderRadius: 10,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
                fontSize: 17,
                color: '#535353',
            }}
            placeholder={label}
            placeholderTextColor="#b9b9b9"
            value={value}
            onFocus={showDatepicker}
            showSoftInputOnFocus={false} // Prevents keyboard from appearing
            />
            {show && (
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleChange}
            />
            )}
        </View>
    )
}

export default CustomDatePicker

const styles = StyleSheet.create({})
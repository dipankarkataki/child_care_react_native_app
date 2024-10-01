// components/CustomDropDownPicker.js
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet } from 'react-native';

const CustomDropDownPicker = ({
  label,
  items,
  value,
  setValue,
  placeholder,
  dropDownDirection = 'AUTO',
  containerStyle = {},
  style = {},
  dropDownContainerStyle = {},
  zIndex = 1000, // Default zIndex
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.container, { zIndex }, containerStyle]}>
      <DropDownPicker
        placeholder={placeholder}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={() => {}} // Required prop, but items are static
        style={{
          borderColor: '#E1F3FB',
          borderRadius: 10,
          backgroundColor: '#fff',
          ...style,
        }}
        dropDownContainerStyle={{
          borderColor: '#E1F3FB',
          ...dropDownContainerStyle,
        }}
        placeholderStyle={{
          color: '#b9b9b9',
        }}
        autoScroll
        dropDownDirection={dropDownDirection}
        // Add this to prevent the dropdown from being constrained by parent ScrollView
        listMode="SCROLLVIEW" // Alternatively, "MODAL" or "FLATLIST"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    // zIndex is dynamically set via props
  },
});

export default CustomDropDownPicker;

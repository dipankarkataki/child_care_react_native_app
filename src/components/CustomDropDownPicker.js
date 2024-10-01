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
        setItems={() => {}}
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
        listMode="MODAL" // Alternatively, "MODAL" or "FLATLIST"
        modalContentContainerStyle={[
          styles.modal_view,
        ]}
      />
    </View>
  );
};

export default CustomDropDownPicker;

const styles = StyleSheet.create({
  modal_view: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
  },
});

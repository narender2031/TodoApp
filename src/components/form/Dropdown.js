import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {StyleSheet} from 'react-native';

const DropDown = ({updateDropDownValue, data}) => {
  return (
    <RNPickerSelect
      onValueChange={value => updateDropDownValue(value)}
      items={data}
      placeholder={{
        label: 'Select the section',
        value: null,
      }}
      style={styles}
      useNativeAndroidPickerStyle={false}
    />
  );
};

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderRadius: 4,
    paddingRight: 30,
    height: 60,
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 15, // to ensure the text is never behind the icon
  },
});

export default DropDown;

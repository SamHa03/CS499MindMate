import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomCheckBox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={styles.checkboxContainer}
    >
      <Ionicons
        name={value ? 'checkbox' : 'square-outline'}
        size={24}
        color={value ? '#4acfc9' : '#CCC'}
      />
    </TouchableOpacity>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

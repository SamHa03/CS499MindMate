import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomCheckBoxGreen = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={styles.checkboxContainer}
    >
      <Ionicons
        name={value ? 'checkbox' : 'square-outline'}
        size={24}
        color={value ? '#a3b18a' : '#CCC'}
      />
    </TouchableOpacity>
  );
};

export default CustomCheckBoxGreen;

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

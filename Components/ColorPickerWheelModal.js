import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

const ColorPickerWheelModal = ({ visible, currentColor, onClose, onColorSelect }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Pick a Task Color</Text>
          <View style={styles.colorPickerContainer}>
            <ColorPicker
              color={currentColor}
              onColorChangeComplete={(color) => onColorSelect(color)}
              style={{ height: 220, width: 220 }}
            />
          </View>
          <Pressable
            style={styles.modalButton}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Done</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ColorPickerWheelModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
  },
  modalContent: {
    width: "85%",
    maxHeight: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "flex-start", // Space out contents vertically
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  colorPickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 115, // Space between color picker and button
  },
  modalButton: {
    backgroundColor: "#4acfc9",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    width: "60%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

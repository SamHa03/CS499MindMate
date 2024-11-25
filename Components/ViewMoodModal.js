import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ViewMoodModal = ({ visible, onClose, moodEntry, onUpdateNote }) => {
  const [note, setNote] = useState("");

  // Ensure the modal's note matches the selected moodEntry's note
  useEffect(() => {
    if (moodEntry) {
      setNote(moodEntry.note || ""); // Load the note or set it to an empty string
    }
  }, [moodEntry]);

  const handleSave = () => {
    onUpdateNote(note); // Pass the updated note back to the parent
    onClose(); // Close the modal
  };

  if (!moodEntry) return null; // Do not render if no moodEntry is selected

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Mood Details</Text>
          <Text style={styles.moodDetail}>
            <Text style={styles.label}>Time: </Text>
            {new Date(moodEntry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
          <Text style={styles.moodDetail}>
            <Text style={styles.label}>Mood: </Text>
            {moodEntry.mood}
          </Text>
          <Text style={styles.label}>Note:</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            multiline
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  moodDetail: {
    fontSize: 16,
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
  },
  noteInput: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ViewMoodModal;

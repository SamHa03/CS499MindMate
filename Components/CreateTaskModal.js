import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import ColorPickerWheelModal from './ColorPickerWheelModal';
import CustomCheckBoxGreen from './CustomCheckBoxGreen';

const CreateTask = ({ visible, onClose, onSave }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskTime, setTaskTime] = useState('');
  const [taskColor, setTaskColor] = useState('#a3b18a');
  const [isTimeSpecified, setIsTimeSpecified] = useState(false);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const handleSave = () => {
    onSave({
      name: taskName,
      date: taskDate,
      time: isTimeSpecified ? taskTime : null,
      color: taskColor,
      completed: false,
    });
    resetFields();
    onClose();
  };

  const resetFields = () => {
    setTaskName('');
    setTaskDate(new Date().toISOString().split('T')[0]);
    setTaskTime('');
    setTaskColor('#a3b18a');
    setIsTimeSpecified(false);
    setIsColorPickerVisible(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Task</Text>

          {/* Task Name */}
          <TextInput
            placeholder="Task Name"
            placeholderTextColor="#69655E"
            value={taskName}
            onChangeText={setTaskName}
            style={styles.input}
          />

          {/* Select Date */}
          <Text style={styles.modalSubtitle}>Due Date</Text>
          <Calendar
            onDayPress={(day) => setTaskDate(day.dateString)}
            markedDates={{
              [taskDate]: { selected: true, selectedColor: '#4acfc9' },
            }}
          />

          {/* Specify Time */}
          <View style={styles.timeContainer}>
            <Text style={styles.modalSubtitle}>Specific Time?</Text>
            <CustomCheckBoxGreen
              value={isTimeSpecified}
              onValueChange={setIsTimeSpecified}
            />
          </View>
          {isTimeSpecified && (
            <TextInput
              placeholder="HH:MM (24-hour format)"
              placeholderTextColor="#69655E"
              value={taskTime}
              onChangeText={setTaskTime}
              style={styles.input}
            />
          )}

          {/* Select Color */}
          <Pressable
            style={[styles.colorPickerButton, { backgroundColor: taskColor }]}
            onPress={() => setIsColorPickerVisible(true)}
          >
            <Text style={styles.colorPickerButtonText}>Pick a Color</Text>
          </Pressable>
          <ColorPickerWheelModal
            visible={isColorPickerVisible}
            currentColor={taskColor}
            onClose={() => setIsColorPickerVisible(false)}
            onColorSelect={(color) => setTaskColor(color)}
          />

          {/* Buttons */}
          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#f2eee9',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    color: '#69655E',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 3,
    verticalAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  colorPickerButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPickerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#4acfc9',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  button: {
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: '#d4c3b4',
  },
  saveButton: {
    backgroundColor: '#d4c3b4',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

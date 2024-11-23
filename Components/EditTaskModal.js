import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import CustomCheckBox from './CustomCheckBox';
import ColorPickerWheelModal from './ColorPickerWheelModal';

const EditTask = ({ visible, onClose, task, onSave }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskColor, setTaskColor] = useState('#FF0000');
  const [isTimeSpecified, setIsTimeSpecified] = useState(false);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false); // State for color picker modal

  // Update state when task changes
  useEffect(() => {
    if (task) {
      setTaskName(task.name || '');
      setTaskDate(task.date || '');
      setTaskTime(task.time || '');
      setTaskColor(task.color || '#FF0000');
      setIsTimeSpecified(!!task.time);
    }
  }, [task]);

  if (!task) {
    return null; // Render nothing if no task is provided
  }

  const handleSave = () => {
    onSave({
      ...task,
      name: taskName,
      date: taskDate,
      time: isTimeSpecified ? taskTime : null,
      color: taskColor,
    });
    onClose();
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
          <Text style={styles.modalTitle}>Edit Task</Text>

          {/* Task Name */}
          <TextInput
            placeholder="Task Name"
            placeholderTextColor="#69655E"
            value={taskName}
            onChangeText={setTaskName}
            style={styles.input}
          />

          {/* Select Date */}
          <Text style={styles.modalSubtitle}>Select Due Date</Text>
          <Calendar
            onDayPress={(day) => setTaskDate(day.dateString)}
            markedDates={{
              [taskDate]: { selected: true, selectedColor: '#4acfc9' },
            }}
          />

          {/* Select Color */}
          <Text style={styles.modalSubtitle}>Pick Task Color</Text>
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

          {/* Specify Time */}
          <View style={styles.timeContainer}>
            <Text style={styles.modalSubtitle}>Specific Time?</Text>
            <CustomCheckBox
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

export default EditTask;

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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    marginTop: 10,
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
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#CBABD1',
  },
  saveButton: {
    backgroundColor: '#4acfc9',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

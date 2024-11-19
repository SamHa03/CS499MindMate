// TaskScreen.js (ToDoList component)
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ToDoObject from './components/ToDoObject';

export default function TimerScreen({ addTask, tasks, removeTask }) {
  console.log('TaskScreen rendered');

  {/* toDoName is the name of the task, setToDoName is the function to set the name of the task */}
  const [toDoName, setToDoName] = useState('');

  {/* date is the date of the task, setDate is the function to set the date of the task */}
  const [date, setDate] = useState(new Date());
  
  {/* Bringing up the Add New To Do */}
  const [modalVisible, setModalVisible] = useState(false);

  {/* Date Picker Functions */}
  const onChange = (e, selectedDate) => {
    setDate(selectedDate || date);
  };

  {/* Creating a new To Do */}
  function AddToDo() {
    const currentDate = date.toLocaleDateString('en-CA'); // format date as YYYY-MM-DD
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    addTask(currentDate, timeString, toDoName);
    setToDoName('');
    setModalVisible(false);
  }

  {/* Completing a To Do */}
  function completeToDo(index) {
    const currentDate = date.toLocaleDateString('en-CA'); // format date as YYYY-MM-DD
    removeTask(currentDate, index);
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.circleBehind} /> 
      <Text>This is edit / add tasks page.</Text>
    </View>
  );
}

// styling begins here
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#F2EEE9",
    flex: 1,
    alignItems: "center",
  },
  circleBehind: {
    backgroundColor: '#d4c3b4', // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60, // Circle shape
    position: 'absolute',
    bottom: 5, // Makes it jut out above the bottom container
    left: '50%', // Center the circle horizontally
    transform: [{ translateX: -60 }], // Adjust positioning to center it properly
    zIndex: 0, // Ensures the circle is behind the home button
  },
});

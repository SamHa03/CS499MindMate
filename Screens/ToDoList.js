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

export default function TaskScreen({ addTask, tasks, removeTask }) {
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
      <View style={styles.toDoWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {/* Display tasks for today */}
          {
          tasks.map(
            (task, index) => (
            <Pressable key={index} onPress={() => completeToDo(index)}>
                <ToDoObject 
                name={task.name} 
                date={task.date} 
                time={task.time} 
              />
            </Pressable>
          )
        )
          }
        </View>
      </View>

      {/* The the page for creating a new task */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View>
          <Text style={styles.NewToDoTitle}>New Task</Text>
        </View>

        <View style={styles.ToDoOptionWrapper}>
          <Text>Name: </Text>
          <TextInput
          style={styles.TextInput}
            placeholderTextColor={'gray'}
            placeholder={'Name goes here'}
            value={toDoName}
            onChangeText={setToDoName}
          />
        </View>

        <View style={styles.ToDoOptionWrapper}>
          <Text>Due Date: </Text>
          <DateTimePicker
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={onChange}
          />
          <DateTimePicker
            value={date}
            mode={'time'}
            is24Hour={true}
            onChange={onChange}
          />
        </View>

        {/* Done Button for finishing the task */}
        <View style={styles.DoneButtonContainer}>
          <Pressable onPress={AddToDo} style={styles.DoneButtonWrapper}>
            <Text style={styles.DoneButtonText}>Done</Text>
          </Pressable>
        </View>
      </Modal>

      {/*Pulls up the add To Do modal */}
      <View style={styles.AddToDoToListContainer}>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.addToDoButtonText}>Add Task</Text>
        </Pressable>
      </View>
    </View>
  );
}

{/*Style sheets go below */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EEE9',
    
  },
  textInput: {
    width: 250,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
  },
  toDoWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  items: {
    marginTop: 30,
  },

  NewToDoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 80,
    paddingHorizontal: 20,

  },

  ToDoOptionWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderColor: '#C0C0C0',
    borderWidth: 1,
    Width: 250,
    marginBottom: 5,
    flexDirection: 'row',
  },

  ToDoOptionDateWrapper: {

  },

  DoneButtonContainer:{
    flex: 1,
    justifyContent: 'flex-end',
    padding: 50
  },
  DoneButtonWrapper: {
    backgroundColor: '#F194FF',
  },
  DoneButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30
  },

  AddToDoToListContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 50
  },
  addToDoButtonText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 100,
  },

  datePicker:{
    height: 120,
    marginTop:-10,
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
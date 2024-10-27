import React, {useState} from 'react';
import { KeyboardAvoidingView, TextInput, Platform, StyleSheet, Text, View, Pressable, Modal, Button } from 'react-native';
import {useHeaderHeight } from '@react-navigation/elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import ToDoObject from './components/ToDoObject';
import { ScrollView } from 'react-native';

export default function ToDoList() {
  
  {/* To Do Array holds both the name and the due date for the To Do */}
  const [toDoList, setToDoList] = useState([]);

  {/* To Do Name state*/}
  const [toDoName, setToDoName] = useState();
  
  {/*To Do due date state*/}
  const [date, setDate] = useState(new Date());
  
  {/*Bringing up the Add New To Do */}
  const [modalVisible, setModalVisible] = useState(false);

  {/* Date Picker Functions */}
  const onChange =(e, selectedDate) => {
    setDate(selectedDate);
  };

  {/*Creating a new To Do*/}
  function AddToDo(){
    setToDoList([...toDoList, {name: toDoName, dueDate: date.toLocaleDateString()}]); //Adds Name and Due Date to the array
    setDate(new Date());
    setToDoName(null);
  }

  {/*Completing a To Do
    splices a To Do from the array at the given index.
    */}
  function completeToDo(index) {
  let toDoCopy = [...toDoList];
  toDoCopy.splice(index, 1);
  setToDoList(toDoCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.circleBehind} />  
      <View style={styles.toDoWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <ScrollView style={styles.items}>
          {/*Iterates the toDoList taking the name and the Due date to create the To do */}
          {
            toDoList.map((toDo, index) =>{
              return (
                
                <Pressable key={index} onPress={() => completeToDo(index)}>
                  <ToDoObject name={toDo.name} date={toDo.dueDate}/>
                </Pressable>
              )
            })
          }


        </ScrollView>
        
      </View>
      
      {/*The the page for creating a new task */}
      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
      }}>
        <View >
          <Text style={styles.NewToDoTitle}>New To Do</Text>
        </View>
        
        <View style ={styles.ToDoOptionWrapper} >
          <View><Text>Name: </Text></View>
          <View>
            <TextInput 
            placeholderTextColor={'gray'} 
            placeholder={'Name goes here'}
            value={toDoName}
            onChangeText={setToDoName}
            />
          </View>
        </View>

        <Pressable>
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
        </Pressable>

        {/*Done Button for finishing the task */}
        <View style={styles.DoneButtonContainer}>
        <Pressable
          onPress={() => {setModalVisible(!modalVisible); AddToDo(); }}
          style = {styles.DoneButtonWrapper}
          >
            <Text style={styles.DoneButtonText}>Done</Text>
        </Pressable>

        </View>
      </Modal>

      {/*Pulls up the add To Do modal */}
      <View style={styles.AddToDoToListContainer}>
        <Pressable onPress={() => {setModalVisible(!modalVisible); console.log(toDoList) }} >
          <Text style ={styles.addToDoButtonText}>Add To Do</Text>
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

  toDoWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7b7167',
  },

  items: {
    marginTop: 30,
    height: 440,
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
    color: '#7b7167',
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
    backgroundColor: '#d4c3b4',
    width: 120,
    height: 120,
    borderRadius: 60, // Circle shape
    position: 'absolute',
    bottom: 0, // Makes it jut out above the bottom container
    left: '50%', // Center the circle horizontally
    transform: [{ translateX: -60 }], // Adjust positioning to center it properly
    zIndex: 0, // Ensures the circle is behind the home button
  },

});
import React, {useState} from 'react';
import { KeyboardAvoidingView, TextInput, Platform, StyleSheet, Text, View, Pressable, Modal, Button } from 'react-native';
import {useHeaderHeight } from '@react-navigation/elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import ToDoObject from './components/ToDoObject';

export default function ToDoList() {
  
  {/* To Do Test */}
  const [toDoList, setToDoList] = useState([]);

  {/* To Do Name */}
  const [toDoName, setToDoName] = useState();
  
  {/*Date picking for each To Do*/}
  const [date, setDate] = useState(new Date());
  
  {/*Bringing up the Add New To Do */}
  const [modalVisible, setModalVisible] = useState(false);

  {/* Date Picker Functions */}
  const onChange =(e, selectedDate) => {
    setDate(selectedDate);
  };

  {/*Creating a new To Do*/}
  function AddToDo(){
    setToDoList([...toDoList, {name: toDoName, dueDate: date.toLocaleDateString()}])
    setDate(new Date());
    setToDoName(null);
  }

  {/*Completing a To Do*/}
  function completeToDo(index) {
  let toDoCopy = [...toDoList];
  toDoCopy.splice(index, 1);
  setToDoList(toDoCopy);
  }

  


  return (
    <View style={styles.container}>
      <View style={styles.toDoWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {
            toDoList.map((toDo, index) =>{
              return (
                <Pressable key={index} onPress={() => completeToDo(index)}> 
                  <ToDoObject  name={toDo.name} date={toDo.dueDate}/>
                </Pressable>
              )
            })
          }


        </View>
        
      </View>

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



        <View style={styles.DoneButtonContainer}>
        <Pressable
          onPress={() => {setModalVisible(!modalVisible); AddToDo(); }}
          style = {styles.DoneButtonWrapper}
          >
            <Text style={styles.DoneButtonText}>Done</Text>
        </Pressable>

        </View>
      </Modal>

      <View style={styles.AddToDoToListContainer}>
        <Pressable onPress={() => {setModalVisible(!modalVisible); console.log(toDoList) }} >
          <Text style ={styles.addToDoButtonText}>Add To Do</Text>
        </Pressable>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
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
    textAlign: 'center'
  },

  datePicker:{
    height: 120,
    marginTop:-10,
  },

});
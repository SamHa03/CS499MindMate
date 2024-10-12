import React, {useState} from 'react';
import { KeyboardAvoidingView, TextInput, Platform, StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import {useHeaderHeight } from '@react-navigation/elements'
import DatePicker from 'react-native-modern-datepicker'
import ToDoObject from './components/ToDoObject';

export default function ToDoList() {
  const [toDoObject, setToDo] = useState();
  const [ToDoItems, setToDoItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const 

  const AddToDoToList = () => {
    setToDoItems([...ToDoItems, toDoObject])
    setToDo(null);
  }

  const completeToDo = (index) => {
    let itemsCopy = [...ToDoItems];
    itemsCopy.splice(index,1);
    setToDoItems(itemsCopy);
  }



  return (
    <View style={styles.container}>
      {/* Task to do list UI*/}
      <View style={styles.toDoWrapper}>
      
        <View style={styles.items}>
          {/*This is where the taskes will go*/}
          {
            ToDoItems.map((item, index) => {
              return (
              <Pressable key={index} onPress={() => completeToDo(index)}>
                <ToDoObject Text={item}/>
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
        <View
        style={styles.DatePickerStyle}>
          <DatePicker
          mode='calendar'
          selected={date}
          onDateChange={handleChange}
          />

          


        </View>
        
        
        <View style={styles.DoneButtonContainer}>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style = {styles.DoneButtonWrapper}
          >
            <Text style={styles.DoneButtonText}>Done</Text>
        </Pressable>

        </View>
      </Modal>

      <View style={styles.AddToDoToListContainer}>
        <Pressable onPress={() => setModalVisible(!modalVisible)} >
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
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  items: {
    marginTop: 30,
  },

  DatePickerStyle: {

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

});

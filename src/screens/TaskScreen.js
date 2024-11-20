// screens/TaskScreen.js
// Screen for managing tasks with the ability to add, view, and remove tasks

// **Imports**
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FIREBASE_AUTH } from "../config/firebase-config";
import { fetchTasks, addTask, removeTask } from "../helpers/firestore-helpers";

// Styles
import { styles } from "../styles/TaskStyles";

export default function TaskScreen() {
  // **State Variables**
  const [tasks, setTasks] = useState([]); // List of tasks
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [toDoName, setToDoName] = useState(""); // Name of the new task
  const [date, setDate] = useState(new Date()); // Selected date and time for the task
  const [loading, setLoading] = useState(true); // Loading state for task fetching
  const userId = FIREBASE_AUTH.currentUser?.uid; // Current user's UID

  // **Fetch Tasks on Component Mount**
  useEffect(() => {
    if (!userId) return;

    const loadTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await fetchTasks(userId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [userId]);

  // **Add a Task**
  const handleAddTask = async () => {
    if (!userId || !toDoName.trim()) return;

    const newTask = {
      name: toDoName,
      date: date.toLocaleDateString("en-CA"),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      await addTask(userId, newTask);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setModalVisible(false);
      setToDoName("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // **Remove a Task**
  const handleRemoveTask = async (taskId) => {
    try {
      await removeTask(userId, taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  // **Render UI**
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4acfc9" />
      ) : (
        <>
          {/* Modal for Adding Task */}
          <Modal visible={modalVisible} animationType="slide" transparent>
            <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add a New Task</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Task Name"
                  value={toDoName}
                  onChangeText={setToDoName}
                />
                <DateTimePicker
                  value={date}
                  mode="datetime"
                  is24Hour
                  onChange={(event, selectedDate) => setDate(selectedDate || date)}
                />
                <Pressable style={styles.saveButton} onPress={handleAddTask}>
                  <Text style={styles.saveButtonText}>Save Task</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </Modal>

          {/* Task List */}
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <Pressable onLongPress={() => handleRemoveTask(item.id)}>
                <Text style={styles.taskText}>
                  {item.name} ({item.date} at {item.time})
                </Text>
              </Pressable>
            )}
            keyExtractor={(item) => item.id} // Use the unique task ID as the key
            ListEmptyComponent={<Text style={styles.noTaskText}>No tasks available</Text>}
          />

          {/* Add Task Button */}
          <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

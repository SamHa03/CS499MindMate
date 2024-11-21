// Screens/TaskScreen.js
// Screen for managing user tasks: create, view, and toggle task completion.

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import CustomCheckBox from "../Components/CustomCheckBox";
import ColorPicker from "react-native-wheel-color-picker";
import { saveTask, fetchTasks, updateTask } from "../Helpers/firestore-helpers";
import { FIREBASE_AUTH } from "../Config/firebase-config";
import { useFocusEffect } from "@react-navigation/native";

// Styles
import { styles } from "../Styles/TaskStyles";

const TaskScreen = () => {
  // **State Variables**
  const userId = FIREBASE_AUTH.currentUser?.uid; // Firebase user ID
  const [tasks, setTasks] = useState([]); // Task list
  const [isModalVisible, setIsModalVisible] = useState(false); // Task creation modal visibility
  const [newTaskName, setNewTaskName] = useState(""); // New task name
  const [newTaskDate, setNewTaskDate] = useState(""); // New task date
  const [newTaskTime, setNewTaskTime] = useState(""); // New task time
  const [newTaskColor, setNewTaskColor] = useState("#FF0000"); // Default task color
  const [isTimeSpecified, setIsTimeSpecified] = useState(false); // Time specification toggle
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false); // Color picker modal visibility

  // **Fetch Tasks on Focus**
  useFocusEffect(
    useCallback(() => {
      const loadTasks = async () => {
        if (userId) {
          const userTasks = await fetchTasks(userId);
          setTasks(userTasks);
        }
      };
      loadTasks();
    }, [userId])
  );

  // **Add a New Task**
  const addTask = async () => {
    if (newTaskName && newTaskDate && userId) {
      const task = {
        name: newTaskName,
        color: newTaskColor,
        date: newTaskDate,
        time: isTimeSpecified ? newTaskTime : null,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      await saveTask(userId, task); // Save task in Firebase
      const updatedTasks = await fetchTasks(userId); // Refresh task list
      setTasks(updatedTasks);
      resetTaskModal(); // Reset modal fields
    }
  };

  // **Reset Task Creation Modal**
  const resetTaskModal = () => {
    setNewTaskName("");
    setNewTaskDate("");
    setNewTaskTime("");
    setNewTaskColor("#FF0000");
    setIsTimeSpecified(false);
    setIsModalVisible(false);
  };

  // **Toggle Task Completion**
  const toggleTaskCompletion = async (taskId, currentState) => {
    await updateTask(userId, taskId, { completed: !currentState }); // Update Firebase
    const updatedTasks = await fetchTasks(userId); // Refresh task list
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Upcoming Tasks</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={32} color="#4acfc9" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, { backgroundColor: item.color }]}>
            <View style={styles.taskDetails}>
              <Text style={styles.taskName}>{item.name}</Text>
              <Text style={styles.taskDate}>
                {item.date} {item.time ? `@ ${item.time}` : ""}
              </Text>
            </View>
            <CustomCheckBox
              value={item.completed}
              onValueChange={() => toggleTaskCompletion(item.id, item.completed)}
            />
          </View>
        )}
      />

      {/* Task Creation Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Task</Text>
            <TextInput
              placeholder="Task Name"
              placeholderTextColor="#69655E"
              value={newTaskName}
              onChangeText={setNewTaskName}
              style={styles.input}
            />
            <Text style={styles.modalSubtitle}>Select Due Date</Text>
            <Calendar
              onDayPress={(day) => setNewTaskDate(day.dateString)}
              markedDates={{
                [newTaskDate]: { selected: true, selectedColor: "#4acfc9" },
              }}
            />
            <Text style={styles.modalSubtitle}>Pick Task Color</Text>
            <Pressable
              style={[styles.colorPickerButton, { backgroundColor: newTaskColor }]}
              onPress={() => setIsColorPickerVisible(true)}
            >
              <Text style={styles.colorPickerButtonText}>Pick a Color</Text>
            </Pressable>
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
                value={newTaskTime}
                onChangeText={setNewTaskTime}
                style={styles.input}
              />
            )}
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={resetTaskModal}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.addButton]} onPress={addTask}>
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Color Picker Modal */}
      <Modal
        visible={isColorPickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsColorPickerVisible(false)}
      >
        <View style={styles.colorPickerModalContainer}>
          <View style={styles.colorPickerModalContent}>
            <Text style={styles.modalTitle}>Pick a Task Color</Text>
            <ColorPicker
              color={newTaskColor}
              onColorChangeComplete={(color) => setNewTaskColor(color)}
              style={{ height: 200, width: 200 }}
            />
            <Pressable
              style={styles.modalButton}
              onPress={() => setIsColorPickerVisible(false)}
            >
              <Text style={styles.buttonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskScreen;

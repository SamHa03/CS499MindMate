// Screens/TaskScreen.js
// Screen for managing user tasks: create, view, and toggle task completion.

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomCheckBox from "../Components/CustomCheckBox";
import EditTask from "../Components/EditTaskModal";
import CreateTask from "../Components/CreateTaskModal";
import { fetchTasks, updateTask, saveTask } from "../Helpers/firestore-helpers";
import { FIREBASE_AUTH } from "../Config/firebase-config";
import { useFocusEffect } from "@react-navigation/native";

// Styles
import { styles } from "../Styles/TaskStyles";

const TaskScreen = () => {
  const userId = FIREBASE_AUTH.currentUser?.uid; // Firebase user ID
  const [tasks, setTasks] = useState([]); // Task list
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false); // CreateTask modal visibility
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // EditTask modal visibility
  const [selectedTask, setSelectedTask] = useState(null); // Task to edit

  // Fetch tasks from Firebase
  const loadTasks = useCallback(async () => {
    if (userId) {
      const userTasks = await fetchTasks(userId);
      setTasks(userTasks);
    }
  }, [userId]);

  // Fetch tasks whenever the screen gains focus
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  // Toggle task completion
  const toggleTaskCompletion = async (taskId, currentState) => {
    await updateTask(userId, taskId, { completed: !currentState }); // Update Firebase
    loadTasks(); // Refresh tasks
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Upcoming Tasks</Text>
        <TouchableOpacity onPress={() => setIsCreateModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={32} color="#69655E" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item: task }) => (
          <Pressable
            onLongPress={() => {
              setSelectedTask(task);
              setIsEditModalVisible(true);
            }}
          >
            <View style={[styles.taskItem, { backgroundColor: task.color }]}>
              <View style={styles.taskDetails}>
                <Text style={styles.taskName}>{task.name}</Text>
                <Text style={styles.taskDate}>
                  {task.date} {task.time ? `@ ${task.time}` : ""}
                </Text>
              </View>
              <CustomCheckBox
                value={task.completed}
                onValueChange={() =>
                  toggleTaskCompletion(task.id, task.completed)
                }
              />
            </View>
          </Pressable>
        )}
      />

      {/* CreateTask Modal */}
      <CreateTask
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)} // Close modal
        onSave={async (newTask) => {
          await saveTask(userId, newTask); // Save task to Firebase
          loadTasks(); // Refresh tasks
        }}
      />

      {/* EditTask Modal */}
      <EditTask
        visible={isEditModalVisible}
        task={selectedTask}
        onClose={() => setIsEditModalVisible(false)} // Close modal
        onSave={async (updatedTask) => {
          await updateTask(userId, updatedTask.id, updatedTask); // Update task in Firebase
          loadTasks(); // Refresh tasks
        }}
      />
    </View>
  );
};

export default TaskScreen;

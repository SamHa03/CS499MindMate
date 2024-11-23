// Screens/CalendarScreen.js
// Displays a calendar with tasks for selected dates. Users can view, filter, and mark tasks as complete.

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import CustomCheckBox from "../Components/CustomCheckBox";
import EditTask from '../Components/EditTaskModal';
import { fetchTasks, updateTask } from "../Helpers/firestore-helpers";
import { FIREBASE_AUTH } from "../Config/firebase-config";
import { useFocusEffect } from "@react-navigation/native";

// Styles
import { styles } from "../Styles/CalendarStyles";

const CalendarScreen = () => {
  // **State Variables**
  const userId = FIREBASE_AUTH.currentUser?.uid; // Current user's ID
  const currentDate = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(currentDate); // Selected date
  const [tasks, setTasks] = useState([]); // Tasks for the selected date
  const [markedDates, setMarkedDates] = useState({}); // Dates marked with tasks on the calendar
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // **Load Tasks and Marked Dates**
  const loadTasks = useCallback(async () => {
    if (userId) {
      try {
        const allTasks = await fetchTasks(userId); // Fetch all tasks from Firebase
        const dateTasks = allTasks.filter((task) => task.date === selectedDate); // Filter tasks for the selected date
        setTasks(dateTasks);

        // Group tasks by date and prepare dots for marked dates
        const datesWithTasks = {};
        const tasksGroupedByDate = allTasks.reduce((acc, task) => {
          acc[task.date] = acc[task.date] || [];
          acc[task.date].push(task);
          return acc;
        }, {});

        Object.keys(tasksGroupedByDate).forEach((date) => {
          const tasksForDate = tasksGroupedByDate[date];

          // Handle the dots for the date
          const dots = tasksForDate.slice(0, 3).map((task, index) => ({
            key: `${task.id}-${index}`,
            color: "#e65151", // Red dot for tasks
          }));
          datesWithTasks[date] = { dots, marked: true };
        });

        // Highlight the selected date
        datesWithTasks[selectedDate] = {
          ...(datesWithTasks[selectedDate] || {}),
          selected: true,
          selectedColor: "#4acfc9", // Light blue for the selected date
        };

        setMarkedDates(datesWithTasks); // Update marked dates on the calendar
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    }
  }, [userId, selectedDate]);

  // Reload tasks whenever the screen regains focus
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  // Reload tasks when the selected date changes
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // **Toggle Task Completion**
  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      await updateTask(userId, taskId, { completed: !completed }); // Update task in Firebase
      loadTasks(); // Refresh tasks
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Calendar Component */}
      <Calendar
        style={styles.calStyling}
        enableSwipeMonths
        theme={{
          monthTextColor: "#69655E",
          textMonthFontSize: 30,
          textMonthFontWeight: "thin",
          arrowColor: "#69655E",
          calendarBackground: "#F2EEE9",
          dayTextColor: "#AFBFAA",
          textInactiveColor: "#69655E",
          textSectionTitleColor: "#69655E",
          textDayHeaderFontWeight: "bold",
          textDayFontWeight: "bold",
          textDisabledColor: "#D4C3B4",
          todayTextColor: "#4acfc9", // Highlight current day
        }}
        markedDates={markedDates}
        markingType="multi-dot"
        onDayPress={(day) => setSelectedDate(day.dateString)} // Update selected date
      />

      {/* Task List for Selected Date */}
      <Text style={styles.taskHeaderText}>Tasks for {selectedDate}:</Text>
      <ScrollView>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Pressable
              key={task.id}
              onLongPress={() => {
                setSelectedTask(task); // Set the task to be edited
                setIsEditModalVisible(true); // Open the modal
              }}
            >
              <View style={[styles.taskItem, { backgroundColor: task.color }]}>
                <Text style={styles.taskText}>{task.name}</Text>
                <CustomCheckBox
                  value={task.completed}
                  onValueChange={() => toggleTaskCompletion(task.id, task.completed)}
                />
              </View>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noTaskText}>No tasks for this date</Text>
        )}
      </ScrollView>

      {/* EditTask Modal */}
      <EditTask
        visible={isEditModalVisible}
        task={selectedTask}
        onClose={() => setIsEditModalVisible(false)} // Close the modal
        onSave={(updatedTask) => {
          updateTask(userId, updatedTask.id, updatedTask); // Update task in Firebase
          loadTasks(); // Refresh tasks after saving
        }}
      />
    </View>
  );
};

export default CalendarScreen;

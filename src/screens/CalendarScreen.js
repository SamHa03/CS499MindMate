// screens/CalendarScreen.js
// Screen for displaying a calendar and managing tasks by date

// **Imports**
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import { FIREBASE_AUTH } from "../config/firebase-config";
import { fetchTasks, removeTask } from "../helpers/firestore-helpers";

// Styles
import { styles } from "../styles/CalendarStyles";

const CalendarScreen = () => {
  // **State Variables**
  const [tasksByDate, setTasksByDate] = useState({}); // Tasks grouped by date
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString("en-CA")); // Selected date
  const [selectedTasks, setSelectedTasks] = useState([]); // Tasks for the selected date
  const [loading, setLoading] = useState(true); // Loading state for task fetching
  const userId = FIREBASE_AUTH.currentUser?.uid; // Current user's UID

  // **Fetch Tasks from Firestore**
  useEffect(() => {
    if (!userId) return;

    const loadTasks = async () => {
      setLoading(true); // Start loading
      try {
        const tasks = await fetchTasks(userId); // Fetch tasks
        const groupedTasks = tasks.reduce((acc, task) => {
          acc[task.date] = acc[task.date] || [];
          acc[task.date].push(task);
          return acc;
        }, {});
        setTasksByDate(groupedTasks); // Group tasks by date
        setSelectedTasks(groupedTasks[selectedDate] || []); // Set tasks for the selected date
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadTasks();
  }, [userId]);

  // **Update Tasks When Date Changes**
  useEffect(() => {
    setSelectedTasks(tasksByDate[selectedDate] || []);
  }, [selectedDate, tasksByDate]);

  // **Handle Day Selection on the Calendar**
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // **Complete a Task**
  const completeTask = async (taskId) => {
    try {
      await removeTask(userId, taskId); // Remove task from Firestore
      const updatedTasksByDate = { ...tasksByDate };
      updatedTasksByDate[selectedDate] = updatedTasksByDate[selectedDate].filter((task) => task.id !== taskId);
      if (updatedTasksByDate[selectedDate].length === 0) {
        delete updatedTasksByDate[selectedDate]; // Remove date if no tasks left
      }
      setTasksByDate(updatedTasksByDate); // Update state
      setSelectedTasks(updatedTasksByDate[selectedDate] || []);
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  // **Generate Marked Dates for the Calendar**
  const markedDates = Object.keys(tasksByDate).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      selected: date === selectedDate,
      selectedColor: "#4acfc9",
    };
    return acc;
  }, {});

  // **Render UI**
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
          todayTextColor: "#4acfc9",
        }}
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
      <Text style={styles.taskHeaderText}>Tasks for {selectedDate}:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#CBABD1" />
      ) : (
        <ScrollView>
          {selectedTasks.length > 0 ? (
            selectedTasks.map((task) => (
              <Pressable key={task.id} onPress={() => completeTask(task.id)}>
                <Text style={styles.taskText}>
                  {task.name} ({task.time})
                </Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.noTaskText}>No tasks for this date</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default CalendarScreen;

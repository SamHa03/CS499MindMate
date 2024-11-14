// App.js

// Garrett Thrower 10/26/2024
// Description: This is my attempt at the mood tracker page prototype.
// libraries / dependencies to bring in
import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import * as React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MoodLayout from './Screens/MindMateBranch_Garrett/components/MoodLayout';

// screens
// import BreathingScreen from "./Screens/breathing"; // may need later
import timerScreen from "./Screens/BreathingAction";
import CalendarScreen from "./Screens/calendar";
import TaskScreen from "./Screens/ToDoList";
import UserScreen from "./Screens/profile";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// =============== functions ===============
function AppHomeScreen({}) {
    // *** Added tasks state and functions ***
    const [tasks, setTasks] = useState({});

  // function to add a new task
  const addTask = (date, time, name) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      if (!updatedTasks[date]) {
        updatedTasks[date] = [];
      }
      updatedTasks[date].push({ name, date, time });
      return updatedTasks;
    });
  };

  // function to remove a task
  const removeTask = (date, index) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      if (updatedTasks[date]) {
        updatedTasks[date].splice(index, 1);
      }
      return updatedTasks;
    });
  };

  const currentDate = new Date().toLocaleDateString("en-CA");
  const todayTasks = tasks[currentDate] || [];

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={styles.circleBehind} />
        <SafeAreaView style={styles.safeArea}>
            <MoodLayout/>
        </SafeAreaView>
    </View>
  );
}

// =============== main begins here ===============
export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F2EEE9" }}>
      <NavigationContainer>
        <Tab.Navigator
          // always default to home / app startup page
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#F2EEE9", // light tan
            },
            // tab bar icon styling
            headerTintColor: "#D4E09B",
            tabBarActiveTintColor: "#CBABD1", // lilac
            tabBarInactiveTintColor: "#69655E", // gray
            tabBarActiveBackgroundColor: "#D4C3B4", // medium tan
            tabBarInactiveBackgroundColor: "#D4C3B4", // medium tan
            tabBarStyle: {
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              bottom: -30,
              height: 100,
              position: "absolute",
              zIndex: 1,
            },
            tabBarIconStyle: {
              marginTop: 0,
              marginBottom: 15,
            },
          }}
        >
          {/* ========== Focus Timer / Pomodoro Timer Navigation ========== */}
          <Tab.Screen
            name="Timer"
            component={timerScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="alarm-outline" color={"#F2EEE9"} size={35} />
              ),
              tabBarShowLabel: false,
            }}
          />

          {/* ========== Calendar Navigation ========== */}
          <Tab.Screen
            name="Calendar"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar-number-outline" color={"#F2EEE9"} size={35} />
              ),
              tabBarShowLabel: false,
            }}
          >
            {/* Pass tasks and removeTask function to CalendarScreen */}
            {(props) => (
              <CalendarScreen
                {...props}
                tasks={tasks}
                removeTask={removeTask}
              />
            )}
          </Tab.Screen>

          {/* ========== Home Navigation ========== */}
          <Tab.Screen
            name="Home"
            component={AppHomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="home"
                  color={"#F2EEE9"}
                  size={70}
                  style={{ paddingBottom: 112 }}
                />
              ),
              tabBarShowLabel: false,
            }}
          />

          {/* ========== Edit Tasks Navigation ========== */}
          <Tab.Screen
            name="Task List"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle-outline" color={"#F2EEE9"} size={35} />
              ),
              tabBarShowLabel: false,
            }}
          >
            {(props) => (
              <TaskScreen
                {...props}
                addTask={addTask}
                tasks={todayTasks}
                removeTask={removeTask}
              />
            )}
          </Tab.Screen>

          {/* ========== User Profile Navigation ========== */}
          <Tab.Screen
            name="User Profile"
            component={UserScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="person-circle-outline"
                  color={"#F2EEE9"}
                  size={35}
                />
              ),
              tabBarShowLabel: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}


// =============== styles ===============
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    backgroundColor: "#F2EEE9",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#d4c3b4",
  },
  sideButton: {
    backgroundColor: "#f2eee9",
    width: 65,
    height: 65,
    bottom: 10,
    borderRadius: 35, // Circle shape
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    verticalAlign: "center",
  },
  homeButton: {
    backgroundColor: "#f2eee9",
    width: 90,
    height: 90,
    bottom: 30,
    borderRadius: 45, // Bigger circle for Home button
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
    zIndex: 2,
  },
  circleBehind: {
    backgroundColor: "#d4c3b4", // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60, // Circle shape
    position: "absolute",
    bottom: 5, // Makes it jut out above the bottom container
    left: "50%", // Center the circle horizontally
    transform: [{ translateX: -60 }], // Adjust positioning to center it properly
    zIndex: 0, // Ensures the circle is behind the home button
  },
});



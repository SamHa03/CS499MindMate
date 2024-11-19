// App.js
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MoodLayout from "./Screens/MindMateBranch_Garrett/components/MoodLayout";
import timerScreen from "./Screens/breathing";
import CalendarScreen from "./Screens/calendar";
import TaskScreen from "./Screens/ToDoList";
import UserScreen from "./Screens/profile";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function AppHomeScreen({}) {
  const [tasks, setTasks] = useState({});
  const addTask = (date, time, name) => {
    console.log("Type of date:", typeof date, "| Value:", date);
    console.log("Type of time:", typeof time, "| Value:", time);
    console.log("Type of name:", typeof name, "| Value:", name);
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (!updatedTasks[date]) updatedTasks[date] = [];
      updatedTasks[date].push({ name, date, time });
      return updatedTasks;
    });
  };

  const removeTask = (date, index) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (updatedTasks[date]) updatedTasks[date].splice(index, 1);
      return updatedTasks;
    });
  };

  const currentDate = new Date().toLocaleDateString("en-CA");
  const todayTasks = tasks[currentDate] || [];

  return (
    <View style={styles.container}>
      <Text>Welcome to the Calendar!</Text>
      <CalendarScreen tasks={tasks} removeTask={removeTask} />
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F2EEE9" }}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Calendar" // set calendar as the default
          screenOptions={{
            headerStyle: { backgroundColor: "#F2EEE9" },
            headerTintColor: "#D4E09B",
            tabBarActiveTintColor: "#CBABD1",
            tabBarInactiveTintColor: "#69655E",
            tabBarActiveBackgroundColor: "#D4C3B4",
            tabBarInactiveBackgroundColor: "#D4C3B4",
            tabBarStyle: {
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 0,
              borderTopWidth: 0,
              height: 100,
              bottom: -30,
              position: "absolute",
              zIndex: 1,
            },
            tabBarIconStyle: { marginTop: 0, marginBottom: 15 },
          }}
        >
          <Tab.Screen
            name="Mood Tracker"
            component={MoodLayout} // Move MoodLayout to its own tab
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="happy-outline" color={"#F2EEE9"} size={35} />
              ),
              tabBarShowLabel: false,
            }}
          />

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
          <Tab.Screen
            name="Calendar"
            component={AppHomeScreen} // display Calendar on the Home page
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="calendar-number-outline"
                  color={"#F2EEE9"}
                  size={35}
                />
              ),
              tabBarShowLabel: false,
            }}
          />

          <Tab.Screen
            name="Task List"
            component={TaskScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="add-circle-outline"
                  color={"#F2EEE9"}
                  size={35}
                />
              ),
              tabBarShowLabel: false,
            }}
          >
            {/* {(props) => (
              <TaskScreen
                {...props}
                addTask={addTask}
                tasks={todayTasks}
                removeTask={removeTask}
              />
            )} */}
          </Tab.Screen>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    backgroundColor: "#F2EEE9",
  },
  circleBehind: {
    backgroundColor: "#d4c3b4",
    width: 120,
    height: 120,
    borderRadius: 60,
    position: "absolute",
    bottom: 5,
    left: "50%",
    transform: [{ translateX: -60 }],
    zIndex: 0,
  },
});

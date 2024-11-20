// App.js
// Main entry point for the MindMate application

// **Imports**
import 'react-native-url-polyfill/auto';
import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Firebase Helpers
import { FIREBASE_AUTH } from "./src/config/firebase-config";
import { fetchProfileData } from "./src/helpers/firestore-helpers";

// Screens
import Login from "./src/screens/LoginScreen";
import SetProfileScreen from "./src/screens/SetProfileScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
//import BreathingAction from "../screens/BreathingAction";
import ProfileScreen from "./src/screens/ProfileScreen";
//import TimerScreen from "./screens/breathing";
//import ToDoListScreen from "./screens/ToDoList";
//import MoodLayout from "./screens/MindMateBranch_Garrett/components/MoodLayout";
import CalendarScreen from "./src/screens/CalendarScreen";
import TaskScreen from "./src/screens/TaskScreen";

// Styles
import { styles } from "./src/styles/AppStyles";

// **Navigator Setup**
const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// **Tab Navigator for Main App**
function InsideTabNavigator() {
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchProfileDataAsync = async () => {
      try {
        const userId = FIREBASE_AUTH.currentUser?.uid;
        if (userId) {
          const userData = await fetchProfileData(userId);
          setProfilePic(userData?.profilePicture || null); // Set profile picture or null if not available
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfileDataAsync();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: { backgroundColor: "#F2EEE9" },
        tabBarActiveTintColor: "#CBABD1",
        tabBarInactiveTintColor: "#69655E",
        tabBarActiveBackgroundColor: "#D4C3B4",
        tabBarInactiveBackgroundColor: "#D4C3B4",
        tabBarStyle: {
          flexDirection: "row",
          justifyContent: "space-around",
          height: 100,
          position: "absolute",
          bottom: -30,
        },
        tabBarIconStyle: { marginBottom: 15 },
        tabBarShowLabel: false,
      }}
    >
      {/* Timer Tab */}
      {/* <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="alarm-outline" color={color} size={35} />,
        }}
      /> */}
      {/* Mood Tab */}
      {/* <Tab.Screen
        name="Mood"
        component={MoodLayout}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="happy-outline" color={color} size={35} />,
        }}
      /> */}
      {/* Calendar Tab */}
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={70} style={{ paddingBottom: 112 }} />,
        }}
      />
      {/* Tasks Tab */}
      <Tab.Screen
        name="Tasks"
        component={TaskScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" color={color} size={35} />,
        }}
      />
      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ profilePic }}
        options={{
          tabBarIcon: ({ color }) =>
            profilePic ? (
              <Image
                source={{ uri: profilePic }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 17.5,
                  borderWidth: 1,
                  borderColor: color,
                }}
              />
            ) : (
              <Ionicons name="person-circle-outline" color={color} size={35} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

// **Stack Navigator for App Layout**
function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Main" component={InsideTabNavigator} options={{ headerShown: false }} />
      {/* <InsideStack.Screen name="BreathingAction" component={BreathingAction} />
      <InsideStack.Screen name="ToDoList" component={ToDoListScreen} /> */}
      <InsideStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
    </InsideStack.Navigator>
  );
}

// **Main App Component**
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Monitor Firebase authentication state
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SetProfile" component={SetProfileScreen} options={{ title: "Set Up Profile" }} />
        <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

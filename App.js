// App.js
// Imports
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchUserData } from './FirestoreHelpers';

// Import Screens
import Login from './Screens/Login';
import SetProfileScreen from './Screens/SetProfileScreen';
import CalendarScreen from './Screens/calendar';
import BreathingScreen from './Screens/breathing';
import BreathingAction from './Screens/BreathingAction';
import ProfileScreen from './Screens/profile';
import EditProfileScreen from './Screens/EditProfile';
import TaskScreen from './Screens/tasks';
import TimerScreen from './Screens/timer';
import ToDoListScreen from './Screens/ToDoList';


// Stacks
const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function InsideTabNavigator() {
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Fetch the user's profile data from Firestore
    const fetchProfileData = async () => {
      try {
        const userId = FIREBASE_AUTH.currentUser?.uid;
        if (userId) {
          const userData = await fetchUserData(userId);
          setProfilePic(userData?.profilePicture || null); // Set profile picture or null if not available
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        headerStyle: { backgroundColor: "#F2EEE9" },
        tabBarActiveTintColor: "#CBABD1", // lilac
        tabBarInactiveTintColor: '#69655E', // gray
        tabBarActiveBackgroundColor: "#D4C3B4", // medium tan
        tabBarInactiveBackgroundColor: "#D4C3B4", // medium tan
        tabBarStyle: {
          flexDirection: "row",
          justifyContent: "space-around",
          height: 100,
          position: "absolute",
          zIndex: 1,
        },
        tabBarIconStyle: { marginTop: 0, marginBottom: 15 },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="alarm-outline" color={color} size={35} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="calendar-number-outline" color={color} size={35} />,
        }}
      />
      <Tab.Screen
        name="Breathing"
        component={BreathingScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={70} style={{ paddingBottom: 112 }} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" color={color} size={35} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ profilePic }}
        options={{
          tabBarIcon: ({ color }) => (
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
            )
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Main" component={InsideTabNavigator} options={{ headerShown: false }} />
      <InsideStack.Screen name="BreathingAction" component={BreathingAction} />
      <InsideStack.Screen name="ToDoList" component={ToDoListScreen} />
      <InsideStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
      {/* Additional screens can be added here */}
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SetProfile" component={SetProfileScreen} options={{ title: "Set Up Profile" }} />
        <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    backgroundColor: "#F2EEE9",
  },
  circleBehind: {
    backgroundColor: '#d4c3b4',
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'absolute',
    bottom: 5,
    left: '50%',
    transform: [{ translateX: -60 }],
    zIndex: 0,
  },
});

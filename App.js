// App.js
// Imports
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import Login from './Screens/Login';
import CalendarScreen from './Screens/calendar';
import BreathingScreen from './Screens/breathing';
import BreathingAction from './Screens/BreathingAction';
import ProfileScreen from './Screens/profile';
import TaskScreen from './Screens/tasks';
import TimerScreen from './Screens/timer';
import ToDoListScreen from './Screens/ToDoList';


// Stacks
const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function InsideTabNavigator() {
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
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" color={color} size={35} />,
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
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
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

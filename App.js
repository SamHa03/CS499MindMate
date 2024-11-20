// App.js
// Imports
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { fetchUserData } from './FirestoreHelpers';

// Import Screens
import Login from './Screens/Login';
import SetProfileScreen from './Screens/SetProfileScreen';
import EditProfileScreen from './Screens/EditProfile';
import BreathingAction from './Screens/BreathingAction';
import ProfileScreen from './Screens/profile';
import TimerScreen from './Screens/breathing';
import ToDoListScreen from './Screens/ToDoList';
import MoodLayout from "./Screens/MindMateBranch_Garrett/components/MoodLayout";
import CalendarScreen from "./Screens/calendar";
import TaskScreen from "./Screens/ToDoList";
import UserScreen from "./Screens/profile";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      initialRouteName="Profile"
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
          bottom: -30,
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
        name="Mood"
        component={MoodLayout}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="happy-outline" color={color} size={35} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
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
// Note: This is the old functionality. It's here in case anyone needs to grab some lines of code that 
// might be useful.
// function AppHomeScreen({}) {
//   const [tasks, setTasks] = useState({});
//   const addTask = (date, time, name) => {
//     console.log("Type of date:", typeof date, "| Value:", date);
//     console.log("Type of time:", typeof time, "| Value:", time);
//     console.log("Type of name:", typeof name, "| Value:", name);
//     setTasks((prevTasks) => {
//       const updatedTasks = { ...prevTasks };
//       if (!updatedTasks[date]) updatedTasks[date] = [];
//       updatedTasks[date].push({ name, date, time });
//       return updatedTasks;
//     });
//   };

//   const removeTask = (date, index) => {
//     setTasks((prevTasks) => {
//       const updatedTasks = { ...prevTasks };
//       if (updatedTasks[date]) updatedTasks[date].splice(index, 1);
//       return updatedTasks;
//     });
//   };

//   const currentDate = new Date().toLocaleDateString("en-CA");
//   const todayTasks = tasks[currentDate] || [];

//   return (
//     <View style={styles.container}>
//       <Text>Welcome to the Calendar!</Text>
//       <CalendarScreen tasks={tasks} removeTask={removeTask} />
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <View style={{ flex: 1, backgroundColor: "#F2EEE9" }}>
//       <NavigationContainer>
//         <Tab.Navigator
//           initialRouteName="Calendar" // set calendar as the default
//           screenOptions={{
//             headerStyle: { backgroundColor: "#F2EEE9" },
//             headerTintColor: "#D4E09B",
//             tabBarActiveTintColor: "#CBABD1",
//             tabBarInactiveTintColor: "#69655E",
//             tabBarActiveBackgroundColor: "#D4C3B4",
//             tabBarInactiveBackgroundColor: "#D4C3B4",
//             tabBarStyle: {
//               flexDirection: "row",
//               justifyContent: "space-around",
//               padding: 0,
//               borderTopWidth: 0,
//               height: 100,
//               bottom: -30,
//               position: "absolute",
//               zIndex: 1,
//             },
//             tabBarIconStyle: { marginTop: 0, marginBottom: 15 },
//           }}
//         >
//           <Tab.Screen
//             name="Mood Tracker"
//             component={MoodLayout} // Move MoodLayout to its own tab
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <Ionicons name="happy-outline" color={"#F2EEE9"} size={35} />
//               ),
//               tabBarShowLabel: false,
//             }}
//           />

//           <Tab.Screen
//             name="Timer"
//             component={timerScreen}
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <Ionicons name="alarm-outline" color={"#F2EEE9"} size={35} />
//               ),
//               tabBarShowLabel: false,
//             }}
//           />
//           <Tab.Screen
//             name="Calendar"
//             component={AppHomeScreen} // display Calendar on the Home page
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <Ionicons
//                   name="calendar-number-outline"
//                   color={"#F2EEE9"}
//                   size={35}
//                 />
//               ),
//               tabBarShowLabel: false,
//             }}
//           />

          
//           {/* ========== Edit Tasks Navigation ========== */}
//           <Tab.Screen
//             name="Task List"
//             component={TaskScreen}
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <Ionicons
//                   name="add-circle-outline"
//                   color={"#F2EEE9"}
//                   size={35}
//                 />
//               ),
//               tabBarShowLabel: false,
//             }}
//           >
//             {/* {(props) => (
//               <TaskScreen
//                 {...props}
//                 addTask={addTask}
//                 tasks={todayTasks}
//                 removeTask={removeTask}
//               />
//             )} */}
//           </Tab.Screen>

          
//           {/* ========== User Profile Navigation ========== */}
//           <Tab.Screen
//             name="User Profile"
//             component={UserScreen}
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <Ionicons
//                   name="person-circle-outline"
//                   color={"#F2EEE9"}
//                   size={35}
//                 />
//               ),
//               tabBarShowLabel: false,
//             }}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </View>
//   );
// }

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

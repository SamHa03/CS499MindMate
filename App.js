import { StyleSheet, Text, View, Pressable } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Calendar from "./calendar";

const Stack = createNativeStackNavigator();

function AppHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Pressable
        onPress={() => {
          console.log("Button Pressed");
          navigation.navigate("Calendar");
        }}
      >
        <Text style={styles.calendarText}>Go to Calendar</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={AppHomeScreen} />
        <Stack.Screen name="Calendar" component={Calendar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  calendarText: {
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
    backgroundColor: "purple",
    color: "white",
    textAlign: "center",
  },
});

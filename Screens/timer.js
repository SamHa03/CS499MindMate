import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TimerScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.circleBehind} /> 
      <Text>This is the Pomodoro timer page.</Text>
    </View>
  );
}

// styling begins here
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#F2EEE9",
    flex: 1,
    alignItems: "center",
  },
  circleBehind: {
    backgroundColor: '#d4c3b4', // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60, // Circle shape
    position: 'absolute',
    bottom: 5, // Makes it jut out above the bottom container
    left: '50%', // Center the circle horizontally
    transform: [{ translateX: -60 }], // Adjust positioning to center it properly
    zIndex: 0, // Ensures the circle is behind the home button
  },
});


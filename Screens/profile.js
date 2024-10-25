import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TimerScreen() {
  return (
    <View style={styles.container}>
      <Text>This is user profile page.</Text>
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
  }
});

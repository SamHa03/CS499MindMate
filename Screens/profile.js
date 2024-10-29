// Screens/profile.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut } from "firebase/auth";

export default function ProfileScreen() {
  const logOut = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        console.log("User signed out!");
      })
      .catch((error) => {
        console.log("Error signing out: ", error);
        alert("Failed to log out. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleBehind} />
      <Text>This is the user profile page.</Text>
      <Button title="Log Out" onPress={logOut} color="#CBABD1" />
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

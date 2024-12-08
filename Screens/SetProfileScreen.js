// Screens/SetProfileScreen.js
// Screen for setting up a user profile with username, bio, and profile picture

// **Imports**
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "../Config/firebase-config";
import { saveUserData, isUsernameTaken } from "../Helpers/firestore-helpers";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

// Styles
import { styles } from "../Styles/SetProfileStyles";

export default function SetProfileScreen({ navigation }) {
  // **State Variables**
  const [username, setUsername] = useState(""); // Stores the username
  const [biography, setBiography] = useState(""); // Stores the bio
  const [profilePicUrl, setProfilePicUrl] = useState(null); // Stores the profile picture URL

  const user = FIREBASE_AUTH.currentUser; // Current authenticated user

  // **Save Profile**
  const handleSaveProfile = async () => {
    if (!username) {
      Alert.alert("Username is required.");
      return;
    }

    try {
      const isTaken = await isUsernameTaken(username);
      if (isTaken) {
        Alert.alert("This username is already taken. Please choose a different one.");
        return;
      }

      await saveUserData(user.uid, username, biography);
      Alert.alert("Profile set successfully!");
      navigation.navigate("Inside");
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Failed to set profile. Please try again.");
    }
  };

  // **UI Rendering**
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Up Your Profile</Text>
      <Text style={styles.label}>Username *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a short bio"
        value={biography}
        onChangeText={setBiography}
      />
      <Button title="Save Profile" onPress={handleSaveProfile} color="#CBABD1" />
    </View>
  );
}

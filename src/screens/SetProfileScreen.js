// screens/SetProfileScreen.js
// Screen for setting up a user profile with username, bio, and profile picture

// **Imports**
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "../config/firebase-config";
import { saveUserData, isUsernameTaken } from "../helpers/firestore-helpers";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

// Styles
import { styles } from "../styles/SetProfileStyles";

export default function SetProfileScreen({ navigation }) {
  // **State Variables**
  const [username, setUsername] = useState(""); // Stores the username
  const [biography, setBiography] = useState(""); // Stores the bio
  const [profilePicUrl, setProfilePicUrl] = useState(null); // Stores the profile picture URL

  const user = FIREBASE_AUTH.currentUser; // Current authenticated user

  // **Select and Upload Profile Picture**
  const handleSelectImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access the camera roll is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        const { uri } = result;
        const storageRef = ref(FIREBASE_STORAGE, `profilePictures/${user.uid}`);
        const response = await fetch(uri);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob); // Upload to Firebase Storage
        const downloadUrl = await getDownloadURL(storageRef); // Get download URL
        setProfilePicUrl(downloadUrl); // Update state with profile picture URL
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("An error occurred during the upload. Please try again.");
    }
  };

  // **Save Profile**
  const handleSaveProfile = async () => {
    if (!username) {
      Alert.alert("Username is required.");
      return;
    }

    try {
      const isTaken = await isUsernameTaken(username); // Check for username availability
      if (isTaken) {
        Alert.alert("This username is already taken. Please choose a different one.");
        return;
      }

      await saveUserData(
        user.uid,
        username,
        biography,
        profilePicUrl || "https://via.placeholder.com/100"
      );
      Alert.alert("Profile set successfully!");
      navigation.navigate("Inside"); // Navigate to main app screen
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Failed to set profile. Please try again.");
    }
  };

  // **UI Rendering**
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Up Your Profile</Text>
      <TouchableOpacity onPress={handleSelectImage}>
        <Image
          source={{ uri: profilePicUrl || "https://via.placeholder.com/100" }}
          style={styles.profilePic}
        />
        <Text>Tap to select an image</Text>
      </TouchableOpacity>
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

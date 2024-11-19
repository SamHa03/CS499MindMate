// Screens/SetProfileScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FIREBASE_AUTH, FIREBASE_STORAGE } from '../FirebaseConfig';
import { saveUserData, isUsernameTaken } from '../FirestoreHelpers';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

export default function SetProfileScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [biography, setBiography] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const user = FIREBASE_AUTH.currentUser;

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

        await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(storageRef);
        setProfilePicUrl(downloadUrl);
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("An error occurred during the upload. Please try again.");
    }
  };

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

      await saveUserData(user.uid, username, biography, profilePicUrl || "https://via.placeholder.com/100");
      Alert.alert("Profile set successfully!");
      navigation.navigate("Inside"); // Navigate to the main app screen or home screen
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Failed to set profile. Please try again.");
    }
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EEE9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderColor: "#69655E",
    borderWidth: 2,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: "#69655E",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});

// screens/EditProfileScreen.js
// Screen for editing user profile information including username, bio, profile picture, and password

// **Imports**
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, Modal } from "react-native";
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "../config/firebase-config";
import { updateUserData, fetchUserData, isUsernameTaken } from "../helpers/firestore-helpers";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

// Styles
import { styles } from "../styles/EditProfileStyles";

export default function EditProfileScreen({ navigation }) {
  // **State Variables**
  const [username, setUsername] = useState(""); // New username
  const [biography, setBiography] = useState(""); // New bio
  const [profilePicUrl, setProfilePicUrl] = useState(null); // Profile picture URL
  const [currentUserUsername, setCurrentUserUsername] = useState(""); // Current username
  const [currentPassword, setCurrentPassword] = useState(""); // Current password for re-authentication
  const [newPassword, setNewPassword] = useState(""); // New password
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const user = FIREBASE_AUTH.currentUser; // Current authenticated user

  // **Load User Data**
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        Alert.alert("User not logged in.");
        navigation.navigate("Login");
        return;
      }
      try {
        const userData = await fetchUserData(user.uid); // Fetch user data from Firestore
        if (userData) {
          setUsername(userData.username);
          setBiography(userData.bio);
          setProfilePicUrl(userData.profilePicture || "https://via.placeholder.com/100");
          setCurrentUserUsername(userData.username);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, [user]);

  // **Validate Password**
  const isValidPassword = (password) => {
    const minLength = 8;
    const maxLength = 40;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      password.length <= maxLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

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

      if (!result.canceled && result.assets && result.assets.length > 0) {
        let { uri } = result.assets[0]; // First asset's URI

        // Compress or resize the image
        const compressedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 1000 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        const response = await fetch(compressedImage.uri);
        const blob = await response.blob();
        const storageRef = ref(FIREBASE_STORAGE, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, blob); // Upload to Firebase
        const downloadUrl = await getDownloadURL(storageRef); // Fetch download URL
        setProfilePicUrl(downloadUrl);
        Alert.alert("Profile picture updated successfully!");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("An error occurred during the upload. Please try again.");
    }
  };

  // **Save Profile**
  const handleSaveProfile = async () => {
    if (!user) {
      Alert.alert("User not logged in.");
      return;
    }

    try {
      if (username && username !== currentUserUsername) {
        const isTaken = await isUsernameTaken(username);
        if (isTaken) {
          Alert.alert("This username is already taken. Please choose a different one.");
          return;
        }
      }

      await updateUserData(user.uid, { username, bio: biography, profilePicture: profilePicUrl });
      Alert.alert("Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Failed to update profile.");
    }
  };

  // **Change Password**
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert("Please fill out all fields.");
      return;
    }

    if (!isValidPassword(newPassword)) {
      Alert.alert("Password must meet the required criteria.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Alert.alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating password:", error);
      Alert.alert("Error updating password: " + error.message);
    }
  };

  // **UI Rendering**
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity onPress={handleSelectImage}>
        <Image
          source={{ uri: profilePicUrl || "https://via.placeholder.com/100" }}
          style={styles.profilePic}
        />
        <Text>Tap to select an image</Text>
      </TouchableOpacity>

      <Text style={styles.labelText}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.labelText}>Bio</Text>
      <TextInput
        style={styles.input}
        placeholder="Biography"
        value={biography}
        onChangeText={setBiography}
      />

      <Text style={styles.labelText}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user ? user.email : ""}
        editable={false}
      />
      <Button title="Save Profile" onPress={handleSaveProfile} color="#CBABD1" />
      <Button title="Change Password" onPress={() => setModalVisible(true)} color="#CBABD1" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={[styles.input, styles.widerInput]}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={[styles.input, styles.widerInput]}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Button title="Submit" onPress={handleChangePassword} color="#CBABD1" />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

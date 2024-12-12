// Screens/EditProfileScreen.js
// Screen for editing user profile information including username, bio, profile picture, and password

// **Imports**
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, Modal } from "react-native";
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "../Config/firebase-config";
import { updateUserData, fetchUserData, isUsernameTaken, deleteUserData } from "../Helpers/firestore-helpers";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

// Styles
import { styles } from "../Styles/EditProfileStyles";

export default function EditProfileScreen({ navigation }) {
  // **State Variables**
  const [username, setUsername] = useState(""); // New username
  const [biography, setBiography] = useState(""); // New bio
  const [currentUserUsername, setCurrentUserUsername] = useState(""); // Current username
  const [currentPassword, setCurrentPassword] = useState(""); // Current password for re-authentication
  const [newPassword, setNewPassword] = useState(""); // New password
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const user = FIREBASE_AUTH.currentUser; // Current authenticated user
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Modal visibility for account deletion
  const [deletePassword, setDeletePassword] = useState(""); // Password for account deletion

  // **Load User Data**
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        Alert.alert("User not logged in.");
        navigation.navigate("Login");
        return;
      }
      try {
        const userData = await fetchUserData(user.uid);
        if (userData) {
          setUsername(userData.username);
          setBiography(userData.bio);
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

      await updateUserData(user.uid, { username, bio: biography });
      Alert.alert("Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Failed to update profile.");
    }
  };

  // **Change Password**
  const handleChangePassword = async () => {
    if (!user) {
      Alert.alert("User not logged in.");
      return;
    }

    if (!currentPassword || !newPassword) {
      Alert.alert("Please fill out all fields.");
      return;
    }

    if (!isValidPassword(newPassword)) {
      Alert.alert(
        "Password must include:\n- 8 to 40 characters\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one number\n- At least one special character"
      );
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Alert.alert("Password updated successfully!");
      setCurrentPassword('');
      setNewPassword('');
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating password: ", error);
      Alert.alert("Error updating password: " + error.message);
    }
  };

  // **Delete Account**
  const handleDeleteAccount = async () => {
    if (!user) {
      Alert.alert("User not logged in.");
      return;
    }

    if (!deletePassword) {
      Alert.alert("Please enter your password to delete your account.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, deletePassword);
      await reauthenticateWithCredential(user, credential);

      // Delete user data from Firestore
      await deleteUserData(user.uid);

      // Delete the user's authentication account
      await user.delete();
      Alert.alert("Account deleted successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error deleting account: ", error);
      Alert.alert("Error deleting account: " + error.message);
    } finally {
      setDeletePassword(""); // Clear password input
      setDeleteModalVisible(false); // Close modal
    }
  };

  // **UI Rendering**
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

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
        value={user ? user.email : ''}
        editable={false}
      />
      <Button title="Save Profile" onPress={handleSaveProfile} color="#CBABD1" />

      <View style={styles.bottomButtonsContainer}>
        <Button title="Change Password" onPress={() => setModalVisible(true)} color="#CBABD1" />
        <Button title="Delete Account" onPress={() => setDeleteModalVisible(true)} color="#FF0000" />
      </View>

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
              placeholderTextColor="#CCCCCC"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={[styles.input, styles.widerInput]}
              placeholder="New Password"
              placeholderTextColor="#CCCCCC"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Button title="Submit" onPress={handleChangePassword} color="#CBABD1" />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirm Account Deletion</Text>
            <TextInput
              style={[styles.input, styles.widerInput]}
              placeholder="Enter Password"
              placeholderTextColor="#CCCCCC"
              secureTextEntry
              value={deletePassword}
              onChangeText={setDeletePassword}
            />
            <Button title="Delete Account" onPress={handleDeleteAccount} color="#FF0000" />
            <TouchableOpacity onPress={() => setDeleteModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

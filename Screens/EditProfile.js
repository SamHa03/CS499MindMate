// Screens/EditProfile.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity, Image, Modal } from "react-native";
import { FIREBASE_AUTH, FIREBASE_STORAGE } from '../FirebaseConfig';
import { updateUserData, fetchUserData, isUsernameTaken } from '../FirestoreHelpers';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export default function EditProfileScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [biography, setBiography] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [currentUserUsername, setCurrentUserUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Ensure modalVisible state exists
  const user = FIREBASE_AUTH.currentUser;

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
          setProfilePicUrl(userData.profilePicture || "https://via.placeholder.com/100");
          setCurrentUserUsername(userData.username);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, [user]);

// Password validation function
const isValidPassword = (password) => {
  const minLength = 8;
  const maxLength = 40;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= minLength && password.length <= maxLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

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

      console.log("Image Picker Result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        let { uri } = result.assets[0]; // Access the first asset's uri
        console.log("Image URI:", uri);
  
        // Compress or resize the image to reduce file size
        const compressedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 1000 } }], // Resize to a smaller width while maintaining aspect ratio
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        uri = compressedImage.uri;
        console.log("Compressed Image URI:", uri);

        if (uri) {
          // Proceed with the image upload process
          const response = await fetch(uri);
          if (!response.ok) {
            throw new Error("Failed to fetch the image for upload.");
          }
  
          const blob = await response.blob();
          const storageRef = ref(FIREBASE_STORAGE, `profilePictures/${user.uid}`);
  
          // Upload the image to Firebase Storage
          await uploadBytes(storageRef, blob);
          const downloadUrl = await getDownloadURL(storageRef);
  
          setProfilePicUrl(downloadUrl);
          Alert.alert("Profile picture updated successfully!");
        } else {
          alert("An error occurred while selecting the image. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("An error occurred during the upload. Please try again.");
    }
  };

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
        value={user ? user.email : ''}
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
  input: {
    height: 50,
    borderColor: "#69655E",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  widerInput: {
    width: "80%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: "#CBABD1",
    fontSize: 16,
    textAlign: "center",
  },
  labelText: {
    fontWeight: "bold",
  },
});

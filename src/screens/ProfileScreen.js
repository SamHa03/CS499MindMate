// screens/ProfileScreen.js
// Screen for displaying user profile information

// **Imports**
import React, { useCallback, useState } from "react";
import { View, Text, Button, Image, ActivityIndicator, Alert } from "react-native";
import { FIREBASE_AUTH } from "../config/firebase-config";
import { fetchUserData } from "../helpers/firestore-helpers";
import { signOut } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";

// Styles
import { styles } from "../styles/ProfileStyles";

export default function ProfileScreen({ navigation }) {
  // **State Variables**
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/100"); // Profile picture URL
  const [username, setUsername] = useState("Username"); // Username
  const [biography, setBiography] = useState("Short bio goes here..."); // User bio
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  const user = FIREBASE_AUTH.currentUser; // Currently authenticated user

  // **Fetch User Data**
  const loadUserData = async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      const userData = await fetchUserData(user.uid); // Fetch user data from Firestore
      if (userData) {
        setUsername(userData.username);
        setBiography(userData.bio);
        setProfilePic(userData.profilePicture || "https://via.placeholder.com/100");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // **Effect to Load User Data on Screen Focus**
  useFocusEffect(
    useCallback(() => {
      loadUserData(); // Fetch user data whenever the screen is focused
    }, [user])
  );

  // **Handle Logout**
  const logOut = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        console.log("User signed out!");
        navigation.navigate("Login"); // Navigate to the login screen
      })
      .catch((error) => Alert.alert("Failed to log out", error.message));
  };

  // **Render Loading Indicator**
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#CBABD1" />
      </View>
    );
  }

  // **Render User Profile**
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.bio}>{biography}</Text>
        </View>
      </View>
      {/* Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <Button title="Edit Profile" onPress={() => navigation.navigate("EditProfile")} color="#CBABD1" />
        <View style={styles.spacer} />
        <Button title="Log Out" onPress={logOut} color="#CBABD1" />
      </View>
    </View>
  );
}

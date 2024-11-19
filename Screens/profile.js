// Screens/profile.js
import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Button, Image, ActivityIndicator, Alert } from "react-native";
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { fetchUserData } from '../FirestoreHelpers';
import { signOut } from "firebase/auth";
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/100");
  const [username, setUsername] = useState("Username");
  const [biography, setBiography] = useState("Short bio goes here...");
  const [loading, setLoading] = useState(true);
  const user = FIREBASE_AUTH.currentUser;

  const loadUserData = async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      const userData = await fetchUserData(user.uid);
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

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [user])
  );

  const logOut = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        console.log("User signed out!");
        navigation.navigate("Login");
      })
      .catch((error) => Alert.alert("Failed to log out: ", error.message));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#CBABD1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.bio}>{biography}</Text>
        </View>
      </View>
      <View style={styles.bottomButtonsContainer}>
        <Button title="Edit Profile" onPress={() => navigation.navigate("EditProfile")} color="#CBABD1" />
        <View style={styles.spacer} />
        <Button title="Log Out" onPress={logOut} color="#CBABD1" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: "#F2EEE9",
    flex: 1,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: "#69655E",
    textAlign: "left",
  },
  bottomButtonsContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 130,
  },
  spacer: {
    height: 0,
  },
});

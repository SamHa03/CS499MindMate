// Screens/LoginScreen.js
// Login Screen for user authentication

// **Imports**
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../Config/firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Styles
import { styles } from "../Styles/LoginStyles";

const LoginScreen = () => {
  // **State Variables**
  const [email, setEmail] = useState(""); // User email input
  const [password, setPassword] = useState(""); // User password input
  const [loading, setLoading] = useState(false); // Loading state for asynchronous actions

  const navigation = useNavigation(); // Navigation object for screen transitions
  const auth = FIREBASE_AUTH; // Firebase authentication instance

// **Helper Function: Validate Password**
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


  // **Sign-In Function**
  const signIn = async () => {
    setLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, email, password); // Firebase sign-in
      navigation.navigate("Inside"); // Navigate to main screen
    } catch (error) {
      console.error("Sign in failed:", error);
      Alert.alert("Sign in failed", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // **Sign-Up Function**
  const signUp = async () => {
    // Validate password before signing up
    if (!isValidPassword(password)) {
      Alert.alert(
        "Password Requirements",
        "Password must include:\n- 8 to 40 characters\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one number\n- At least one special character"
      );
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password); // Firebase sign-up
      navigation.navigate("SetProfile", { userId: response.user.uid }); // Navigate to profile setup screen
    } catch (error) {
      console.error("Sign up failed:", error);
      Alert.alert("Sign up failed", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // **UI Rendering**
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        {/* Email Input */}
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        {/* Password Input */}
        <TextInput
          secureTextEntry
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={setPassword}
        />
        {/* Loading Indicator or Action Buttons */}
        {loading ? (
          <ActivityIndicator size="large" color="#a3b18a" />
        ) : (
          <>
            <Button color='#69655E' title="Login" onPress={signIn} />
            <Button color='#69655E' title="Create Account" onPress={signUp} />
          </>
        )}
      </KeyboardAvoidingView>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons 
          name="head" 
          size={500} 
          color="#d4c3b4"/>
      <Text style={styles.iconText}>Mind{"\n"}    Mate</Text>
      </View>
    </View>
  );
};

export default LoginScreen;

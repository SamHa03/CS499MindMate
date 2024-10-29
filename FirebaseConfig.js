// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBP5Ng9e8DVV2GdHX7xNYr-DFVYMhXdo6A",
  authDomain: "mindmate-ed3b8.firebaseapp.com",
  projectId: "mindmate-ed3b8",
  storageBucket: "mindmate-ed3b8.appspot.com",
  messagingSenderId: "744208906785",
  appId: "1:744208906785:web:090f4aaf0603e686388160"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

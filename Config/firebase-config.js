// Config/firebase-config.js
// Configuration and initialization of Firebase services.

import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

// **Firebase Configuration**
// Keys and identifiers for connecting to your Firebase project.
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// **Initialize Firebase Services**
// Firebase App
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Firebase Authentication with persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore Database
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

// Firebase Storage
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

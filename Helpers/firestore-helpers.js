// Helpers/firestore-helpers.js
// Helper functions for managing Firestore data (users, tasks, etc.)

import { FIRESTORE_DB } from '../Config/firebase-config';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

// **Save User Data**
// Stores user profile information in Firestore.
export const saveUserData = async (userId, username, bio, profilePicUrl) => {
  try {
    await setDoc(doc(FIRESTORE_DB, "users", userId), {
      username,
      bio,
      profilePicture: profilePicUrl,
    });
    console.log("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data: ", error);
  }
};

// **Fetch User Data**
// Retrieves user profile information from Firestore.
export const fetchUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(FIRESTORE_DB, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null;
  }
};

// **Update User Data**
// Updates specific fields in the user's Firestore profile.
export const updateUserData = async (userId, updates) => {
  try {
    await updateDoc(doc(FIRESTORE_DB, "users", userId), updates);
    console.log("User data updated successfully!");
  } catch (error) {
    console.error("Error updating user data: ", error);
  }
};

// **Check if Username is Taken**
// Returns `true` if a given username already exists in the Firestore database.
export const isUsernameTaken = async (username) => {
  try {
    const usersCollection = collection(FIRESTORE_DB, "users");
    const q = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Returns true if the username is taken
  } catch (error) {
    console.error("Error checking if username is taken:", error);
    throw error;
  }
};

// **Save a Task**
// Adds a task to the Firestore database for the given user.
export const saveTask = async (userId, task) => {
  try {
    const tasksCollection = collection(FIRESTORE_DB, "users", userId, "tasks");
    await addDoc(tasksCollection, task);
    console.log("Task saved successfully!");
  } catch (error) {
    console.error("Error saving task:", error);
  }
};

// **Fetch Tasks**
// Retrieves all tasks for the given user and sorts them by date.
export const fetchTasks = async (userId) => {
  try {
    const tasksCollection = collection(FIRESTORE_DB, "users", userId, "tasks");
    const querySnapshot = await getDocs(tasksCollection);
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    return tasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// **Update a Task**
// Updates specific fields of a task in Firestore.
export const updateTask = async (userId, taskId, updates) => {
  try {
    const taskDoc = doc(FIRESTORE_DB, "users", userId, "tasks", taskId);
    await updateDoc(taskDoc, updates);
    console.log("Task updated successfully!");
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// **Delete a Task**
// Deletes a task from Firestore.
export const deleteTask = async (userId, taskId) => {
  try {
    const taskDoc = doc(FIRESTORE_DB, "users", userId, "tasks", taskId);
    await deleteDoc(taskDoc);
    console.log("Task deleted successfully!");
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

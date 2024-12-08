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
  arrayUnion,
} from 'firebase/firestore';

// **Save User Data**
// Stores user profile information in Firestore.
export const saveUserData = async (userId, username, bio) => {
  try {
    await setDoc(doc(FIRESTORE_DB, "users", userId), {
      username,
      bio,
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

// **Save Mood Entry**
// Adds a mood entry to the Firestore database for the given user and date.
export const saveMoodEntry = async (userId, date, moodData) => {
  try {
    const entriesCollectionRef = collection(
      FIRESTORE_DB,
      'users',
      userId,
      'moods',
      date,
      'entries'
    );
    await addDoc(entriesCollectionRef, moodData);
    console.log('Mood entry added successfully!');
  } catch (error) {
    console.error('Error adding mood entry:', error);
  }
};

// **Fetch Mood Entries for a Date**
// Retrieves all mood entries for a specific date.
export const fetchMoodEntriesForDate = async (userId, date) => {
  try {
    const entriesCollectionRef = collection(
      FIRESTORE_DB,
      'users',
      userId,
      'moods',
      date,
      'entries'
    );
    const querySnapshot = await getDocs(entriesCollectionRef);
    const moodEntries = [];
    querySnapshot.forEach((doc) => {
      moodEntries.push({ id: doc.id, ...doc.data() });
    });
    return moodEntries;
  } catch (error) {
    console.error('Error fetching mood entries:', error);
    return [];
  }
};

// **Update Mood Entry**
// Updates a specific mood entry in Firestore.
export const updateMoodEntry = async (userId, date, entryId, updatedEntry) => {
  try {
    const entryDocRef = doc(
      FIRESTORE_DB,
      'users',
      userId,
      'moods',
      date,
      'entries',
      entryId
    );
    await updateDoc(entryDocRef, updatedEntry);
    console.log('Mood entry updated successfully!');
  } catch (error) {
    console.error('Error updating mood entry:', error);
  }
};

// **Delete Mood Entry**
// Deletes a specific mood entry from Firestore.
export const deleteMoodEntry = async (userId, dateString, entryId) => {
  try {
    const entryDocRef = doc(
      FIRESTORE_DB,
      'users',
      userId,
      'moods',
      dateString,
      'entries',
      entryId
    );
    await deleteDoc(entryDocRef);
    console.log('Mood entry deleted successfully!');
  } catch (error) {
    console.error('Error deleting mood entry:', error);
  }
};

// **Delete User Data**
// Deletes user profile and all associated collections from Firestore.
export const deleteUserData = async (userId) => {
  try {
    // Reference to the user's document
    const userDocRef = doc(FIRESTORE_DB, "users", userId);

    // Delete subcollections (e.g., tasks, moods)
    const subcollections = ["tasks", "moods"]; // Add any other subcollections here
    for (const subcollection of subcollections) {
      const subcollectionRef = collection(userDocRef, subcollection);
      const subcollectionSnapshot = await getDocs(subcollectionRef);
      subcollectionSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    }

    // Delete the user's document
    await deleteDoc(userDocRef);
    console.log("User data deleted successfully!");
  } catch (error) {
    console.error("Error deleting user data: ", error);
  }
};

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

// Save mood to Firestore
export const saveMood = async (userId, moodData) => {
  try {
    const now = new Date();
    const dateString = now.toISOString().split("T")[0]; // Use today's date as the document ID

    const dayDocRef = doc(FIRESTORE_DB, "users", userId, "Mood", dateString);

    // Fetch the existing document
    const docSnap = await getDoc(dayDocRef);
    let updatedEntries = [];

    if (docSnap.exists()) {
      // Get existing entries and append the new mood data
      const existingData = docSnap.data();
      updatedEntries = existingData.entries || [];
    }

    updatedEntries.push(moodData); // Add the new mood entry

    // Save the updated document back to Firestore
    await setDoc(dayDocRef, { entries: updatedEntries });

    console.log("Mood saved successfully!");
  } catch (error) {
    console.error("Error saving mood:", error);
    throw error;
  }
};

// Fetch mood data for a specific date
export const fetchMoodData = async (userId, dateString) => {
  try {
    const dayDoc = doc(FIRESTORE_DB, "users", userId, "Mood", dateString);
    const docSnap = await getDoc(dayDoc);

    if (docSnap.exists()) {
      return docSnap.data(); // Return the mood data
    } else {
      console.log("No mood data for this date.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching mood data:", error);
    throw error;
  }
};

export const updateMood = async (userId, date, updatedEntry) => {
  try {
    // Reference the day's document in Firestore
    const dayDocRef = doc(FIRESTORE_DB, "users", userId, "Mood", date);

    // Fetch the existing document
    const docSnap = await getDoc(dayDocRef);

    if (!docSnap.exists()) {
      throw new Error("No data found for the specified date.");
    }

    // Get the current entries
    const data = docSnap.data();
    const updatedEntries = data.entries.map((entry) =>
      entry.timestamp === updatedEntry.timestamp ? updatedEntry : entry
    );

    // Update the document in Firestore
    await updateDoc(dayDocRef, { entries: updatedEntries });

    console.log("Mood updated successfully!");
  } catch (error) {
    console.error("Error updating mood:", error);
    throw error;
  }
};

export const deleteMood = async (userId, date, timestamp) => {
  try {
    // Reference the day's document in Firestore
    const dayDocRef = doc(FIRESTORE_DB, "users", userId, "Mood", date);

    // Fetch the existing document
    const docSnap = await getDoc(dayDocRef);

    if (!docSnap.exists()) {
      throw new Error("No data found for the specified date.");
    }

    // Filter out the mood with the matching timestamp
    const data = docSnap.data();
    const updatedEntries = data.entries.filter((entry) => entry.timestamp !== timestamp);

    // Update the document in Firestore
    await updateDoc(dayDocRef, { entries: updatedEntries });

    console.log("Mood deleted successfully!");
  } catch (error) {
    console.error("Error deleting mood:", error);
    throw error;
  }
};

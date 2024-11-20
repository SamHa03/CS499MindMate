// firestoreHelpers.js
import { FIRESTORE_DB } from '../config/firebase-config';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, arrayUnion, arrayRemove } from 'firebase/firestore';

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

export const updateUserData = async (userId, updates) => {
  try {
    await updateDoc(doc(FIRESTORE_DB, "users", userId), updates);
    console.log("User data updated successfully!");
  } catch (error) {
    console.error("Error updating user data: ", error);
  }
};

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

// Fetch user data from Firestore
export const fetchProfileData = async (userId) => {
  try {
    if (!userId) throw new Error("User ID is required");
    const userRef = doc(FIRESTORE_DB, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data(); // Return user data
    } else {
      console.error("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

/**
 * Fetch all tasks for a user.
 */
export const fetchTasks = async (userId) => {
  try {
    const tasksRef = collection(FIRESTORE_DB, `users/${userId}/tasks`);
    const querySnapshot = await getDocs(tasksRef);
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push(doc.data());
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

/**
 * Add a task for a specific user.
 */
export const addTask = async (userId, task) => {
  try {
    const taskId = `${new Date().getTime()}`; // Unique ID based on timestamp
    const taskRef = doc(FIRESTORE_DB, `users/${userId}/tasks`, taskId);
    await setDoc(taskRef, {
      id: taskId,
      name: task.name,
      date: task.date,
      time: task.time,
      completed: false,
    });
    console.log("Task added successfully!");
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

/**
 * Remove a task for a specific user.
 */
export const removeTask = async (userId, taskId) => {
  try {
    const taskRef = doc(FIRESTORE_DB, `users/${userId}/tasks`, taskId);
    await deleteDoc(taskRef);
    console.log("Task removed successfully!");
  } catch (error) {
    console.error("Error removing task:", error);
    throw error;
  }
};

// firestoreHelpers.js
import { FIRESTORE_DB } from './FirebaseConfig';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

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

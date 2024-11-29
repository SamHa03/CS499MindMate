// Styles/AppStyles.js
// Styles for App.js

// **Imports**
import { StyleSheet } from "react-native";

// **Main Export**
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    backgroundColor: "#F2EEE9",
  },
  circleBehind: {
    backgroundColor: "#d4c3b4",
    width: 50,
    height: 50,
    borderRadius: 60,
    position: "absolute",
    bottom: -20,
    left: "50%",
    transform: [{ translateX: -60 }],
    zIndex: 0,
  },
});
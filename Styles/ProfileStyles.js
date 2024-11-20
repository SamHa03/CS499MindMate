// Styles/ProfileStyles.js
// Styles for Screens/ProfileScreen.js

// **Imports**
import { StyleSheet } from "react-native";

// **Main Export**
export const styles = StyleSheet.create({
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
    height: 10,
  },
});

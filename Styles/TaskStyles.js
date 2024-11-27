// Styles/TaskStyles.js
// Styles for Screens/TaskScreen.js

// **Imports**
import { StyleSheet } from "react-native";

// **Main Export**
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EEE9",
    maxHeight: 700,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#69655E",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  taskDetails: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  taskDate: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});

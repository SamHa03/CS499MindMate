// Styles/CalendarStyles.js
// Styles for Screens/CalendarScreen.js

// **Imports**
import { StyleSheet } from "react-native";

// **Main Export**
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F2EEE9",
  },
  calStyling: {
    width: "90%",
    backgroundColor: "#F2EEE9",
    marginTop: 25,
    marginBottom: 25,
    borderWidth: 3,
    borderColor: "#69655E",
    borderRadius: 20,
    padding: 20,
  },
  taskHeaderText: {
    fontSize: 22,
    fontWeight: "thin",
    color: "#69655E",
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D4E09B",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    width: "90%",
  },
  taskText: {
    fontSize: 18,
    color: "#69655E",
  },
  noTaskText: {
    fontSize: 18,
    color: "white",
    backgroundColor: "#CBABD1",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    width: "90%",
  },
});

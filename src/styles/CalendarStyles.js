// styles/CalendarStyles.js
// Styles for CalendarScreen.js

// **Imports**
import { StyleSheet } from "react-native";

// **Main Export**
export const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#F2EEE9",
    flex: 1,
    alignItems: "center",
  },
  calStyling: {
    backgroundColor: "#F2EEE9",
    marginTop: 25,
    marginBottom: 25,
    borderWidth: 3,
    borderColor: "#69655E",
    borderRadius: 20,
    padding: 20,
    justifyContent: "flex-start",
    width: "100%",
  },
  taskHeaderText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "thin",
    color: "#69655E",
    textDecorationLine: "underline",
  },
  taskText: {
    alignSelf: "center",
    backgroundColor: "#D4E09B",
    margin: 10,
    paddingLeft: 80,
    paddingRight: 80,
    fontSize: 24,
    color: "#69655E",
    borderRadius: 10,
    overflow: "hidden",
    minWidth: 300,
    textAlign: "center",
  },
  noTaskText: {
    alignSelf: "center",
    backgroundColor: "#CBABD1",
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 24,
    color: "white",
    borderRadius: 10,
    overflow: "hidden",
    minWidth: 300,
    textAlign: "center",
  },
});

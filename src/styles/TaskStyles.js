// styles/TaskStyles.js
// Styles for TaskScreen.js

// **Imports**
import { StyleSheet } from "react-native";

// **Main Export**
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EEE9",
    padding: 20,
  },
  taskText: {
    fontSize: 16,
    margin: 10,
    backgroundColor: "#D4E09B",
    padding: 10,
    borderRadius: 5,
    color: "#333",
  },
  noTaskText: {
    textAlign: "center",
    fontSize: 16,
    color: "#69655E",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4acfc9",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#69655E",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#4acfc9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#e65151",
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});

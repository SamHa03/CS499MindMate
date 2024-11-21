// Styles/TaskStyles.js
// Styles for Screens/TaskScreen.js

// **Imports**
import { StyleSheet } from "react-native";

// **Main Export**
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EEE9",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  colorPickerButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  colorPickerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  colorPickerModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  colorPickerModalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: "#4acfc9",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#CBABD1",
  },
  addButton: {
    backgroundColor: "#4acfc9",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

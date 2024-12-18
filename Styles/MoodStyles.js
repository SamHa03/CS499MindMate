import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F2EEE9",
    flex: 1,
    justifyContent: "flex-start",
    maxHeight: 700,
    padding: 20,
  },
  safeArea: {
    width: "100%",
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F2EEE9",
    paddingVertical: 20,
    width: "100%",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedBorder: {
    width: 2,
    color: "#AAA",
  },
  noteContainer: {
    width: "90%",
    marginVertical: 10,
  },
  noteInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  moodLogContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  scrollableLog: {
    flexGrow: 1,
  },
  moodLogText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#333",
  },
  moodLogItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  moodLogItemText: {
    color: "#AAA",
    fontSize: 16,
    fontWeight: "bold",
  },
  moodLogHeader: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  calendarDropdown: {
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: "#F2EEE9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  calendarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },  
});

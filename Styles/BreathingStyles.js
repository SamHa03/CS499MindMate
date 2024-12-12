import { StyleSheet } from "react-native";

// Define color constants
const LIGHT_PURPLE = "#9B8FB6";
const ORANGE = "#F19C79";
const LIGHT_TAN = "#F2EEE9";
const MED_TAN = "#d4c3b4";
const LIGHT_BLUE = "#a7bed";
const DARK_GREEN = "#495c60";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: LIGHT_TAN,
    paddingTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LIGHT_TAN,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: MED_TAN,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  timerText: {
    fontSize: 48,
    color: LIGHT_TAN,
    textAlign: "center",
  },
  messageText: {
    marginBottom: 20,
    fontSize: 35,
    color: LIGHT_BLUE,
  },
  buttonText: {
    color: LIGHT_TAN,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  pomTimerText: {
    color: LIGHT_PURPLE,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 32,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  pomFocusText: {
    color: DARK_GREEN,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  closebutton: {
    position: "absolute",
    top: 50,
    right: 25,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
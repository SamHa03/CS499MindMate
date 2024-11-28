// Styles/LoginStyles.js
// Styles for Screens/LoginScreen.js

// **Imports**
import { StyleSheet } from "react-native";

// **Main Export**
export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2eee9',
    flex: 1,
    justifyContent: 'center',
    verticalAlign: 'top',
    marginHorizontal: 20,
    paddingBottom: 120,
  },
  iconContainer: {
    alignSelf: "center",
    alignContent: 'center',
    bottom: 20,
    marginHorizontal: -150,
    marginVertical: -100,
    position: 'absolute',
  },
  iconText: {
    alignSelf: "center",
    alignContent: 'center',
    color: "#a06649",
    fontSize: 80,
    fontWeight: "bold",
    marginVertical: 120,
    paddingLeft: 35,
    position: 'absolute',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  text: {
    color: '#69655E',
  }
});

// Styles/TimerStyles.js
// Styles for Screens/TimerStyles.js

// **Imports**
import { StyleSheet } from "react-native";

// ==============  Styling Begins Here ======================
const LIGHT_PURPLE = "#9B8FB6";
const ORANGE = "#F19C79";
const LIGHT_TAN ="#F2EEE9";
const MED_TAN = '#d4c3b4';
const LIGHT_BLUE = "#a7bed";
const DARK_GREEN = "#495c60";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: LIGHT_TAN,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: LIGHT_TAN,
    },
    circle: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    timerText: {
      fontSize: 48,
      paddingBottom: 50,
      position: "absolute",
      color: LIGHT_TAN,
      left: 38,
      top: 20,
    },
    messageText: {
      bottom: 150,
      fontSize: 35,
      color: "#a7bed",
    },
    circleBehind: {
      backgroundColor:  MED_TAN, // Gold background color for the circle
      width: 120,
      height: 120,
      borderRadius: 60, // Circle shape
      position: "absolute",
      bottom: 5, // Makes it jut out above the bottom container
      left: "50%", // Center the circle horizontally
      transform: [{ translateX: -60 }], // Adjust positioning to center it properly
      zIndex: 0, // Ensures the circle is behind the home button
    },
    timerButtonStyle: {
      backgroundColor: MED_TAN, // Gold background color for the circle
      width: 120,
      height: 120,
      borderRadius: 60, // Circle shape
      position: "center",
      transform: [{ translateX: 50 }, { translateY: -275 }], // Adjust positioning to center it properly
    },
    timerButtonStyleFocus1: {
      backgroundColor: MED_TAN, // Gold background color for the circle
      width: 120,
      height: 120,
      borderRadius: 60, // Circle shape
      position: "center",
      transform: [{ translateX: 105 }, { translateY: -275 }], // Adjust positioning to center it properly
    },
    timerButtonStyleFocus5: {
      backgroundColor: MED_TAN, // Gold background color for the circle
      width: 120,
      height: 120,
      borderRadius: 60, // Circle shape
      position: "center",
      transform: [{ translateX: -190 }, { translateY: -75 }], // Adjust positioning to center it properly
    },
    timerButtonStyleFocus10: {
      backgroundColor: MED_TAN, // Gold background color for the circle
      width: 120,
      height: 120,
      borderRadius: 60, // Circle shape
      position: "center",
      transform: [{ translateX: -305 }, { translateY: 125 }], // Adjust positioning to center it properly
    },
    timerButtonStyleFocus30: {
      backgroundColor: MED_TAN, // Gold background color for the circle
      width: 120,
      height: 120,
      borderRadius: 60, // Circle shape
      position: "center",
      transform: [{ translateX: -260 }, { translateY: 125 }], // Adjust positioning to center it properly
    },
    timerButtonStyleFocusHour: {
      backgroundColor: MED_TAN, // Gold background color for the circle
      width: 120,
      height: 120,
      borderRadius: 60, // Circle shape
      position: "center",
      transform: [{ translateX: -375 }, { translateY: -75 }], // Adjust positioning to center it properly
    },
    buttonText: {
      color: LIGHT_TAN,
      fontWeight: "bold",
      fontSize: 15,
      transform: [{ translateX: 15 }, { translateY: 30 }],
      zIndex: 1,
    },
    pomTimerText: {
      color: LIGHT_PURPLE,
      fontWeight: "bold",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontSize: 32,
      // ios drop shadow
      shadowColor: "#000000",                 // black
      shadowOffset: { width: 2, height: 4 },  // offset in x and y
      shadowOpacity: 0.2,                     // mostly transparent
      shadowRadius: 1,                        // crisp shadow
  
      // android drop shadow
      elevation: 10,                          // shadow
    },
    pomFocusText: {
      color: DARK_GREEN,
      fontWeight: "bold",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 36,
      // ios drop shadow
      shadowColor: "#000000",                 // black
      shadowOffset: { width: 4, height: 2 },  // offset in x and y
      shadowOpacity: 0.5,                     // somewhat opaque
      shadowRadius: 6,                        // blur radius of shadow
  
      // android drop shadow
      elevation: 10,                          // shadow
    },
    closebutton: {
      position: 'absolute',
      top: 50,
      right: 25,
      shadowOffset: { width: 2, height: 4 },  // offset in x and y
      shadowOpacity: 0.2,                     // mostly transparent
      shadowRadius: 1,                        // crisp shadow
    }
  });
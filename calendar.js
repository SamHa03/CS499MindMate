import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";

function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calStyling}
        // user can swipe to navigate through months or arrows
        enableSwipeMonths
        // styling for calendar and days
        theme={{
          monthTextColor: "#69655E",
          textMonthFontSize: 30,
          textMonthFontWeight: "thin",
          arrowColor: "#69655E",
          calendarBackground: "#F2EEE9",
          dayTextColor: "#AFBFAA",
          textInactiveColor: "#69655E",
          textSectionTitleColor: "#69655E",
          textDayHeaderFontWeight: "bold",
          textDayFontWeight: "bold",
          textDisabledColor: "#D4C3B4",
        }}
      />
      <Text style={styles.taskHeaderText}>
        {/* this is a hard coded placeholder */}
        Today's Tasks:
      </Text>
      {/* scroll view allows user to scroll to see all tasks in task list */}
      <ScrollView>
        {/* These are placeholders for when we connect up the to-dos */}
        <Text style={styles.testTask1}> eat breakfast</Text>
        <Text style={styles.testTask2}> run 1 mile</Text>
        <Text numberOfLines={1} style={styles.navBar}>
          Nav Bar Placeholder
        </Text>
      </ScrollView>
    </View>
  );
}

export default CalendarScreen;

// styling starts here
const styles = StyleSheet.create({
  // styles the entire page
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#F2EEE9",
    flex: 1,
    alignItems: "center",
  },
  // calendar styling
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
  // task heading text styling
  taskHeaderText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "thin",
    color: "#69655E",
    textDecorationLine: "underline",
  },
  testTask1: {
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
  testTask2: {
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
  // placeholder styling for nav bar
  navBar: {
    textAlign: "center",
    fontWeight: "bold",
    alignContent: "flex-end",
    marginTop: 80,
    padding: 50,
    fontSize: 18,
    justifyContent: "flex-end",
  },
});

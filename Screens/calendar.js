// CalendarScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calendar Screen placeholder.</Text>
    </View>
  );
};


// from Garrett: modified the CalendarScreen component to display tasks for each day
// and allow the user to select a date to view tasks for that day.
// also added some small styling things like a circle behind the selected date on the calendar
// as well as red dots to indicate tasks for each day
// function CalendarScreen({ tasks, removeTask }) {

//   // set the current date as the selected date
//   const currentDate = new Date().toLocaleDateString('en-CA');
  
//   // create a useState hook to store the selected date
//   const [selectedDate, setSelectedDate] = useState(currentDate);

//   // create a useState hook to store the selected tasks
//   const [selectedTasks, setSelectedTasks] = useState(tasks[currentDate] || []);

//   // function to set the selected date to the date that was pressed on the calendar by the user
//   useEffect(() => {
//     setSelectedTasks(tasks[selectedDate] || []);
//   }, [tasks, selectedDate]);

//   const onDayPress = (day) => {
//     setSelectedDate(day.dateString);
//   };

//   // function to complete a task
//   function completeTask(index) {
//     removeTask(selectedDate, index);
//   }

//   // generates red dots for the calendar based on the tasks for each day
//   const dotsMarkedDates = {};
//   Object.keys(tasks).forEach((date) => {
//     if (tasks[date].length > 0) {
//       dotsMarkedDates[date] = {
//         dots: tasks[date].slice(0, 3).map((task, index) => ({
//           key: index,
//           color: '#e65151',
//         })),
//         markingType: 'multi-dot',
//       };
//     }
//   });

//   // move a blue dot to the selected date
//   dotsMarkedDates[selectedDate] = {
//     ...(dotsMarkedDates[selectedDate] || {}),
//     selected: true,
//     selectedColor: '#4acfc9',
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.circleBehind} />
//       <Calendar
//         style={styles.calStyling}
//         enableSwipeMonths
//         theme={{
//           monthTextColor: "#69655E",
//           textMonthFontSize: 30,
//           textMonthFontWeight: "thin",
//           arrowColor: "#69655E",
//           calendarBackground: "#F2EEE9",
//           dayTextColor: "#AFBFAA",
//           textInactiveColor: "#69655E",
//           textSectionTitleColor: "#69655E",
//           textDayHeaderFontWeight: "bold",
//           textDayFontWeight: "bold",
//           textDisabledColor: "#D4C3B4",
//           todayTextColor: "#4acfc9",
//         }}
//         markedDates={dotsMarkedDates}
//         markingType={'multi-dot'}
//         onDayPress={onDayPress}
//       />
//       {/* display tasks for the selected date, otherwise display a placeholder */}
//       <Text style={styles.taskHeaderText}>
//         Tasks for {selectedDate}:
//       </Text>
//       <ScrollView>
//         {selectedTasks.length > 0 ? (
//           selectedTasks.map((task, index) => (
//             <Pressable key={index} onPress={() => completeTask(index)}>
//               <Text style={styles.taskText}>{task.name}</Text>
//             </Pressable>
//           ))
//         ) : (
//           <Text style={styles.noTaskText}>No tasks for this date</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

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
  circleBehind: {
    backgroundColor: '#d4c3b4', // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60, // Circle shape
    position: 'absolute',
    bottom: 5, // Makes it jut out above the bottom container
    left: '50%', // Center the circle horizontally
    transform: [{ translateX: -60 }], // Adjust positioning to center it properly
    zIndex: 1, // Ensures the circle is behind the home button (edited by garrett: the circle was behind tasks when scrolling)
  },
});

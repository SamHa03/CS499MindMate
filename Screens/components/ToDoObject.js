// ToDoObject.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// from Garrett: made some modifications to the styles to make the text wrap
// and align the checkbox circle with the first line of text.
// this should make the ToDoObject component look better when the task name is long
const ToDoObject = (props) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{props.name}</Text>
            <Text style={styles.itemDate}>Due at {props.time}</Text>
          </View>
        </View>
        <View style={styles.circular}></View>
      </View>
    );
};

const styles = StyleSheet.create({
    item: {
      backgroundColor: "#FFF",
      padding: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'flex-start', // changed from 'center' to 'flex-start'
      justifyContent: 'space-between',
      marginBottom: 20, 
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'flex-start', // changed from 'center' to 'flex-start'
      flex: 1,
    },
    textContainer: {
      flex: 1,
      flexShrink: 1, // allows the container to shrink if necessary
    },
    square: {
      width: 24,
      height: 24,
      backgroundColor: "#55BCF6",
      opacity: 0.4,
      borderRadius: 5,
      marginRight: 15,
      marginTop: 3, // align square with the first line of text
    },
    itemName: {
      fontSize: 18,
      color: "#333",
      flexWrap: 'wrap',
    },
    itemDate: {
      fontSize: 14,
      color: "#999",
      flexWrap: 'wrap',
    },
    circular: {
      width: 12,
      height: 12,
      borderColor: "#55BCF6",
      borderWidth: 2,
      borderRadius: 6,
      marginTop: 3, // align checkbox circle with the first line of text
    },
  });

export default ToDoObject;

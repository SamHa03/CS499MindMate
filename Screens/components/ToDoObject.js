import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

const ToDoObject = (props) => {

    return (
    <View style={styles.item}>
        <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <View style={styles.textContainer}>
                <Text style={styles.itemText}>{props.name}</Text>
                <Text style={styles.dueDateText}>Due: {props.date}</Text>
            </View>
        </View>
        <View style={styles.circular}></View>
    </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20, 
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24, 
        height: 24,
        backgroundColor: '#55BCF6', // will be tied to a user color option eventually
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        flexShrink: 1,
        maxWidth: '100%',
        color: '#60655e',
        fontWeight: 'bold',
    },
    dueDateText: {
        flexShrink: 1,
        maxWidth: '100%',
        color: '#d4c3b4',
    },
    textContainer: {
        flexDirection: 'column',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#d4c3b4',
        borderWidth: 2,
        BorderRadius: 5,
    },
    items: {
        marginTop: 30,
    },
});

export default ToDoObject;
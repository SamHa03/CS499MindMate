import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// moodscreen is a component that displays the text on the screen when passed an array of strings
// this is used in the moodlayout component to display the emotions felt by the user whenever they press a mood button
const MoodScreen = ({ text }) => {
    emotionalData = {};
    return (
        <View style={styles.container}>
            {text.map((message, index) => (
                <Text key={index} style={styles.text}>{message}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#F2EEE9",
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default MoodScreen;
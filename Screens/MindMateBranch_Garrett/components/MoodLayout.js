import React, { useState, useCallback } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoodScreen from './MoodScreen';
import MoodBar from './MoodBar';


// moodlayout is the main component for the mood tracker's screen.
const MoodLayout = () => {
    // define mood buttons with their colors and functions
    const moodButtons = {
        Pleasant: {
            color: '#77ff73',
            function: () => recordEmotion("Pleasant"),
        },
        SlightlyPleasant: {
            color: '#d0ff73',
            function: () => recordEmotion("Slightly Pleasant"),
        },
        Neutral: {
            color: '#fffd73',
            function: () => recordEmotion("Neutral"),
        },
        SlightlyUnpleasant: {
            color: '#fcaf51',
            function: () => recordEmotion("Slightly Unpleasant"),
        },
        Unpleasant: {
            color: '#fc5151',
            function: () => recordEmotion("Unpleasant"),
        },
    };

    // an array to store the text to be displayed on the screen
    const [textArray, setTextArray] = useState([
        "Hello. How are you feeling today?",
    ]);

    // an object to store the emotional data. this isnt defined in this component, but is passed down to MoodScreen
    const [emotionalData, setEmotionalData] = useState({});

    // records the emotion in the emotionalData object
    const recordEmotion = useCallback((emotion) => {
        const now = new Date();
        const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:MM

        // update the emotional data object with the new emotion, so that it can be displayed on the screen
        setEmotionalData(prevData => {
            const newData = {
                ...prevData,
                [dateString]: {
                    ...prevData[dateString],
                    // storing it as lowercase to make it easier to compare later
                    [timeString]: emotion.toLowerCase(),
                },
            };

            // update the text array to display each emotion felt today
            const newTextArray = ["Here is how you have felt over the course of today:"];
            for (const date in newData) {
                newTextArray.push(`On ${date}:`);
                for (const time in newData[date]) {
                    newTextArray.push(`At ${time}, you said you felt ${newData[date][time]}.`);
                }
            }

            // force the component to re-render with the new text array
            setTextArray(newTextArray);

            // log the emotional data to the console for debugging
            console.log("Current Emotional Data: ", JSON.stringify(newData, null, 2));

            // save the updated data to AsyncStorage
            AsyncStorage.setItem('emotionalData', JSON.stringify(newData));

            return newData;
        });

    }, []);

    // assemble the components
    return (
        <View style={styles.container}>
            <View style={styles.screenContainer}>
                <MoodScreen text={textArray} />
            </View>
            {/* build the MoodBar and its buttons with the moodButtons dictionary */}
            <MoodBar moods={moodButtons} />
        </View>
    );
};

// styles, blah blah blah
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MoodLayout;
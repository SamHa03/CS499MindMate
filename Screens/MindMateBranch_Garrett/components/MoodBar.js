import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';


// this is the mood bar. it generates mood buttons based on the moods object passed to it
// each mood button has a color and a function that is called when the button is pressed
// 'moods' is a dictionary of mood keys that determine the color and function of each button
// in hindsight, it would have been better to use an array of objects instead of a dictionary,
// but hindsight is 20/20
export default function MoodBar({ moods }) {
    const screenWidth = Dimensions.get('window').width; // get the width of the screen
    const moodKeys = Object.keys(moods); // get the keys of the moods object
    const circleSize = screenWidth / (moodKeys.length * 1.5); // automatically scale the size of the circles based on the number of moods

    // assemble the mood buttons
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {moodKeys.map((mood, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[styles.circle, { backgroundColor: moods[mood].color, width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}
                        onPress={moods[mood].function || (() => {})} // attach handler if exists, otherwise do nothing
                    ></TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#F2EEE9',
        paddingVertical: 100,
        width: '100%',
    },
    circle: {
        marginHorizontal: 5,
    },
});

import React, {useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet, Pressable} from 'react-native';

const BreathingAction = () => {
    const scaleValue = useRef(new Animated.Value(1)).current; //Opacity used for the animation

    const [breathingHistory, setBreathingHistory] = useState([]); //Breathing history array

    const [breathingButtonToggle, setBreathingButtonToggle] = useState(false); //Toggle that decides whether the breathing excersice button is pressable

    const [message, setMessage] = useState(""); // Breath in, hold and out variable

    const[time, setTime] = useState(0); //Time that shows for what section the breathing exercise is on
    const[isRunning, setIsRunning] = useState(false); //Toggle if the timer is running or not

    //Adds to the history array
    function addToHistory(){ 
        setBreathingHistory([...breathingHistory, 
            {date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString()}]);
    }

    /* effect that waits for the change of isRunning for true.
    If true then it starts the timer. If false it stops the timer and resets time to 1;
    */
    useEffect(() => {
        setTime(1);
        let interval;
        if (isRunning) {
            interval = setInterval(() =>{
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    //Animation steps for the circle expanding and shrinking
    //Since the function executes everthing at once without waiting for the timeout 
    //  of the previous stage to finish the different stages run after waiting for 
    //  a combined time of all of the previous stages.
    //For example the "Hold your breath stage" executes after 4 seconds of waiting rather than
    //  until for timeing to finish.
    const BreathingCircleAnimation = ()=> {
        setMessage("Breathe in"); //Sets the message to "Breath in"
        
        Animated.timing(scaleValue, { //Expands the circle over 4 seconds
            color: '#7b7167',
            toValue: 2,
            duration: 4000,
            useNativeDriver: true,
        }).start();
        
        setTimeout(() => { //The circle doesn't move, however the timer does reset
            setMessage("Hold your Breath");
            setIsRunning(false);
            setIsRunning(true);
        }, 4000)

        setTimeout(() => { //Circle shrinks, message changes
            setMessage("Breath Out");
            Animated.timing(scaleValue, {
                color: '#7b7167',
                toValue: 1,
                duration: 8000,
                useNativeDriver: true,
            }).start();

            setIsRunning(false);
            setIsRunning(true);
        }, 11000)

        setTimeout(() => { //Completely resets the timer and re-enables the breathing exercise button
            setBreathingButtonToggle(false);
            setIsRunning(false);
        }, 19000)
    };

    return (
        <View style={styles.container}>
            <View style={styles.circleBehind} />  

            {/*Message that shows In, Hold, and out messages*/}
            <Text>{message}</Text> 

            {/*Shows the timer*/}
            <Text style={styles.timerText}>{time}</Text>
            
            {/*Cirlce that expands is also a pressable*/}
            <Pressable disabled={breathingButtonToggle} onPress={() => {
                setBreathingButtonToggle(true); //Disables pressable
                setIsRunning(true); //Starts the timer
                BreathingCircleAnimation(); //Begins the animation
                addToHistory(); //Adds the session to the array
                }}>
                <Animated.View //Animated view that allows for the transformation of the circle
                style={[
                    styles.circle,
                    {transform: [{scale: scaleValue}]}
                ]}
                />
            </Pressable>
        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F2EEE9",
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#dce6b9',
        
    },
    timerText:{
        color: '#7b7167',
        fontSize: 48,
        paddingBottom: 50,
    },
    circleBehind: {
        backgroundColor: '#d4c3b4', // Gold background color for the circle
        width: 120,
        height: 120,
        borderRadius: 60, // Circle shape
        position: 'absolute',
        bottom: 0, // Makes it jut out above the bottom container
        left: '50%', // Center the circle horizontally
        transform: [{ translateX: -60 }], // Adjust positioning to center it properly
        zIndex: 0, // Ensures the circle is behind the home button
      },
});

export default BreathingAction;


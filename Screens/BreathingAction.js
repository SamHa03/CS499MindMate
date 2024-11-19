import { isRunningInExpoGo } from "expo";
import React, {useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet, Pressable} from 'react-native';

const BreathingAction = () => {
    const scaleValue = useRef(new Animated.Value(1)).current; //Transform Value used for the animation

    const [breathingHistory, setBreathingHistory] = useState([]); //Breathing history array

    const [breathingButtonToggle, setBreathingButtonToggle] = useState(false); //Toggle that decides whether the breathing excersice button is pressable

    const [message, setMessage] = useState("Press the Circle to Begin"); // Breath in, hold and out variable
    const [colorOfCircle, setColorOfCircle] = useState("#F19C79"); //Color that the circle changes to 

    const[time, setTime] = useState(1); //Time that shows for what section the breathing exercise is on
    const[isRunning, setIsRunning] = useState(false); //Toggle if the timer is running or not
    const[showTime, setShowTime] = useState(0); //Time that is actually shown to the user

    //Adds to the history array
    function addToHistory(){ 
        setBreathingHistory([...breathingHistory, 
            {date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString()}]);
    }

    /* 
    Main driver of breathing action. Checks with a non-showing timer to see if the showing timer needs to be reset. 
    Then calls each part of the animation that deals with increasing and shrinking the circle. 
    */
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() =>{
                setTime((prevTime) => prevTime + 1); //increments the main time
                if (time == 1){ //Begins the animation
                    BreathIn();
                }
                else if (time == 4){ //Animation does nothing while text changes and changes the color of the circle
                    setShowTime(0);
                    setMessage("Hold your Breath");
                    setColorOfCircle("#A44A3F");
                }
                else if (time == 11){ //Animation shrinks, text changes and the color of the circle changes.
                    setShowTime(0);
                    setMessage("Breath Out");
                    BreathOut();
                    setColorOfCircle("#D4E09B");
                }
                else if (time == 19){ //Resets the timer
                    setShowTime(0);
                    setMessage("Press the Circle to Begin");
                    setBreathingButtonToggle(false);
                    setIsRunning(false); //Disables the timer
                    setColorOfCircle("#F19C79");
                }
                setShowTime((showTime) => showTime + 1); //Increments the show timer
            }, 1000);

        } else { //if the timer is not running then set the non-show and the show times to 1 and clear the interval.
            setTime(1);
            setShowTime(1);  
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    //Animation steps for the circle expanding and shrinking
    //Since the function executes everthing at once without waiting for the timeout 
    //  of the previous stage to finish the different stages run after waiting for 
    //  a combined time of all of the previous stages.
    //For example the "Hold your breath stage" executes after 4 seconds of waiting rather than
    //  until for timeing to finish.
    //Animation for expanding the circle
    const BreathIn = () => {
        Animated.timing(scaleValue, { //Expands the circle over 4 seconds
            toValue: 2,
            duration: 4000,
            useNativeDriver: true,
        }).start();
    };

    //Animation for shrinking the circle
    const BreathOut= () => {   
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 8000,
            useNativeDriver: true,
        }).start();
    };


    return (
        <View style={styles.container}>
            <Text style={[styles.messageText]}>{message}</Text> 
            <View style={styles.circleBehind} />  

            {/*Message that shows In, Hold, and out messages*/}
            

            {/*Cirlce that expands is also a pressable*/}
            <Pressable disabled={breathingButtonToggle} onPress={() => {
                setBreathingButtonToggle(true); //Disables pressable
                setMessage("Breathe in");
                setIsRunning(true); //Starts the timer
                addToHistory(); //Adds the session to the array
                }}>
                <Animated.View //Animated view that allows for the transformation of the circle
                backgroundColor={colorOfCircle} //Sets the color of the circle
                style={[
                    styles.circle,
                    {transform: [{scale: scaleValue}]}
                ]
                }
                />
                <Text style={styles.timerText}>{showTime}</Text>
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
    },
    timerText:{
        fontSize: 48,
        paddingBottom: 50,
        position: 'absolute',
        color: '#F2EEE9',
        left: 38,
        top: 20,
    },
    messageText:{
        bottom: 150,
        fontSize: 35,
        color: "#a7bed3",
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
        zIndex: 0, // Ensures the circle is behind the home button
      },
});

export default BreathingAction;


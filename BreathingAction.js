import React, {useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet, Pressable} from 'react-native';

const BreathingAction = () => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const [breathingHistory, setBreathingHistory] = useState([]);

    const [breathingButtonToggle, setBreathingButtonToggle] = useState(false);

    const [message, setMessage] = useState("");

    const[time, setTime] = useState(0);
    const[isRunning, setIsRunning] = useState(false);


    function addToHistory(){
        setBreathingHistory([...breathingHistory, 
            {date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString()}]);
    }

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

    const BreathingCircleAnimation = ()=> {
        setMessage("Breathe in");
        Animated.timing(scaleValue, {
            toValue: 2,
            duration: 4000,
            useNativeDriver: true,
        }).start();
        
        setTimeout(() => {
            setMessage("Hold your Breath");
            setIsRunning(false);
            setIsRunning(true);
        }, 4000)

        setTimeout(() => {
            setMessage("Breath Out");
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 8000,
                useNativeDriver: true,
            }).start();

            setIsRunning(false);
            setIsRunning(true);
        }, 11000)

        setTimeout(() => {
            setBreathingButtonToggle(false);
            setIsRunning(false);
        }, 19000)
    };

    return (
        <View style={styles.container}>

            <Text>{message}</Text>

            <Text style={styles.timerText}>{time}</Text>
            
            <Pressable disabled={breathingButtonToggle} onPress={() => {
                setBreathingButtonToggle(true); 
                setIsRunning(true); 
                BreathingCircleAnimation();
                addToHistory();
                }}>
                <Animated.View
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
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'blue',
        
    },
    timerText:{
        fontSize: 48,
        paddingBottom: 50,
    },
});

export default BreathingAction;


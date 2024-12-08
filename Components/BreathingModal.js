import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, Pressable, Modal } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../Styles/BreathingStyles";

const BreathingModal = ({ isVisible, onClose }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef(null);

  const [breathingButtonToggle, setBreathingButtonToggle] = useState(false);
  const [message, setMessage] = useState("Press the Circle to Begin");
  const [colorOfCircle, setColorOfCircle] = useState("#F19C79");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTime, setShowTime] = useState(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        if (time === 1) {
          setShowTime(0);
          setMessage("Breathe in");
          setColorOfCircle("#F19C79");
          BreathIn();
        } else if (time === 4) {
          setShowTime(0);
          setMessage("Hold your Breath");
          setColorOfCircle("#A44A3F");
        } else if (time === 11) {
          setShowTime(0);
          setMessage("Breathe Out");
          BreathOut();
          setColorOfCircle("#D4E09B");
        } else if (time === 19) {
          setTime(0);
        }
        setShowTime((showTime) => showTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const BreathIn = () => {
    Animated.timing(scaleValue, {
      toValue: 2,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };

  const BreathOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: true,
    }).start();
  };

  const resetBreathingExercise = () => {
    setMessage("Press the Circle to Begin");
    setBreathingButtonToggle(false);
    setIsRunning(false);
    setColorOfCircle("#F19C79");
    setTime(0);
    setShowTime(0);
    scaleValue.setValue(1);
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.messageText}>{message}</Text>
        <View style={styles.circleBehind} />

        <Pressable
          disabled={breathingButtonToggle}
          onPress={() => {
            setBreathingButtonToggle(true);
            setIsRunning(true);
          }}
        >
          <Animated.View
            backgroundColor={colorOfCircle}
            style={[
              styles.circle,
              { transform: [{ scale: scaleValue }] },
            ]}
          >
            <Text style={styles.timerText}>{showTime}</Text>
          </Animated.View>
        </Pressable>

        <Pressable
          onPress={() => {
            resetBreathingExercise();
            onClose();
          }}
          style={styles.closebutton}
        >
          <Ionicons name="close" size={50} color="#D4E09B" />
        </Pressable>
      </View>
    </Modal>
  );
};

export default BreathingModal;
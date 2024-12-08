import React, { useState, useEffect, useRef } from "react";
import { View, Modal, Pressable, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../Styles/BreathingStyles";

const TimerModal = ({ isVisible, onClose, timerLength }) => {
  const [timeLeft, setTimeLeft] = useState(timerLength * 60); // Convert minutes to seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState("Focus Time");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsTimerRunning(false);
            setTimerMode((prevMode) =>
              prevMode === "Focus Time" ? "Break Time" : "Focus Time"
            );
            return timerMode === "Focus Time" ? timerLength * 60 : 5 * 60; // Switch between focus and break
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isTimerRunning, timerMode]);

  const resetTimer = () => {
    setTimeLeft(timerLength * 60);
    setIsTimerRunning(false);
    setTimerMode("Focus Time");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor:
              timerMode === "Break Time" ? "#D4C3B4" : "#F2EEE9",
          },
        ]}
      >
        <Text style={styles.pomFocusText}>
          {timerMode === "Focus Time" ? "Time to Focus!" : "Time for a Break!"}
        </Text>
        <Pressable
          onPress={() => setIsTimerRunning((prev) => !prev)}
          style={styles.timerButtonStyle}
        >
          <Ionicons
            name={isTimerRunning ? "pause-circle-outline" : "play-circle-outline"}
            color={"#D4E09B"}
            size={80}
            style={{ alignSelf: "center" }}
          />
          <Text style={styles.pomTimerText}>
            {isTimerRunning ? "Stop Timer" : "Start Timer"}
          </Text>
          <Text style={styles.pomTimerText}>{formatTime(timeLeft)}</Text>
        </Pressable>

        {/* Close Button */}
        <Pressable
          onPress={() => {
            resetTimer();
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

export default TimerModal;

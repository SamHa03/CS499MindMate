import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { isRunningInExpoGo } from "expo";

// =================== Breathing Action Begin ========================
const BreathingAction = () => {
  // modal stuff
  const [modalVisibility1, setModalIsVisible1] = useState(false);       // breathing
  const [modalVisibility2, setModalIsVisible2] = useState(false);       // 1 min
  const [modalVisibility10, setModalIsVisible10] = useState(false);     // 10 min
  const [modalVisibility30, setModalIsVisible30] = useState(false);     // 30
  const [modalVisibility5, setModalIsVisible5] = useState(false);       // 5
  const [modalVisibilityHour, setModalIsVisibleHour] = useState(false); // hour

  // pomodoro timer stuff
  const POM_BREAK = 0.2 * 60 * 1000;
  const POM_MINS = 0.1 * 60 * 1000;
  const [pomTimerCount, setPomTimerCount] = useState(POM_MINS);
  const [isPomActive, setIsPomActive] = useState(false);
  const [pomTimerInterval, setPomTimerInterval] = useState(null);
  const [pomTimerMode, setPomTimerMode] = useState("Focus Time");

  // breathing exercise stuff
  const scaleValue = useRef(new Animated.Value(1)).current; //Opacity used for the animation

  const [breathingHistory, setBreathingHistory] = useState([]); //Breathing history array

  const [breathingButtonToggle, setBreathingButtonToggle] = useState(false); //Toggle that decides whether the breathing excersice button is pressable

  const [message, setMessage] = useState(""); // Breath in, hold and out variable

  const [time, setTime] = useState(0); //Time that shows for what section the breathing exercise is on
  const [isRunning, setIsRunning] = useState(false); //Toggle if the timer is running or not

  //Adds to the history array
  function addToHistory() {
    setBreathingHistory([
      ...breathingHistory,
      {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
    ]);
  }

  /* effect that waits for the change of isRunning for true.
    If true then it starts the timer. If false it stops the timer and resets time to 1;
    */
  useEffect(() => {
    setTime(1);
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
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
  const BreathingCircleAnimation = () => {
    setMessage("Breathe in"); //Sets the message to "Breath in"

    Animated.timing(scaleValue, {
      //Expands the circle over 4 seconds
      toValue: 2,
      duration: 4000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      //The circle doesn't move, however the timer does reset
      setMessage("Hold your Breath");
      setIsRunning(false);
      setIsRunning(true);
    }, 4000);

    setTimeout(() => {
      //Circle shrinks, message changes
      setMessage("Breath Out");
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      }).start();

      setIsRunning(false);
      setIsRunning(true);
    }, 11000);

    setTimeout(() => {
      //Completely resets the timer and re-enables the breathing exercise button
      setBreathingButtonToggle(false);
      setIsRunning(false);
    }, 19000);
  };
  // =================== Breathing Action End ========================

  // =================== Pomodoro Timer Begin ========================
  const startPomTimer = () => {
    // if timer not running, change state to on
    if (!isPomActive) {
      setIsPomActive(true);
      const id = setInterval(() => {
        setPomTimerCount((prevTime) => {
            // if the previous time is smaller or equal to 1 second
          if (prevTime <= 1000) {
            clearInterval(id);
            // stop the timer
            setIsPomActive(false);
            // stops the timer from underflowing to 59:59
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      setPomTimerInterval(id);
    }
  };

  // stop timer altogether
  const stopPomTimer = () => {
    if (pomTimerInterval !== null) {
      clearInterval(pomTimerInterval);
      setPomTimerInterval(null);
    }
    setIsPomActive(false);
  };

  useEffect(() => {
    if (pomTimerCount === 0) {
      if (pomTimerMode === "Focus Time") {
        setPomTimerMode("Break Time");
        setPomTimerCount(POM_BREAK);
      } else {
        setPomTimerMode("Focus Time");
        setPomTimerCount(POM_MINS);
      }
      stopPomTimer();
    }
  }, [pomTimerCount]);

  // date object to for proper counting down
  const pomTimerDate = new Date(pomTimerCount);

  // ==============  Return Main Function ======================
  return (
    <View style={styles.container}>
      <View style={styles.circleBehind} />

      {/* FIRST BUTTON */}
      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyle,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisible1(true)}
      >
        <Text style={styles.buttonText}>Breathing</Text>
      </Pressable>

      {/* SECOND BUTTON */}
      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyleFocus1,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisible2(true)}
      >
        <Text style={styles.buttonText}>1 Min Focus</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyleFocus5,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisible5(true)}
      >
        <Text style={styles.buttonText}>5 Min Focus</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyleFocus10,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisible10(true)}
      >
        <Text style={styles.buttonText}>10 Min Focus</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyleFocus30,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisible30(true)}
      >
        <Text style={styles.buttonText}>30 Min Focus</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyleFocusHour,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisibleHour(true)}
      >
        <Text style={styles.buttonText}>Hour Focus</Text>
      </Pressable>

      {/* MODAL 1: Breathing */}
      <Modal
        style={styles.container}
        visible={modalVisibility1}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setModalIsVisible1(false)}>
          <View style={styles.modalContainer}>
            {/*Message that shows In, Hold, and out messages*/}
            <Text style={styles.timerText}>{message}</Text>

            {/*Shows the timer*/}
            <View>
              <Text style={styles.timerText}>{time}</Text>
            </View>

            {/*Cirlce that expands is also a pressable*/}
            <Pressable
              disabled={breathingButtonToggle}
              onPress={() => {
                setBreathingButtonToggle(true); //Disables pressable
                setIsRunning(true); //Starts the timer
                BreathingCircleAnimation(); //Begins the animation
                addToHistory(); //Adds the session to the array
              }}
            >
              <Animated.View //Animated view that allows for the transformation of the circle
                style={[styles.circle, { transform: [{ scale: scaleValue }] }]}
              />
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* MODAL 2: 1 Min Focus */}
      <Modal visible={modalVisibility2} animationType="slide">
        {/* touchable without feedback lets user click anywhere on screen to close modal */}
        <TouchableWithoutFeedback onPress={() => setModalIsVisible2(false)}>
          <View
            style={[
                // use modal styling
              styles.modalContainer,
              {
                backgroundColor:
                  pomTimerMode === "Break Time" ? "#D4C3B4" : "#F2EEE9",
              }, // can flip colors here with conditional to check for mode
            ]}
          >
            <Text>
                {/* flip labels for modes: break time or focus time */}
              {pomTimerMode === "Focus Time"
                ? "Time to Focus!"
                : "Time for a Break!"}
            </Text>

            <Pressable
              style={({ pressed }) => [
                {
                  //   backgroundColor: '#F2EEE9' // the timer!
                },
              ]}
              onPress={() => {
                console.log("start timer");
                console.log("Type of" + typeof pomTimerDate);
                console.log(pomTimerDate instanceof Date);
                // flip between states
                isPomActive ? stopPomTimer() : startPomTimer();
                console.log(pomTimerMode);
              }}
            >
              {/* flip between pictures of play and pause by checking if pom timer is going */}
              <Ionicons
                name={
                  isPomActive ? "pause-circle-outline" : "play-circle-outline"
                }
                color={"#D4E09B"} // pom icon color
                // backgroundColor={isPomActive ? "#D4C3B4" : '#F2EEE9' } // pom icon color background
                size={200}
              />
              {/* flip between labels */}
              <Text style={styles.pomTimerText}>
                {/* flip between words stop and start by checking if pom timer is going */}
                {isPomActive ? "Stop Timer" : "Start Timer"}
              </Text>

              <Text style={styles.pomTimerText}>
                {/* add the extra zeros for two digit display */}
                {pomTimerDate.getMinutes().toString().padStart(2, "0")}:
                {pomTimerDate.getSeconds().toString().padStart(2, "0")}
              </Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* MODAL 3 - 5 Min */}
      <Modal visible={modalVisibility5} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalIsVisible5(false)}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor: "#F2EEE9",
              },
            ]}
          >
            <Text> Modal for 5 min timer </Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* MODAL 4 - 10 Min */}
      <Modal visible={modalVisibility10} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalIsVisible10(false)}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor: "#F2EEE9",
              },
            ]}
          >
            <Text> Modal for 10 min timer </Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* MODAL 5 - 30 min Min */}
      <Modal visible={modalVisibility30} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalIsVisible30(false)}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor: "#F2EEE9",
              },
            ]}
          >
            <Text> Modal for 30 min timer </Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* MODAL 6 - 1 hour  */}
      <Modal visible={modalVisibilityHour} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalIsVisibleHour(false)}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor: "#F2EEE9",
              },
            ]}
          >
            <Text> Modal for 1 Hour timer </Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

// ==============  Styling Begins Here ======================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F2EEE9",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2EEE9",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "blue",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 80,
  },
  timerText: {
    fontSize: 48,
    backgroundColor: "#F2EEE9",
  },
  circleBehind: {
    backgroundColor: "#d4c3b4",         // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60,                   // Circle shape
    position: "absolute",
    bottom: 5,                          // Makes it jut out above the bottom container
    left: "50%",                        // Center the circle horizontally
    transform: [{ translateX: -60 }],   // Adjust positioning to center it properly
    zIndex: 0,                          // Ensures the circle is behind the home button
  },
  timerButtonStyle: {
    backgroundColor: "#d4c3b4",         // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60,                   // Circle shape
    position: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    transform: [{ translateX: 50 }, { translateY: -300 }], // Adjust positioning to center it properly
  },
  timerButtonStyleFocus1: {
    backgroundColor: "#d4c3b4",         // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60,                   // Circle shape
    position: "center",
    justifyContent: "flex start",
    alignItems: "flex-start",
    transform: [{ translateX: 105 }, { translateY: -300 }], // Adjust positioning to center it properly
  },
  timerButtonStyleFocus5: {
    backgroundColor: "#d4c3b4",         // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60,                   // Circle shape
    position: "center",
    justifyContent: "flex start",
    alignItems: "flex-start",
    transform: [{ translateX: -200 }, { translateY: -100 }], // Adjust positioning to center it properly
  },
  timerButtonStyleFocus10: {
    backgroundColor: "#d4c3b4",         // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60,                   // Circle shape
    position: "center",
    justifyContent: "flex start",
    alignItems: "flex-start",
    transform: [{ translateX: -325 }, { translateY: 100 }], // Adjust positioning to center it properly
  },
  timerButtonStyleFocus30: {
    backgroundColor: "#d4c3b4",         // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60,                   // Circle shape
    position: "center",
    justifyContent: "flex start",
    alignItems: "flex-start",
    transform: [{ translateX: -260 }, { translateY: 100 }], // Adjust positioning to center it properly
  },
  timerButtonStyleFocusHour: {
    backgroundColor: "#d4c3b4",         // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60,                   // Circle shape
    position: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    transform: [{ translateX: -375 }, { translateY: -100 }], // Adjust positioning to center it properly
  },
  buttonText: {
    color: "#F2EEE9",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    transform: [{ translateX: 15 }, { translateY: 50 }],
  },
  pomTimerText: {
    color: "#CBABD1",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    marginLeft: 60,
  },
});

export default BreathingAction;

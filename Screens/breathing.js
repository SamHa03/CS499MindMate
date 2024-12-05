// breathing.js
// ======================== Imports ========================
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, Pressable, Modal } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Audio } from "expo-av";
// Styles
import { styles } from "../Styles/TimerStyles";

// =================== Breathing Action Begin ========================
const BreathingAction = () => {
  // set modals and their visibility up
  const [modalVisibilityBreathe, setModalIsVisibleBreathe] = useState(false); // breathing
  const [modalVisibility1, setModalIsVisible1] = useState(false); // 1 min
  const [modalVisibility10, setModalIsVisible10] = useState(false); // 10 min
  const [modalVisibility30, setModalIsVisible30] = useState(false); // 30
  const [modalVisibility5, setModalIsVisible5] = useState(false); // 5
  const [modalVisibility60, setModalIsVisible60] = useState(false); // hour

  // ======================== pomodoro timer stuff ========================
  const POM_BREAK1 = 1 * 60 * 1000; // 1 minute break
  const POM_MINS1 = 1 * 60 * 1000; // 1 minute focus

  const POM_BREAK5 = 5 * 60 * 1000; // 5 minutes break
  const POM_MINS5 = 5 * 60 * 1000; // 5 minutes focus

  const POM_BREAK10 = 10 * 60 * 1000; // 10 minutes break
  const POM_MINS10 = 10 * 60 * 1000; // 10 minutes focus

  const POM_MINS60 = 60 * 60 * 1000; // 60 minutes focus

  const POM_MINS30 = 30 * 60 * 1000; // 30 minutes focus

  // 1 min
  const [pomTimerCount1, setPomTimerCount1] = useState(POM_MINS1);
  const [isPomActive1, setIsPomActive1] = useState(false);
  const [pomTimerInterval1, setPomTimerInterval1] = useState(null);
  const [pomTimerMode1, setPomTimerMode1] = useState("Focus Time");

  // 5 min
  const [pomTimerCount5, setPomTimerCount5] = useState(POM_MINS5);
  const [isPomActive5, setIsPomActive5] = useState(false);
  const [pomTimerInterval5, setPomTimerInterval5] = useState(null);
  const [pomTimerMode5, setPomTimerMode5] = useState("Focus Time");

  // 10 min
  const [pomTimerCount10, setPomTimerCount10] = useState(POM_MINS10);
  const [isPomActive10, setIsPomActive10] = useState(false);
  const [pomTimerInterval10, setPomTimerInterval10] = useState(null);
  const [pomTimerMode10, setPomTimerMode10] = useState("Focus Time");

  // 60 min
  const [pomTimerCount60, setPomTimerCount60] = useState(POM_MINS60);
  const [isPomActive60, setIsPomActive60] = useState(false);
  const [pomTimerInterval60, setPomTimerInterval60] = useState(null);
  const [pomTimerMode60, setPomTimerMode60] = useState("Focus Time");

  // 30 min
  const [pomTimerCount30, setPomTimerCount30] = useState(POM_MINS30);
  const [isPomActive30, setIsPomActive30] = useState(false);
  const [pomTimerInterval30, setPomTimerInterval30] = useState(null);
  const [pomTimerMode30, setPomTimerMode30] = useState("Focus Time");

  // method to play an mp3/wav sound
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/bell_ding.mp3")
    );
    console.log("loaded sound");
    await sound.playAsync();
  };

  // ======================== breathing exercise stuff ========================
  const scaleValue = useRef(new Animated.Value(1)).current; //Transform Value used for the animation

  const [breathingHistory, setBreathingHistory] = useState([]); //Breathing history array

  const [breathingButtonToggle, setBreathingButtonToggle] = useState(false); //Toggle that decides whether the breathing excersice button is pressable

  const [message, setMessage] = useState("Press the Circle to Begin"); // Breath in, hold and out variable
  const [colorOfCircle, setColorOfCircle] = useState("#F19C79"); //Color that the circle changes to

  const [time, setTime] = useState(0); //Time that shows for what section the breathing exercise is on
  const [isRunning, setIsRunning] = useState(false); //Toggle if the timer is running or not
  const [showTime, setShowTime] = useState(0); //Time that is actually shown to the user

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

  /* 
  Main driver of breathing action. Checks with a non-showing timer to see if the showing timer needs to be reset. 
  Then calls each part of the animation that deals with increasing and shrinking the circle. 
  */
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); //increments the main time
        if (time == 1) {
          //Sets the breath in text and begins the animation
          setMessage("Breathe in");
          setColorOfCircle("#F19C79");
          BreathIn();
        } else if (time == 4) {
          //Animation does nothing while text changes and changes the color of the circle
          setShowTime(0);
          setMessage("Hold your Breath");
          setColorOfCircle("#A44A3F");
        } else if (time == 11) {
          //Animation shrinks, text changes and the color of the circle changes.
          setShowTime(0);
          setMessage("Breathe Out");
          BreathOut();
          setColorOfCircle("#D4E09B");
        } else if (time == 19) {
          //Resets the timer
          setBreathingButtonToggle(false);
          setTime(1);
          setShowTime(0);
        }
        setShowTime((showTime) => showTime + 1); //Increments the show timer
        //console.log("Internal: " + time);
        //console.log("Shown: " + showTime);
      }, 1000);
    } else {
      //if the timer is not running then set the non-show and the show times to 1 and clear the interval.
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
    Animated.timing(scaleValue, {
      //Expands the circle over 4 seconds
      toValue: 2,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };

  //Animation for shrinking the circle
  const BreathOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: true,
    }).start();
  };

  const CloseBreathingModal = () => {
    setModalIsVisibleBreathe(false); //Hides the Modal
    setIsRunning(false); //Disables the timer
    setMessage("Press the Circle to Begin"); //Resets the message
    setColorOfCircle("#F19C79"); //Resets the color
    setBreathingButtonToggle(false); //Returns it pressable
    Animated.timing(scaleValue, {
      //rests the circle when the modal closes
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  // =================== Breathing Action End ========================

  // =================== Pomodoro Timer Begin ========================

  // 1 min start timer: checks to see if corresponding timer is active
  // sets and clears the intervals
  const startPomTimer1 = () => {
    if (!isPomActive1) {
      setIsPomActive1(true);
      const id = setInterval(() => {
        setPomTimerCount1((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(id);
            setIsPomActive1(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      setPomTimerInterval1(id);
    }
  };

  // stops the timer: if it isn't null, clear, and stop the timer
  const stopPomTimer1 = () => {
    if (pomTimerInterval1 !== null) {
      clearInterval(pomTimerInterval1);
      setPomTimerInterval1(null);
    }
    setIsPomActive1(false);
  };

  // useEffect: switches between the conditionals of breaks and focus, calls the
  // ding sound when done
  useEffect(() => {
    if (pomTimerCount1 === 0) {
      if (pomTimerMode1 === "Focus Time") {
        setPomTimerMode1("Break Time");
        setPomTimerCount1(POM_BREAK1);
      } else {
        setPomTimerMode1("Focus Time");
        setPomTimerCount1(POM_MINS1);
      }
      console.log("play sound");
      playSound();
    }
  }, [pomTimerCount1]);

  const pomTimerDate1 = new Date(pomTimerCount1);

  // 5 min
  const startPomTimer5 = () => {
    if (!isPomActive5) {
      setIsPomActive5(true);
      const id = setInterval(() => {
        setPomTimerCount5((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(id);
            setIsPomActive5(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      setPomTimerInterval5(id);
    }
  };

  const stopPomTimer5 = () => {
    if (pomTimerInterval5 !== null) {
      clearInterval(pomTimerInterval5);
      setPomTimerInterval5(null);
    }
    setIsPomActive5(false);
  };

  useEffect(() => {
    if (pomTimerCount5 === 0) {
      if (pomTimerMode5 === "Focus Time") {
        setPomTimerMode5("Break Time");
        setPomTimerCount5(POM_BREAK5);
      } else {
        setPomTimerMode5("Focus Time");
        setPomTimerCount5(POM_MINS5);
      }
      console.log("play sound");
      playSound();
    }
  }, [pomTimerCount5]);

  const pomTimerDate5 = new Date(pomTimerCount5);

  // 10 min
  const startPomTimer10 = () => {
    if (!isPomActive10) {
      setIsPomActive10(true);
      const id = setInterval(() => {
        setPomTimerCount10((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(id);
            setIsPomActive10(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      setPomTimerInterval10(id);
    }
  };

  const stopPomTimer10 = () => {
    if (pomTimerInterval10 !== null) {
      clearInterval(pomTimerInterval10);
      setPomTimerInterval10(null);
    }
    setIsPomActive10(false);
  };

  useEffect(() => {
    if (pomTimerCount10 === 0) {
      if (pomTimerMode10 === "Focus Time") {
        setPomTimerMode10("Break Time");
        setPomTimerCount10(POM_BREAK10);
      } else {
        setPomTimerMode10("Focus Time");
        setPomTimerCount10(POM_MINS10);
      }
      console.log("play sound");
      playSound();
    }
  }, [pomTimerCount10]);

  const pomTimerDate10 = new Date(pomTimerCount10);

  // 60 min
  const startPomTimer60 = () => {
    if (!isPomActive60) {
      setIsPomActive60(true);
      const id = setInterval(() => {
        setPomTimerCount60((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(id);
            setIsPomActive60(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      setPomTimerInterval60(id);
    }
  };

  const stopPomTimer60 = () => {
    if (pomTimerInterval60 !== null) {
      clearInterval(pomTimerInterval60);
      setPomTimerInterval60(null);
    }
    setIsPomActive60(false);
  };

  useEffect(() => {
    if (pomTimerCount60 === 0) {
      if (pomTimerMode60 === "Focus Time") {
        setPomTimerMode60("Break Time");
        setPomTimerCount60(POM_BREAK10);
      } else {
        setPomTimerMode60("Focus Time");
        setPomTimerCount60(POM_MINS60);
      }
      console.log("play sound");
      playSound();
    }
  }, [pomTimerCount60]);

  const pomTimerDate60 = new Date(pomTimerCount60);

  // 30 min
  const startPomTimer30 = () => {
    if (!isPomActive30) {
      setIsPomActive30(true);
      const id = setInterval(() => {
        setPomTimerCount30((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(id);
            setIsPomActive30(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      setPomTimerInterval30(id);
    }
  };

  const stopPomTimer30 = () => {
    if (pomTimerInterval30 !== null) {
      clearInterval(pomTimerInterval30);
      setPomTimerInterval30(null);
    }
    setIsPomActive30(false);
  };

  useEffect(() => {
    if (pomTimerCount30 === 0) {
      if (pomTimerMode30 === "Focus Time") {
        setPomTimerMode30("Break Time");
        setPomTimerCount30(POM_BREAK10);
      } else {
        setPomTimerMode30("Focus Time");
        setPomTimerCount30(POM_MINS30);
      }
      console.log("play sound");
      playSound();
    }
  }, [pomTimerCount30]);

  const pomTimerDate30 = new Date(pomTimerCount30);

  // ==============  Return Main Function ======================
  return (
    <View style={styles.container}>
      {/* FIRST BUTTON */}
      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyle,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisibleBreathe(true)}
      >
        <View>
          <Text style={[styles.buttonText, { padding: 10, marginTop: 10 }]}>
            Breathing
          </Text>
        </View>
      </Pressable>

      {/* SECOND BUTTON */}
      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyleFocus1,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisible1(true)}
      >
        <View>
          <Text style={[styles.buttonText, { padding: 5, marginTop: 10 }]}>
            1 Min Focus
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyleFocus5,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisible5(true)}
      >
        <View>
          <Text style={[styles.buttonText, { padding: 35, marginTop: 0 }]}>
            5 Min Focus
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyleFocus10,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisible10(true)}
      >
        <View>
          <Text style={[styles.buttonText, { padding: 10, marginTop: 35 }]}>
            10 Min Focus
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyleFocus30,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisible30(true)}
      >
        <View>
          <Text style={[styles.buttonText, { padding: 10, marginTop: 35 }]}>
            30 Min Focus
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.timerButtonStyleFocusHour,
          { backgroundColor: pressed ? "#FFFFFF" : "#d4c3b4" },
        ]}
        onPress={() => setModalIsVisible60(true)}
      >
        <View>
          <Text
            style={[
              styles.buttonText,
              { padding: 25, marginTop: 15, marginLeft: 10 },
            ]}
          >
            Hour Focus
          </Text>
        </View>
      </Pressable>

      {/* MODAL 1: Breathing */}
      <Modal
        style={styles.container}
        visible={modalVisibilityBreathe}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          {/*Message that shows In, Hold, and out messages*/}
          <Text style={[styles.messageText]}>{message}</Text>

          {/*Cirlce that expands is also a pressable*/}
          <Pressable
            disabled={breathingButtonToggle}
            onPress={() => {
              setBreathingButtonToggle(true); //Disables pressable
              setIsRunning(true); //Starts the timer
              addToHistory(); //Adds the session to the array
            }}
          >
            <Animated.View //Animated view that allows for the transformation of the circle
              backgroundColor={colorOfCircle} //Sets the color of the circle
              style={[styles.circle, { transform: [{ scale: scaleValue }] }]}
            />
            <Text style={styles.timerText}>{showTime}</Text>
          </Pressable>
          <Pressable
            onPress={() => setModalIsVisibleBreathe(false)}
            style={styles.closebutton}
          >
            <Ionicons name="close" size={50} color="#D4E09B"></Ionicons>
          </Pressable>
        </View>
      </Modal>

      {/* MODAL 2: 1 Min Focus */}
      <Modal visible={modalVisibility1} animationType="slide">
        <View
          style={[
            // use modal styling
            styles.modalContainer,
            {
              backgroundColor:
                pomTimerMode1 === "Break Time" ? "#D4C3B4" : "#F2EEE9",
            }, // can flip colors here with conditional to check for mode
          ]}
        >
          <Text style={styles.pomFocusText}>
            {/* flip labels for modes: break time or focus time */}
            {pomTimerMode1 === "Focus Time"
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
              console.log("Type of" + typeof pomTimerDate1);
              console.log(pomTimerDate1 instanceof Date);
              // flip between states
              isPomActive1 ? stopPomTimer1() : startPomTimer1();
              console.log(pomTimerMode1);
            }}
          >
            {/* flip between pictures of play and pause by checking if pom timer is going */}
            <Ionicons
              name={
                isPomActive1 ? "pause-circle-outline" : "play-circle-outline"
              }
              color={"#D4E09B"} // pom icon color
              // backgroundColor={isPomActive ? "#D4C3B4" : '#F2EEE9' } // pom icon color background
              size={250}
            />
            {/* flip between labels */}
            <Text style={styles.pomTimerText}>
              {/* flip between words stop and start by checking if pom timer is going */}
              {isPomActive1 ? "Stop Timer" : "Start Timer"}
            </Text>
            <View>
              <Text style={styles.pomTimerText}>
                {/* add the extra zeros for two digit display */}
                {pomTimerDate1.getMinutes().toString().padStart(2, "0")}:
                {pomTimerDate1.getSeconds().toString().padStart(2, "0")}
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => setModalIsVisible1(false)}
            style={styles.closebutton}
          >
            <Ionicons name="close" size={50} color="#D4E09B"></Ionicons>
          </Pressable>
        </View>
      </Modal>

      {/* MODAL 3 - 5 Min */}
      <Modal visible={modalVisibility5} animationType="slide">
        <View
          style={[
            // use modal styling
            styles.modalContainer,
            {
              backgroundColor:
                pomTimerMode5 === "Break Time" ? "#D4C3B4" : "#F2EEE9",
            }, // can flip colors here with conditional to check for mode
          ]}
        >
          <Text style={styles.pomFocusText}>
            {/* flip labels for modes: break time or focus time */}
            {pomTimerMode5 === "Focus Time"
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
              console.log("Type of" + typeof pomTimerDate5);
              console.log(pomTimerDate5 instanceof Date);
              // flip between states
              isPomActive5 ? stopPomTimer5() : startPomTimer5();
              console.log(pomTimerMode5);
            }}
          >
            {/* flip between pictures of play and pause by checking if pom timer is going */}
            <Ionicons
              name={
                isPomActive5 ? "pause-circle-outline" : "play-circle-outline"
              }
              color={"#D4E09B"} // pom icon color
              // backgroundColor={isPomActive ? "#D4C3B4" : '#F2EEE9' } // pom icon color background
              size={250}
            />
            {/* flip between labels */}
            <Text style={styles.pomTimerText}>
              {/* flip between words stop and start by checking if pom timer is going */}
              {isPomActive5 ? "Stop Timer" : "Start Timer"}
            </Text>

            <Text style={styles.pomTimerText}>
              {/* add the extra zeros for two digit display */}
              {pomTimerDate5.getMinutes().toString().padStart(2, "0")}:
              {pomTimerDate5.getSeconds().toString().padStart(2, "0")}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setModalIsVisible5(false)}
            style={styles.closebutton}
          >
            <Ionicons name="close" size={50} color="#D4E09B"></Ionicons>
          </Pressable>
        </View>
      </Modal>

      {/* MODAL 4 - 10 Min */}
      <Modal visible={modalVisibility10} animationType="slide">
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor:
                pomTimerMode10 === "Break Time" ? "#D4C3B4" : "#F2EEE9",
            },
          ]}
        >
          <Text style={styles.pomFocusText}>
            {pomTimerMode10 === "Focus Time"
              ? "Time to Focus!"
              : "Time for a Break!"}
          </Text>
          <Pressable
            onPress={() => {
              console.log("start timer");
              console.log("Type of" + typeof pomTimerDate10);
              console.log(pomTimerDate10 instanceof Date);
              isPomActive10 ? stopPomTimer10() : startPomTimer10();
              console.log(pomTimerMode10);
            }}
          >
            <Ionicons
              name={
                isPomActive10 ? "pause-circle-outline" : "play-circle-outline"
              }
              color={"#D4E09B"}
              size={250}
            />
            <Text style={styles.pomTimerText}>
              {isPomActive10 ? "Stop Timer" : "Start Timer"}
            </Text>
            <Text style={styles.pomTimerText}>
              {pomTimerDate10.getMinutes().toString().padStart(2, "0")}:
              {pomTimerDate10.getSeconds().toString().padStart(2, "0")}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setModalIsVisible10(false)}
            style={styles.closebutton}
          >
            <Ionicons name="close" size={50} color="#D4E09B"></Ionicons>
          </Pressable>
        </View>
      </Modal>

      {/* MODAL 5 - 30 Min */}
      <Modal visible={modalVisibility30} animationType="slide">
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor:
                pomTimerMode30 === "Break Time" ? "#D4C3B4" : "#F2EEE9",
            },
          ]}
        >
          <Text style={styles.pomFocusText}>
            {pomTimerMode30 === "Focus Time"
              ? "Time to Focus!"
              : "Time for a Break!"}
          </Text>
          <Pressable
            onPress={() => {
              console.log("start timer");
              console.log("Type of" + typeof pomTimerDate30);
              console.log(pomTimerDate30 instanceof Date);
              isPomActive30 ? stopPomTimer30() : startPomTimer30();
              console.log(pomTimerMode30);
            }}
          >
            <Ionicons
              name={
                isPomActive30 ? "pause-circle-outline" : "play-circle-outline"
              }
              color={"#D4E09B"}
              size={250}
            />
            <Text style={styles.pomTimerText}>
              {isPomActive30 ? "Stop Timer" : "Start Timer"}
            </Text>
            <Text style={styles.pomTimerText}>
              {pomTimerDate30.getMinutes().toString().padStart(2, "0")}:
              {pomTimerDate30.getSeconds().toString().padStart(2, "0")}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setModalIsVisible30(false)}
            style={styles.closebutton}
          >
            <Ionicons name="close" size={50} color="#D4E09B"></Ionicons>
          </Pressable>
        </View>
      </Modal>

      {/* MODAL 6 - 1 Hour / 60 min */}
      <Modal visible={modalVisibility60} animationType="slide">
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor:
                pomTimerMode60 === "Break Time" ? "#D4C3B4" : "#F2EEE9",
            },
          ]}
        >
          <Text style={styles.pomFocusText}>
            {pomTimerMode60 === "Focus Time"
              ? "Time to Focus!"
              : "Time for a Break!"}
          </Text>
          <Pressable
            onPress={() => {
              console.log("start timer");
              console.log("Type of" + typeof pomTimerDate60);
              console.log(pomTimerDate60 instanceof Date);
              isPomActive60 ? stopPomTimer60() : startPomTimer60();
              console.log(pomTimerMode60);
            }}
          >
            <Ionicons
              name={
                isPomActive60 ? "pause-circle-outline" : "play-circle-outline"
              }
              color={"#D4E09B"}
              size={250}
            />
            <Text style={styles.pomTimerText}>
              {isPomActive60 ? "Stop Timer" : "Start Timer"}
            </Text>
            <Text style={styles.pomTimerText}>
              {pomTimerDate60.getMinutes().toString().padStart(2, "0")}:
              {pomTimerDate60.getSeconds().toString().padStart(2, "0")}
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => setModalIsVisible60(false)}
          style={styles.closebutton}
        >
          <Ionicons name="close" size={50} color="#D4E09B"></Ionicons>
        </Pressable>
      </Modal>
    </View>
  );
};
export default BreathingAction;

// TODO: set the right breaks for the timers

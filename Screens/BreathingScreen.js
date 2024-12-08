import React, { useState } from "react";
import { View, Pressable, Text, Modal } from "react-native";
import { styles } from "../Styles/BreathingStyles";
import BreathingModal from "../Components/BreathingModal";
import TimerModal from "../Components/TimerModal";

const BreathingScreen = () => {
  const [modalVisibilityBreathe, setModalIsVisibleBreathe] = useState(false);
  const [modalVisibility1, setModalIsVisible1] = useState(false);
  const [modalVisibility5, setModalIsVisible5] = useState(false);
  const [modalVisibility10, setModalIsVisible10] = useState(false);
  const [modalVisibility30, setModalIsVisible30] = useState(false);
  const [modalVisibility60, setModalIsVisible60] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable
          style={styles.circle}
          onPress={() => setModalIsVisibleBreathe(true)}
        >
          <Text style={styles.buttonText}>Breathing</Text>
        </Pressable>

        {/* 1 Min Timer Circle */}
        <Pressable
          style={styles.circle}
          onPress={() => setModalIsVisible1(true)}
        >
          <Text style={styles.buttonText}>1 Min</Text>
        </Pressable>
      </View>

      {/* 5 Min Timer Circle */}
      <View style={styles.row}>
        <Pressable
          style={styles.circle}
          onPress={() => setModalIsVisible5(true)}
        >
          <Text style={styles.buttonText}>5 Min</Text>
        </Pressable>

        {/* 10 Min Timer Circle */}
        <Pressable
          style={styles.circle}
          onPress={() => setModalIsVisible10(true)}
        >
          <Text style={styles.buttonText}>10 Min</Text>
        </Pressable>
      </View>

      {/* 30 Min Timer Circle */}
      <View style={styles.row}>
        <Pressable
          style={styles.circle}
          onPress={() => setModalIsVisible30(true)}
        >
          <Text style={styles.buttonText}>30 Min</Text>
        </Pressable>

        {/* 60 Min Timer Circle */}
        <Pressable
          style={styles.circle}
          onPress={() => setModalIsVisible60(true)}
        >
          <Text style={styles.buttonText}>60 Min</Text>
        </Pressable>
      </View>

      {/* Modals */}
      <BreathingModal
        isVisible={modalVisibilityBreathe}
        onClose={() => setModalIsVisibleBreathe(false)}
      />

      <TimerModal
        isVisible={modalVisibility1}
        onClose={() => setModalIsVisible1(false)}
        timerLength={1}
      />

      <TimerModal
        isVisible={modalVisibility5}
        onClose={() => setModalIsVisible5(false)}
        timerLength={5}
      />

      <TimerModal
        isVisible={modalVisibility10}
        onClose={() => setModalIsVisible10(false)}
        timerLength={10}
      />

      <TimerModal
        isVisible={modalVisibility30}
        onClose={() => setModalIsVisible30(false)}
        timerLength={30}
      />

      <TimerModal
        isVisible={modalVisibility60}
        onClose={() => setModalIsVisible60(false)}
        timerLength={60}
      />
    </View>
  );
};

export default BreathingScreen;
import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { styles } from "../Styles/MoodStyles";
import { saveMood, fetchMoodData, updateMood } from "../Helpers/firestore-helpers";
import { FIREBASE_AUTH } from "../Config/firebase-config";
import ViewMoodModal from "../Components/ViewMoodModal";
import { Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const MoodBar = ({ moods, selectedMood, onSelectMood }) => {
  const screenWidth = Dimensions.get("window").width;
  const circleSize = screenWidth / (Object.keys(moods).length * 2); // Dynamic circle size

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.barContainer}>
        {Object.keys(moods).map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.circle,
              {
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
                backgroundColor: moods[mood].color,
                borderWidth: selectedMood === mood ? styles.selectedBorder.width : 0,
                borderColor: selectedMood === mood ? styles.selectedBorder.color : "transparent",
              },
            ]}
            onPress={() => onSelectMood(mood)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const MoodScreen = () => {
  const [currentMood, setCurrentMood] = useState("");
  const [moodNote, setMoodNote] = useState("");
  const [moodLog, setMoodLog] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  const userId = FIREBASE_AUTH.currentUser?.uid;

  const fetchTodayMoods = async () => {
    if (!userId) return;

    const now = new Date();
    const dateString = now.toISOString().split("T")[0];

    const fetchedData = await fetchMoodData(userId, dateString);
    if (fetchedData) {
      setMoodLog(fetchedData.entries || []);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTodayMoods(); // Refresh data when the page is focused
    }, [])
  );

  const recordEmotion = useCallback((emotion) => {
    setCurrentMood(emotion);
    setSelectedMood(emotion);
  }, []);

  const handleMoodSubmission = async () => {
    if (!currentMood || !userId) return;

    const now = new Date();
    const moodData = {
      mood: currentMood,
      note: moodNote,
      timestamp: now.toISOString(),
    };

    try {
      await saveMood(userId, moodData); // Save mood to Firestore
      setMoodNote(""); // Clear the input field
      await fetchTodayMoods(); // Refresh the mood log after submission
    } catch (error) {
      console.error("Error submitting mood:", error);
    }
  };

  const handleLongPress = (entry) => {
    setCurrentEntry(entry);
    setModalVisible(true);
  };

  const handleUpdateNote = async (newNote) => {
    if (!currentEntry || !userId) return;

    const updatedEntry = { ...currentEntry, note: newNote };

    try {
      const dateString = new Date(currentEntry.timestamp).toISOString().split("T")[0];

      await updateMood(userId, dateString, updatedEntry); // Update the mood in Firestore
      await fetchTodayMoods(); // Refresh the mood log after the update
      setModalVisible(false); // Close the modal
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const moodButtons = {
    Pleasant: { color: "#77ff73" },
    SlightlyPleasant: { color: "#d0ff73" },
    Neutral: { color: "#fffd73" },
    SlightlyUnpleasant: { color: "#fcaf51" },
    Unpleasant: { color: "#fc5151" },
  };

  return (
    <View style={styles.container}>
      {/* Mood Input Section */}
      <MoodBar moods={moodButtons} selectedMood={selectedMood} onSelectMood={recordEmotion} />
      <View style={styles.noteContainer}>
        <TextInput
          style={styles.noteInput}
          placeholder="Add a note about your mood (optional)"
          value={moodNote}
          onChangeText={setMoodNote}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleMoodSubmission}>
        <Text style={styles.submitButtonText}>Submit Mood</Text>
      </TouchableOpacity>

      {/* Scrollable Mood Log Section */}
      <View style={styles.moodLogContainer}>
        <Text style={styles.moodLogHeader}>Today's Moods</Text> {/* New header */}
        <ScrollView contentContainerStyle={styles.scrollableLog}>
          {moodLog.map((entry, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.moodLogItem,
                { backgroundColor: moodButtons[entry.mood]?.color || "#ccc" },
              ]}
              onLongPress={() => handleLongPress(entry)}
            >
              <Text style={styles.moodLogItemText}>
                {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ViewMoodModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        moodEntry={currentEntry}
        onUpdateNote={handleUpdateNote}
      />
    </View>
  );
};

export default MoodScreen;

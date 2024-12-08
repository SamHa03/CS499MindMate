import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { styles } from "../Styles/MoodStyles";
import { saveMoodEntry, fetchMoodEntriesForDate } from "../Helpers/firestore-helpers";
import { FIREBASE_AUTH } from "../Config/firebase-config";
import ViewMoodModal from "../Components/ViewMoodModal";
import { Calendar } from "react-native-calendars";
import { format, parseISO } from 'date-fns';

const MoodScreen = () => {
  const [currentMood, setCurrentMood] = useState("");
  const [moodNote, setMoodNote] = useState("");
  const [moodLog, setMoodLog] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [calendarVisible, setCalendarVisible] = useState(false);

  const userId = FIREBASE_AUTH.currentUser?.uid;

  const fetchMoodsForDate = async (date) => {
    if (!userId) return;
  
    const fetchedData = await fetchMoodEntriesForDate(userId, date);
    setMoodLog(fetchedData || []);
  };

  useEffect(() => {
    fetchMoodsForDate(selectedDate);
  }, [selectedDate]);

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
      await saveMoodEntry(userId, selectedDate, moodData);
      setMoodNote("");
      await fetchMoodsForDate(selectedDate);
    } catch (error) {
      console.error("Error submitting mood:", error);
    }
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date.dateString);
    setCalendarVisible(false);
  };

  const moodButtons = {
    Pleasant: { color: "#77ff73" },
    SlightlyPleasant: { color: "#d0ff73" },
    Neutral: { color: "#fffd73" },
    SlightlyUnpleasant: { color: "#fcaf51" },
    Unpleasant: { color: "#fc5151" },
  };

  const toggleCalendarVisibility = () => {
    setCalendarVisible(!calendarVisible);
  };

  const formattedSelectedDate = format(parseISO(selectedDate), 'EEEE, MMMM do, yyyy');

  return (
    <View style={styles.container}>
      {/* Calendar Dropdown */}
      <View style={styles.calendarDropdown}>
        <TouchableOpacity onPress={toggleCalendarVisibility}>
          <Text style={styles.calendarText}>
            {formattedSelectedDate}
          </Text>
        </TouchableOpacity>
        {calendarVisible && (
          <Calendar
            onDayPress={handleDateSelection}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: "#00adf5",
              },
            }}
            theme={{
              todayTextColor: "#00adf5",
              selectedDayBackgroundColor: "#00adf5",
              arrowColor: "#00adf5",
            }}
          />
        )}
      </View>

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

      {/* Mood Log Section */}
      <View style={styles.moodLogContainer}>
        <Text style={styles.moodLogHeader}>Moods for {formattedSelectedDate}</Text>
        <ScrollView contentContainerStyle={styles.scrollableLog}>
          {moodLog.map((entry, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.moodLogItem,
                { backgroundColor: moodButtons[entry.mood]?.color || "#ccc" },
              ]}
              onLongPress={() => {
                setCurrentEntry(entry);
                setModalVisible(true);
              }}
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
        onUpdateNote={(note) => {
          setCurrentEntry({ ...currentEntry, note });
          fetchMoodsForDate(selectedDate);
        }}
        userId={userId}
        onRefresh={() => fetchMoodsForDate(selectedDate)}
      />
    </View>
  );
};

const MoodBar = ({ moods, selectedMood, onSelectMood }) => {
  const screenWidth = Dimensions.get("window").width;
  const circleSize = screenWidth / (Object.keys(moods).length * 2);

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

export default MoodScreen;

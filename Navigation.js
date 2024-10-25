import React from 'react';
import { View, Text, PressableOpacity, StyleSheet } from 'react-native';

const HomeScreen = () => {
return (
    <View style={styles.container}>
      {/* Circle Behind Home Button */}
      <View style={styles.circleBehind} />

      <View style={styles.bottomContainer}>
        {/* Left Buttons */}
        <PressableOpacity style={styles.sideButton}>
          <Text style={styles.buttonText}>L1</Text>
        </PressableOpacity>
        <PressableOpacity style={styles.sideButton}>
          <Text style={styles.buttonText}>L2</Text>
        </PressableOpacity>

        {/* Center Home Button */}
        <PressableOpacity style={styles.homeButton}>
          <Text style={styles.buttonText}>Home</Text>
        </PressableOpacity>

        {/* Right Buttons */}
        <PressableOpacity style={styles.sideButton}>
          <Text style={styles.buttonText}>R1</Text>
        </PressableOpacity>
        <PressableOpacity style={styles.sideButton}>
          <Text style={styles.buttonText}>R2</Text>
        </PressableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align content to the bottom
    zIndex: 2,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#d4c3b4',
  },
  sideButton: {
    backgroundColor: '#f2eee9',
    width: 65,
    height: 65,
    bottom: 10,
    borderRadius: 35, // Circle shape
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    verticalAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#f2eee9',
    width: 90,
    height: 90,
    bottom: 30,
    borderRadius: 45, // Bigger circle for Home button
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'center',
    zIndex: 2,
  },
  buttonText: {
    color: '#d4c3b4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  circleBehind: {
    backgroundColor: '#d4c3b4', // Gold background color for the circle
    width: 120,
    height: 120,
    borderRadius: 60, // Circle shape
    position: 'absolute',
    bottom: 30, // Makes it jut out above the bottom container
    left: '50%', // Center the circle horizontally
    transform: [{ translateX: -60 }], // Adjust positioning to center it properly
    zIndex: 0, // Ensures the circle is behind the home button
  },
});

export default HomeScreen;
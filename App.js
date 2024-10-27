// Garrett Thrower 10/26/2024
// Description: This is my attempt at the mood tracker page prototype.
import React from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import MoodLayout from './MindMateBranch_Garrett/components/MoodLayout';

const App = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <MoodLayout/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default App;

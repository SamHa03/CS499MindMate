import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../Styles/StatsStyles.js';
import { fetchYearlyMoodData, deleteAllMoodData } from '../Helpers/firestore-helpers';
import { FIREBASE_AUTH } from '../Config/firebase-config';
import { getAverageOfArray } from '../Helpers/stats-helpers.js';
import { blendColors } from '../Helpers/color-helpers.js';

const { width, height } = Dimensions.get('window');

// run deleteAllMoodData to clear all mood data, used for testing purposes
// deleteAllMoodData(FIREBASE_AUTH.currentUser?.uid);

// the "grades" of mood values, from most pleasant to most unpleasant.
// this will make more sense when we get to the chart, i swear.
const pleasantValue = 1;
const slightlyPleasantValue = .75;
const neutralValue = .5;
const slightlyUnpleasantValue = .25;
const unpleasantValue = 0;

const moodValues = {
  Pleasant: { value: pleasantValue, color: '#00ff00' },
  SlightlyPleasant: { value: slightlyPleasantValue, color: '#77ff73' },
  Neutral: { value: neutralValue, color: '#fffd73' },
  SlightlyUnpleasant: { value: slightlyUnpleasantValue, color: '#fcaf51' },
  Unpleasant: { value: unpleasantValue, color: '#ff0000' },
};

// oh boy, here we go. this is an absolute abomination of a component.
const StatsScreenDisplayView = () => {
  // create a state variable for the chart data
  const [chartData, setChartData] = useState({
    // the labels are the months of the year
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D',], 
    // fill it with absolutely nothing
    datasets: [{ data: Array(12).fill(0) }],
  });
  // create a state variable for the loading state
  const [loading, setLoading] = useState(true);

  // function that fetches the mood data for the year and aggregates it into monthly averages.
  // i probably could have outsourced this to the firestore-helpers file. oh well.
  const fetchAndAggregateMoodData = async (userId) => {
    const year = new Date().getFullYear();
    let allMoodData = await fetchYearlyMoodData(userId, year); // fetch all mood data for the year
    
    const monthlyMoodValues = Array.from({ length: 12 }, () => []) // create an array of 12 empty arrays

    // for every day of the year, loop through each mood entry and push the mood value to the corresponding month's array
    allMoodData.forEach((dayData) => {
      const date = new Date(dayData.date);
      const month = date.getMonth();
      
      // if the day has mood entries, loop through them
      if (Array.isArray(dayData.entries)) {
        dayData.entries.forEach((entry) => {
          const mood = moodValues[entry.mood];
          if (mood) {
            monthlyMoodValues[month].push(mood); // push the mood value to the corresponding month's array
          }
        });
      }
    });
  
    const result = {}; // holds the monthly averages and colors
    monthlyMoodValues.forEach((moods, month) => {
      // if there are mood values for the month, calculate the average value and color
      if (moods.length > 0) {
        // calculate average mood value, each mood has a "grade" from 0 to 1, which is used to calculate the average
        // works basically the way you'd expect it to
        const averageValue = getAverageOfArray(moods.map((m) => m.value));
    
        // collect all mood colors
        const moodColors = moods.map((m) => m.color);
    
        // blend all colors together
        const averageColor = blendColors(moodColors);
        
        // set the average value and color for the month
        result[month] = { averageValue, averageColor };

      // otherwise, get real sad and set the average value to 0 and the color to grey
      } else {
        result[month] = { averageValue: 0, averageColor: '#cccccc' };
      }
    });
  
    return result;
  };
  

  // function that preps the chart data for the BarChart component, pushing in its data, colors, etc etc.
  // this is actually what sets the colors and heights of the bars on the chart.
  const prepareChartData = (monthlyAverages) => {
    const labels = chartData.labels;
    const data = [];
    const colors = [];
  
    // loop through each month and push the average value and color to the data and colors arrays
    labels.forEach((_, month) => {
      const { averageValue, averageColor } = monthlyAverages[month] || {};

      data.push(Math.max(0, averageValue));
      colors.push(() => averageColor || '#cccccc');
    });
  
    setChartData({
      // in addition to the 12 months, add an empty label for an invisible bar.
      // we do this because the entire chart will scale to the largest value, thanks to how react-native-chart-kit works.
      // without it, we would end up with yellow bars scaled to "pleasant" and red bars scaled to "neutral",
      // which doesn't seem very correct to me.
      labels: [...labels, ''], // add the invisible bar's label, which is, well, invisible
      datasets: [
        {
          // the invisible bar's value is 0.5 here, which is the neutral value.
          // by doing this I am effectively assuming that the average mood for the year is neutral, which I think is a fair assumption.
          data: [...data, 0.5], 
          colors: [
            ...colors, // keep the colors the same
            // set the bar's color to the component's background color to make it invisible. 
            // I really didnt want to make another component to hide the bar, so this is a quick and dirty way to do it.
            () => 'rgb(233, 240, 242)',
          ],
        },
      ],
    });    
  };

  // useFocusEffect is a hook from @react-navigation/native that runs a callback when the screen is focused.
  // in effect, the chart will be updated whenever the screen is focused, which is great since you cant
  // update your mood for the day on the stats screen.
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const userId = FIREBASE_AUTH.currentUser?.uid;
          if (userId) {
            // fetch the mood data and aggregate it into monthly averages
            const monthlyAverages = await fetchAndAggregateMoodData(userId);

            // prepare the chart data
            prepareChartData(monthlyAverages);
          }
        } catch (error) {
          // dear GOD i hope i never have to see this error message
          console.error('Error fetching data:', error);
        } finally {

          // finally! we're done loading! set the loading state to false.
          setLoading(false);
        }
      };

      // fetch the data
      fetchData();
    }, [])
  );

  // if our data is still loading, show a loading indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#fca9ff" />
      </View>
    );
  }

  // ignore the fact that this is a complete mess of a component.
  // i hadn't touched react-native-chart-kit before this, so I was just trying to get it to work.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Average Monthly Moods</Text>

      <View style={styles.chartRow}>
        <View style={styles.yAxisBackground} />
        <View style={styles.yAxisContainer}>

          <Text style={styles.yAxisLabel}>Pleasant</Text>
          <Text style={styles.yAxisLabel}>Neutral</Text>
          <Text style={styles.yAxisLabel}>Unpleasant</Text>

        </View>

        {/* fake axis line to make the chart look better. oh yeah, we're getting real janky here. */}
        <View style={styles.fakeAxisLine} /> 
        <BarChart
          data={chartData}
          width={width * 0.8}
          height={height * 0.3}
          chartConfig={{
            backgroundColor: '#e9f0f2',
            backgroundGradientFrom: '#e9f0f2',
            backgroundGradientTo: '#e9f0f2',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            barPercentage: 0.35, // make the bars a bit smaller
            style: { borderRadius: 16 }, // round the corners
            propsForVerticalLabels: {
              fontSize: 12, // month labels
              fontWeight: 'bold', // make them bold
              color: '#000', // black text
            },
            propsForBackgroundLines: {
              strokeWidth: 1,
              strokeDasharray: '4',
              stroke: 'rgba(0, 0, 0, 0.1)',
            },
          }}
          style={styles.chart} // apply the chart styles
          fromZero={true} // start the chart at 0
          withHorizontalLabels={false} // we dont need these
          showBarTops={false} // we cant have these with that invisible bar :))))
          withCustomBarColorFromData // this lets us pass in a function to determine the color of each bar
        />
      </View>
    </View>
  );
};

export default StatsScreenDisplayView;
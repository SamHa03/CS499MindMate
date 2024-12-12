// stats-helpers.js
// common functions for stats screen


// gets the average of an array of numbers
export function getAverageOfArray(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

// normalizes an array of numbers to a range of 0 to 1 using min-max normalization
export function normalizeData(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return arr.map((val) => (val - min) / (max - min));
}

// gets the standard deviation of an array of numbers
export function getStandardDeviation(arr) {
  const mean = getAverageOfArray(arr);
  const sum = arr.reduce((acc, val) => acc + (val - mean) ** 2, 0);
  const variance = sum / arr.length;
  return Math.sqrt(variance);
}
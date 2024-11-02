import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './halfCircleProgressBar.styles';

const HalfCircleProgressBar = ({ progress = 0 }) => {
  const radius = 50; // Radius of the half-circle
  const center = radius;
  const circumference = Math.PI * radius;

  // Calculate the angle for the progress
  const progressCircumference = (progress / 100) * circumference;

  // Define the path for a half-circle
  const halfCirclePath = `
    M ${center} ${center}
    A ${radius} ${radius} 0 0 1 ${2 * radius} ${center}
    L ${2 * radius} ${center}
    Z
  `;

  // Define the path for progress
  const progressPath = `
    M ${center} ${center}
    A ${radius} ${radius} 0 0 1 ${center + progressCircumference} ${center}
    L ${center} ${center}
    Z
  `;

  return (
    <View style={styles.container}>
      <Svg width={2 * radius} height={radius} viewBox={`0 0 ${2 * radius} ${radius}`}>
        {/* Background Half-Circle */}
        <Path
          d={halfCirclePath}
          fill="#e0e0e0"
        />

        {/* Progress Half-Circle */}
        <Path
          d={progressPath}
          fill="#00f"
        />
      </Svg>
      <Text style={styles.text}>{`${progress}%`}</Text>
    </View>
  );
};

export default HalfCircleProgressBar;
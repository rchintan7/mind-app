import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { styles } from './customProgressCircle.styles';

type CustomProgressCircleProps = {
  size?: number;
  strokeWidth?: number;
  showSelectedData?: number;
  dayActivities?: string[];
};

const CustomProgressCircle: React.FC<CustomProgressCircleProps> = ({
  size = 100,
  strokeWidth = 10,
  showSelectedData = 0,
  dayActivities = [],
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const createStrokeDashoffset = (percent: number) => {
    return circumference - (circumference * percent) / 100;
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* First Circle - Green */}
        {((showSelectedData === 0 || showSelectedData === 2) && dayActivities.includes('Family')) && <G rotation="0" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#D51920"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={createStrokeDashoffset(16)} // 25% progress
            fill="none"
          />
        </G>}

        {/* Second Circle - Red */}
        {((showSelectedData === 0 || showSelectedData === 3) && dayActivities.includes('Sport')) && <G rotation="60" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#8433D1"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={createStrokeDashoffset(16)} // 25% progress
            fill="none"
          />
        </G>}

        {/* Third Circle - Purple */}
        {((showSelectedData === 0 || showSelectedData === 4) && dayActivities.includes('Gamble')) && <G rotation="120" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#26C9F3"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={createStrokeDashoffset(16)} // 25% progress
            fill="none"
          />
        </G>}

        {/* Fourth Circle - Blue */}
        {((showSelectedData === 0 || showSelectedData === 1) && dayActivities.includes('Work')) && <G rotation="180" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#5CAC60"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={createStrokeDashoffset(16)} // 25% progress
            fill="none"
          />
        </G>}

        {((showSelectedData === 0 || showSelectedData === 5) && dayActivities.includes('Date')) && <G rotation="240" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#FFA500"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={createStrokeDashoffset(16)} // 25% progress
            fill="none"
          />
        </G>}

        {((showSelectedData === 0 || showSelectedData === 6) && dayActivities.includes('See friends')) && <G rotation="300" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#FFD700"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={createStrokeDashoffset(16)} // 25% progress
            fill="none"
          />
        </G>}
      </Svg>
    </View>
  );
};

export default CustomProgressCircle;
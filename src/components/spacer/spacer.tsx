import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SpacerProps {
  flex?: number;
  width?: number;
  height?: number;
  style?: ViewStyle;
}

const Spacer: React.FC<SpacerProps> = ({ flex = 0, width = 0, height = 0, style }) => {
  return (
    <View
      style={[
        { flex, width, height },
        style,
      ]}
    />
  );
};

export default Spacer;
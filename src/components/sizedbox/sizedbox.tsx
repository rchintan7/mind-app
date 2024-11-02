import React from 'react';
import { DimensionValue, View, ViewStyle } from 'react-native';

interface SizedBoxProps {
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  style?: ViewStyle;
  flex?: number | undefined;
}

const SizedBox: React.FC<SizedBoxProps> = ({ width = 0, height = 0, flex, style }) => {
  return <View style={[{ width, height, flex }, style]} />;
};

export default SizedBox;
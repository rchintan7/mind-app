import React from 'react';
import { View, Text } from 'react-native';
import { Svgs } from '../../constants/images';
import SizedBox from './../sizedbox/sizedbox';
import { styles } from './checkbox.styles';

interface CheckboxProps {
  checked: boolean;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, label }) => {
  return (
    <View style={styles.container}>
      {checked ? <Svgs.circleCheck /> : <Svgs.circle />}
      <SizedBox width={8} />
      <Text style={[styles.label, checked && styles.selectedText]}>{label}</Text>
    </View>
  );
};

export default Checkbox;
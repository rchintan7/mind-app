import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../constants/colors';
import SizedBox from '../sizedbox/sizedbox';
import {styles} from './radioButton.styles';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface RadioButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  text?: string | undefined;
  selected?: boolean | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  onPress,
  text,
  selected,
  style,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={1}
      style={GlobalStyles.rowContainer}>
      <View
        style={[
          styles.container,
          {
            borderColor: selected ? Colors.secondaryColor : '#000',
            backgroundColor: selected ? Colors.secondaryColor : undefined,
          },
          style,
        ]}>
        {selected ? (
          <Icon name={'check'} size={12} color={Colors.white} />
        ) : null}
      </View>
      <SizedBox width={5} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

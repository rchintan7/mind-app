import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
import {styles} from './customButton.styles';
import Colors from '../../constants/colors';

interface CustomButtonProps {
  loading?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  icon?: any;
  trailingIcon?: any;
  title: string;
  buttonStyle?: StyleProp<ViewStyle> | undefined;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  loading,
  onPress,
  icon,
  trailingIcon,
  title,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      activeOpacity={0.7}
      onPress={loading ? undefined : onPress}>
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.white} />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.text, textStyle]}>{title}</Text>
          {trailingIcon && (
            <View style={styles.trailingIcon}>{trailingIcon}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

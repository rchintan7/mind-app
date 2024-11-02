import {StyleSheet, Text, View} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';
import moment from 'moment';
import Colors from '../constants/colors';

export const toastConfig: ToastConfig = {
  success: props => (
    <View style={styles.baseToast}>
      <View
        style={[styles.indicatorView, {backgroundColor: Colors.success}]}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.heading}>{props.text1}</Text>
        <Text style={styles.info}>{props.text2}</Text>
      </View>
    </View>
  ),
  error: props => (
    <View style={styles.baseToast}>
      <View
        style={[styles.indicatorView, {backgroundColor: Colors.danger}]}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.heading}>{props.text1}</Text>
        <Text style={styles.info}>{props.text2}</Text>
      </View>
    </View>
  ),
  warning: props => (
    <View style={styles.baseToast}>
      <View
        style={[styles.indicatorView, {backgroundColor: Colors.warning}]}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.heading}>{props.text1}</Text>
        <Text style={styles.info}>{props.text2}</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  baseToast: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.grey100,
    overflow: 'hidden',
  },
  indicatorView: {
    width: 32,
    height: 75,
  },
  rightContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    rowGap: 4,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textColor,
    textTransform: 'uppercase',
  },
  info: {
    fontSize: 12,
    color: Colors.textColor,
  },
});

export const showToast = (
  message: string,
  type?: 'success' | 'warning' | 'error',
) => {
  Toast.show({
    text1: type ? type : 'success',
    text2: message,
    type: type,
  });
};

export const showMessage = (message: string) => {
  console.log(`Time: ${moment().format('DD/MM/YYYY HH:MM:SS')} ~ ${message}`);
};

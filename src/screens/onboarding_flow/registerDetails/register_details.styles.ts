import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textColor,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#84817D',
    textAlign: 'center',
  },
  fieldMargin: {
    marginHorizontal: '8%',
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textColor,
  },
  inputSubtitle: {
    fontSize: 16,
    color: Colors.textColor,
  },
  fieldSpace: {
    width: '100%',
    marginTop: 10,
  },
});

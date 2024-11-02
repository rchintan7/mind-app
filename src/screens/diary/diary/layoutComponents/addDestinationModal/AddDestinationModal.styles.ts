import { StyleSheet } from 'react-native';
import Colors from '../../../../../constants/colors';

export const styles = StyleSheet.create({
  modalDash: {
    height: 5,
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.grey,
    opacity: 0.2,
  },
  cardStyle: {
    borderRadius: 50,
    marginHorizontal: 16,
  },
  modalText: {
    marginTop: 8,
    textAlign: 'center',
    color: 'rgba(46, 46, 46, 0.75)',
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  modalContent: {
    width: '95%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  input: {
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
    marginLeft: 3,
    position: 'absolute',
    bottom: -5,
  },
  fieldSpace: {
    width: '100%',
    marginLeft: 5,
  },
  titleCenter: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelBtn: {
    borderColor: '#000',
    width: '45%',
  },
  cancleBtnText: {
    color: '#000',
  },
  deleteButton: {
    borderColor: Colors.red,
    width: '45%',
  },
  deleteText: {
    color: Colors.red,
  },
  saveBtn: {
    backgroundColor: Colors.primaryColor,
    elevation: 3,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  saveBtnText: {
    color: '#FFF',
    fontWeight: '500',
  },
});

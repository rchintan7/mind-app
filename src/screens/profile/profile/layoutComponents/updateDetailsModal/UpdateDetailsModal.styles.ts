import { StyleSheet } from "react-native";
import Colors from '../../../../../constants/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
    marginLeft: 3,
    position: 'absolute',
    bottom: -5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  cancelBtn: { width: '40%', paddingHorizontal: 10, backgroundColor: '#FFF', borderWidth: 1, borderColor: Colors.secondaryColor, height: 40, paddingVertical: 0 },
  cancleBtnText: { color: '#000', fontWeight: '400' },
  submitBtn: { width: '50%', paddingHorizontal: 10, height: 42, paddingVertical: 0 }
});

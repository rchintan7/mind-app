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
    modalContent: {
        backgroundColor: 'white',
        marginTop: 50,
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    warningText: {
        fontSize: 14,
        color: Colors.red,
        textAlign: 'center',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelBtn: {
        borderColor: Colors.black,
        width: '45%',
    },
    cancelBtnText: {
        color: Colors.black,
    },
    deleteBtn: {
        backgroundColor: Colors.red,
        width: '45%',
    },
    deleteBtnText: {
        color: 'white',
    },
});

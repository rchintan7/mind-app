import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 6,
        width: 320,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    moodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    moodButton: {
        margin: 0,
        paddingHorizontal: 0,
        paddingVertical: 8,
        alignItems: 'center',
        width: 50,
        borderRadius: 4
    },
    selectedMood: {
        borderColor: Colors.secondaryColor,
        borderWidth: 2,
    },
    moodText: {
        fontSize: 24, // Adjust size as needed
    },
    label: {
        marginTop: 4,
        fontSize: 9,
        color: Colors.grey
    },
});
import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        marginRight: 10,
    },
    checked: {
        backgroundColor: 'lightgreen',
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: Colors.textColor,
    },
    selectedText: {
        color: Colors.white
    }
});
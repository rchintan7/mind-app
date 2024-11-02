import { StyleSheet } from "react-native";
import Colors from "../../../../../constants/colors";

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
});
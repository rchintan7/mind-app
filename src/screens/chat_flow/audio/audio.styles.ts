import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textColor,
    },
    microphoneContainer: {
        height: 120,
        width: 120,
        backgroundColor: Colors.green,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
});

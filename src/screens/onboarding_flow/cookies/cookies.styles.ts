import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.textColor,
        textAlign: 'center'
    },
    description: {
        fontSize: 14,
        color: Colors.textColor,
        lineHeight: 22
    },
    buttonStyle: {
        width: 300
    }
})
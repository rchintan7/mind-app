import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
    logoImage: {
        height: 200,
        width: 200
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.textColor,
        textAlign: 'center',
        marginHorizontal: 16
    },
    description: {
        fontSize: 14,
        color: Colors.darkGrey,
        textAlign: 'center',
        width: '70%'
    },
    dot: {
        backgroundColor: Colors.lightGrey,
        height: 8,
        width: 8,
        borderRadius: 8
    },
    buttonStyle: {
        width: 300,
        alignSelf: 'center'
    }
})
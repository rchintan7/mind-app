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
        fontSize: 16,
        color: Colors.grey,
        textAlign: 'center'
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        borderColor: Colors.borderColor,
        borderWidth: 1.5,
        paddingHorizontal: 10,
        borderRadius: 4,
        color: Colors.textColor,
    },
    prefixText: {
        fontSize: 16,
        color: Colors.darkGrey
    },
    input: {
        flex: 1,
        borderWidth: 0,
    },
    buttonStyle: {
        width: 200,
        alignSelf: 'center'
    },
    skipButtonText: {
        color: Colors.grey,
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
})
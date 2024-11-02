import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textColor,
        textAlign: 'center'
    },
    inputTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.textColor,
        marginLeft: '8%',
        marginTop: 20,
        marginBottom: 5
    },
    forgotPassword: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.secondaryColor,
        marginLeft: '8%',
        marginTop: 16,
        marginBottom: 5
    },
    input: {
        width: '84%',
        marginHorizontal: '8%',
    },
    buttonStyle: {
        marginHorizontal: '8%',
    }
})
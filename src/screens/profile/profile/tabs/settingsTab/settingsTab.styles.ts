import { StyleSheet } from "react-native";
import Colors from "../../../../../constants/colors";

export const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 15,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.textColor,
        marginBottom: 10,
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        color: Colors.black,
        fontWeight: '400',
        marginBottom: 10,
    },
    feedbackText: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: '500',
    },
    fillButton: {
        width: '60%',
        paddingHorizontal: 0
    },
    outlineButton: {
        width: '60%',
        borderWidth: 1.5,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.borderColor,
    },
    switchLabel: {
        color: "black",
        fontWeight: "900",
    },
    multilineInput: {
        height: 150,
        // textAlignVertical: 'top',
        verticalAlign: 'top'
    },
    sendButton: {
        width: '70%',
        alignSelf: 'center',
    },
    inputTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textColor,
        marginTop: 20,
        marginBottom: 5,
    },
    logoutButton: {
        borderColor: Colors.red,
        width: '60%',
    },
    logoutText: {
        color: Colors.red,
    },
    deleteAccountText: {
        color: Colors.red,
        textDecorationLine: 'underline',
    },
    errorText: {
        color: Colors.red,
    },
    input: {
        borderColor: Colors.grey,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
});
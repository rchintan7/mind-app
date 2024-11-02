import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.textColor,
        textAlign: 'center',
        marginBottom: 20,
    },
    optionContainer: {
        marginTop: 40,
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: Colors.borderColor,
        borderRadius: 10,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    selectedOption: {
        borderColor: Colors.secondaryColor,
    },
    optionText: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textColor
    },
    optionSubtext: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '500',
        color: Colors.grey,
    },
    popularContainer: {
        position: 'absolute',
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 4,
        top: -14,
        left: 12
    },
    popularText: {
        fontWeight: '700',
        color: Colors.white
    },
    subText: {
        fontSize: 12,
        color: Colors.grey,
        textAlign: 'center'
    },
    buttonStyle: {
        width: 300,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    skipButton: {
        alignSelf: 'center',
    },
    skipButtonText: {
        color: Colors.grey,
        textDecorationLine: 'underline'
    },
});
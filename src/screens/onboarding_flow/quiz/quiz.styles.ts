import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 20,
    },
    image: {
        height: 150,
        width: 150,
        alignSelf: 'center'
    },
    optionImage: {
        height: 100,
        width: 100,
        alignSelf: 'center'
    },
    optionText: {
        fontSize: 12,
        color: Colors.black,
        fontWeight: '700'
    },
    question: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: Colors.grey,
    },
    checkboxView: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    selected: {
        backgroundColor: Colors.primaryColor
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        width: 250,
        alignSelf: 'center',
        marginBottom: 40
    },
    buttonStyle: {
        borderRadius: 25,
        width: 100
    },
    notSelectedButtonStyle: {
        borderRadius: 25,
        width: 100,
        borderColor: Colors.lightGrey,
        backgroundColor: Colors.lightGrey,
    },
    selectedButtonStyle: {
        borderRadius: 25,
        width: 100,
        borderColor: Colors.secondaryColor,
        backgroundColor: Colors.secondaryColor,
    }
});
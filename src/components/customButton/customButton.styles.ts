import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.secondaryColor,
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 25,
        alignItems: 'center',
    },
    icon: {
        marginRight: 10
    },
    trailingIcon: {
        marginLeft: 10
    },
    text: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: Colors.borderColor,
        borderRadius: 4,
    },
    textInput: {
        flex: 1,
        height: 44,
        paddingHorizontal: 10,
        fontSize: 16,
        color: Colors.textColor,
    },
    iconButton: {
        paddingHorizontal: 10,
    },
});
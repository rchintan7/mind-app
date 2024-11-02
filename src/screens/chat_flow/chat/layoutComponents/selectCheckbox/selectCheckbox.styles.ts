import { StyleSheet } from "react-native";
import Colors from "../../../../../constants/colors";
import GlobalStyles from "../../../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    checkButton: {
        ...GlobalStyles.rowContainer,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.secondaryColor,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        margin: 5,
        marginRight: 0
    },
    checkText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '700',
        color: Colors.secondaryColor
    },
});
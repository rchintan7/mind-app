import { StyleSheet } from "react-native";
import Colors from "../../../../../constants/colors";

export const styles = StyleSheet.create({
    chipContainer: {
        backgroundColor: '#FFF2ED',
        padding: 10,
        borderRadius: 6,
        margin: 5,
    },
    selectedChip: {
        backgroundColor: Colors.secondaryColor,
    },
    chipText: {
        fontSize: 14,
        color: Colors.secondaryColor,
    },
    selectedText: {
        color: Colors.white,
    },
});
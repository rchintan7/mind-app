import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import GlobalStyles from "../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    month: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textColor,
    },
    viewAll: {
        color: '#9E9E9E',
        fontSize: 14,
    },
    levelLine: {
        height: 2,
        width: 60,
        marginVertical: 4,
        backgroundColor: Colors.primaryColor,
    },
    visionTitleSection: {
        ...GlobalStyles.rowSpaceBetween,
        marginVertical: 20,
    },
    visionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    outlinedButtonIconStyle: {
        marginRight: 0,
    },
    iconButtonStyle: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 6,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    gridItem: {
        ...GlobalStyles.center,
        width: '48%',
        height: 120,
        backgroundColor: Colors.lightGrey,
        borderRadius: 6,
        marginBottom: 10,
    },
    addButton: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderRadius: 6,
    },
});

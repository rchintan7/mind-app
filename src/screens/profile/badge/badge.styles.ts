import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    levelSection: {
        ...GlobalStyles.rowSpaceBetween,
        paddingHorizontal: 20,
        width: '100%',
    },
    levelText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryColor,
    },
    levelLine: {
        height: 2,
        width: 70,
        marginVertical: 4,
        backgroundColor: Colors.primaryColor,
    },
    badgeCard: {
        ...GlobalStyles.rowSpaceBetween,
        width: '95%',
    },
    badgeIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    badgeTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    badgeSubtitle: {
        fontSize: 12,
        color: Colors.grey,
    },
    circularProgressText: {
        fontSize: 10,
        fontWeight: '500',
        color: Colors.primaryColor
    },
});
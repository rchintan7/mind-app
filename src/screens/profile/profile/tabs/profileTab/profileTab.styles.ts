import { StyleSheet } from "react-native";
import GlobalStyles from "../../../../../styles/GlobalStyles";
import Colors from "../../../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.center,
        width: '100%',
    },
    cardWrapper: {
        ...GlobalStyles.rowCenter,
        width: '64%',
        paddingVertical: 10,
        marginHorizontal: 4,
        marginVertical: 0
        // marginVertical: -3,
    },
    cardStyel: {
        ...GlobalStyles.rowContainer,
        justifyContent: 'flex-start',
        width: '64%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 6,
        marginVertical: -4,
    },
    greetingText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textColor,
    },
    subText: {
        fontSize: 12,
        color: Colors.grey,
        fontWeight: '400',
    },
    entriesCardStyle: {
        ...GlobalStyles.rowCenter,
        paddingLeft: 10,
        width: '85%',
        paddingVertical: 10,
        marginHorizontal: 4,
        marginVertical: -3,
    },
    entriesText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.secondaryColor,
    },
    badgeIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
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
    badgeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textColor
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
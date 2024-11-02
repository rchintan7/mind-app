import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    titleSection: {
        ...GlobalStyles.rowSpaceBetween,
        ...GlobalStyles.marginHorizontal,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textColor,
    },
    levelLine: {
        height: 2,
        width: 70,
        marginVertical: 4,
        backgroundColor: Colors.primaryColor,
        marginLeft: 16
    },
    deleteButton: {
        backgroundColor: Colors.secondaryColor,
        width: 50,
        height: 50,
        borderRadius: 50,
        marginHorizontal: 24,
        alignSelf: 'center',
        ...GlobalStyles.center,
        ...GlobalStyles.shadowDefault
    },
    deleteButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    dailyAffirmation: {
        ...GlobalStyles.rowContainer,
        margin: 0,
        marginTop: 12,
        paddingLeft: 12,
        paddingRight: 8,
        paddingVertical: 8,
    },
    checked: {
        height: 30,
        width: 30,
        backgroundColor: Colors.primaryColor,
        borderRadius: 4,
        ...GlobalStyles.center,
    },
    uncheck: {
        height: 30,
        width: 30,
        borderWidth: 2,
        borderColor: Colors.grey,
        borderRadius: 4,
        ...GlobalStyles.center,
    },
    dailyAffirmationText: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
        fontSize: 14,
        color: Colors.textColor
    },
    moodTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textColor,
    },
    showMore: {
        fontSize: 12,
        color: Colors.grey,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 200,
        paddingHorizontal: 16,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: Colors.grey,
    },
});
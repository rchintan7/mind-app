import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 200,
        paddingHorizontal: 16,
    },
    cardWrapper: {
        ...GlobalStyles.rowCenter,
        width: '100%',
        paddingVertical: 10,
        marginVertical: 0,
    },
    cardStyel: {
        ...GlobalStyles.rowContainer,
        width: '48%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 0,
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
    levelLine: {
        height: 2,
        width: 70,
        marginVertical: 4,
        backgroundColor: Colors.primaryColor,
    },
    titleSection: {
        ...GlobalStyles.rowSpaceBetween,
        marginTop: 8
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textColor,
    },
    iconBorder: {
        borderWidth: 3,
        borderRadius: 50,
        padding: 10
    },
    cardStyle: {
        padding: 12,
        marginHorizontal: 0
    },
    taskProgress: {
        flex: 1,
        marginRight: 4,
        height: 5,
        borderRadius: 20,
    },
});
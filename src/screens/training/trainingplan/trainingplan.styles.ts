import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 200,
        paddingHorizontal: 16,
    },
    levelSection: {
        ...GlobalStyles.rowSpaceBetween,
        marginTop: 8,
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
    xpText: {
        fontSize: 10,
        color: Colors.grey,
    },
    circularProgressText: {
        fontSize: 10,
        fontWeight: '500',
        color: Colors.primaryColor
    },
    cardsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        width: '23%',
        margin: 0,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: Colors.white,
        borderRadius: 6,
        alignItems: 'center',
    },
    trainingChartCard: {
        marginHorizontal: 0,
        marginTop: 16,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    cardText: {
        fontSize: 10,
        color: Colors.textColor,
        textAlign: 'center',
    },
    buttonStyle: {
        marginTop: 16,
        borderRadius: 6
    },
    disableButtonStyle: {
        marginTop: 16,
        borderRadius: 6,
        backgroundColor: Colors.lightGrey,
        ...GlobalStyles.shadowDefault,
        marginBottom: 12
    },
    titleSection: {
        ...GlobalStyles.rowSpaceBetween,
        marginTop: 16
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
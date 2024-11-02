import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    header: {
        ...GlobalStyles.rowSpaceBetween,
        marginBottom: 16,
    },
    monthText: {
        fontSize: 18,
    },
    xpText: {
        fontSize: 18,
        color: Colors.secondaryColor,
        fontWeight: '700'
    },
    arrow: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 20,
        margin: 0
    },
    daysOfWeekContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    dayOfWeekText: {
        textAlign: 'center',
        color: Colors.grey
    },
    daysContainer: {
        ...GlobalStyles.rowContainer,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    dayContainer: {
        ...GlobalStyles.center,
        marginBottom: 8,
    },
    dayText: {
        marginTop: 4,
        fontSize: 14,
        textAlign: 'center',
        position: 'absolute'
    },
    legendColor: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8,
    },
    legendText: {
        color: Colors.white
    },
    smileContainer: {
        backgroundColor: '#F9F9F9',
        alignSelf: 'flex-start',
        padding: 6,
        borderRadius: 6
    },
    valueText: {
        fontSize: 12,
        color: Colors.textColor
    },
    goalCard: {
        alignSelf: 'flex-start',
        margin: 8, // You can adjust the margin for spacing between cards
    },
    goalTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textColor,
    },
    goalSubtitle: {
        fontSize: 10,
        color: Colors.grey300,
    },
    levelLine: {
        height: 2,
        width: 70,
        marginVertical: 4,
        backgroundColor: Colors.primaryColor,
    },
    titleSection: {
        marginTop: 16,
        ...GlobalStyles.rowSpaceBetween,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textColor,
    },
    downloadText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});
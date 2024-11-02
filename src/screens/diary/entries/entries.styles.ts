import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    navigationContainer: {
        ...GlobalStyles.rowSpaceBetween,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    arrowButton: {
        padding: 10,
    },
    weekLabel: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.textColor
    },
    weekContainer: {
        paddingHorizontal: 8,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dayContainer: {
        width: 30,
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    selectedDayContainer: {
        backgroundColor: 'black',
    },
    dayName: {
        color: Colors.textColor,
    },
    selectedDay: {
        color: Colors.white,
    },
    dayDate: {
        color: Colors.textColor,
        fontWeight: 'bold',
    },
    newEntrySection: {
        ...GlobalStyles.rowSpaceBetween,
        ...GlobalStyles.marginHorizontal,
    },
    entry: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textColor,
    },
    dateText: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.textColor,
    },
    iconButtonStyle: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 6,
    },
    outlinedButtonIconStyle: {
        marginRight: 0,
    },
    chipContainer: {
        marginVertical: 6,
    },
    emoji: {
        fontSize: 18,
        marginRight: 4,
    },
    bodyText: {
        color: Colors.textColor,
    },
    questionText: {
        fontSize: 18,
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
    header: {
        ...GlobalStyles.rowSpaceBetween,
        width: '100%',
        marginBottom: 16,
    },
    monthText: {
        fontSize: 18,
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
    dayContainer1: {
        ...GlobalStyles.center,
        height: 30,
        marginBottom: 8,
    },
    calendarDate: {
        ...GlobalStyles.center,
        height: 30,
        width: 30,
        borderRadius: 50
    },
    selectedCalendarDate: {
        backgroundColor: Colors.textColor,
    },
    dayText: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        position: 'absolute',
        color: Colors.textColor
    },
    selectedDayText: {
        color: Colors.white
    },
});
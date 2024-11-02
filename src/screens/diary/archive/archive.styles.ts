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
    goalContainer: {
        marginTop: 20,
        marginHorizontal: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    smileContainer: {
        height: 40,
        width: 40,
        backgroundColor: '#F9F9F9',
        alignSelf: 'flex-start',
        padding: 6,
        borderRadius: 6
    },
    goalCard: {
        width: '48%',
        alignSelf: 'flex-start',
        margin: 0,
        marginBottom: 12
    },
    goalTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textColor,
    },
    itemText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textColor
    },
    itemSubText: {
        fontSize: 12,
        color: Colors.grey
    },
    dateText: {
        fontSize: 12,
        color: Colors.grey
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
});
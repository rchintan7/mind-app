import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 200,
        paddingHorizontal: 16,
    },
    levelLine: {
        height: 2,
        width: 70,
        marginVertical: 4,
        backgroundColor: Colors.primaryColor,
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
    videoContainer: {
        marginVertical: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor
    },
    videoContent: {
        flex: 1,
        marginHorizontal: 16
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.white
    },
    videoSubTitle: {
        fontSize: 14,
        color: Colors.white
    },
    taskContainer: {
        marginHorizontal: 0,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textColor
    },
    taskSubTitle: {
        fontSize: 14,
        color: Colors.textColor
    },
    startButtonStyle: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6
    },
    startTextStyle: {
        fontSize: 12
    }
});
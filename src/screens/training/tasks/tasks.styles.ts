import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 200,
        paddingHorizontal: 16,
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
    levelLine: {
        height: 2,
        width: 70,
        marginVertical: 4,
        backgroundColor: Colors.primaryColor,
    },
    videoContainer: {
        marginTop: 12,
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
});
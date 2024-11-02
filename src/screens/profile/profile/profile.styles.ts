import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    likeContainer: {
        alignItems: 'center',
        width: 40
    },
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textColor,
        alignSelf: 'center',
    },
    subText: {
        fontSize: 14,
        color: Colors.grey,
        alignSelf: 'center',
    },
    tabContainer: {
        width: 250,
        height: 40,
        backgroundColor: Colors.lightGrey,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        position: 'relative',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1.51,
        elevation: 1,
    },
    tabButton: {
        height: 40,
        width: 125,
        ...GlobalStyles.center,
    },
    animatedTab: {
        position: 'absolute',
        height: 40,
        width: 125,
        backgroundColor: Colors.textColor,
        borderRadius: 100,
        top: 0,
        left: 0,
    },
    tabTextStyle: {
        fontSize: 15,
        color: Colors.grey300,
        fontWeight: '700',
    },
    activeText: {
        color: Colors.white,
    },
});
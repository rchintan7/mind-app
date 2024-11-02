import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export const styles = StyleSheet.create({
    header: {
        height: 60,
        width: '100%',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    title: {
        color: Colors.textColor,
        fontSize: 18,
        fontWeight: '500',
    },
    actions: {
        flexDirection: 'row',
    },
    button: {
        marginLeft: 2,
        marginRight: 16
    },
    avatarContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    likeContainer: {
        alignItems: 'center',
        width: 40
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
});
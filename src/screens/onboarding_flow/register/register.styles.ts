import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textColor,
        textAlign: 'center'
    },
    input: {
        width: '84%',
        marginHorizontal: '8%',
    },
    socialButton: {
        height: 44,
        width: '84%',
        flexDirection: 'row',
        borderRadius: 6,
        marginVertical: 4,
        marginHorizontal: '8%',
        backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.white,
    },
    dividerWrapper: {
        flex: 1,
        marginHorizontal: '8%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.grey,
    },
    imageIcon: {
        height: 18,
        width: 18,
        marginRight: 6
    }
})
import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.centeredContainer,
        backgroundColor: Colors.primaryColor,
        padding: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    },
    congratText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.white,
        marginBottom: 10
    },
    cardsSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    card: {
        width: '23%',
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: Colors.white,
        borderRadius: 6,
        alignItems: 'center',
        ...GlobalStyles.shadowLight,
    },
    cardIconContainer: {
        ...GlobalStyles.center,
        height: 40,
        width: 40,
        backgroundColor: Colors.primaryColor,
        borderRadius: 50,
    },
    cardLine: {
        height: 5,
        width: 40,
        backgroundColor: Colors.primaryColor,
        borderRadius: 10,
        marginVertical: 10,
    },
    cardText: {
        fontSize: 10,
        color: Colors.textColor,
        textAlign: 'center',
    },
    cardStatusIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 20,
        height: 12,
        backgroundColor: Colors.primaryColor,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        ...GlobalStyles.center,
    },
    levelText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white
    },
    subText: {
        fontSize: 16,
        color: Colors.white,
        marginBottom: 30
    },
    secondaryButton: {
        marginTop: 12,
        backgroundColor: Colors.white,
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 30
    },
    buttonText: {
        color: Colors.secondaryColor,
        fontWeight: 'bold',
        fontSize: 16
    },
    linkText: {
        color: Colors.white,
        marginTop: 20,
        textDecorationLine: 'underline'
    },
});
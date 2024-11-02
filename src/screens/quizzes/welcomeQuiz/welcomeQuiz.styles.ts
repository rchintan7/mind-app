import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    modal: {
        flex: 1,
        marginTop: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: Colors.white,
        ...GlobalStyles.shadowDefault
    },
    dash: {
        height: 5,
        width: 50,
        position: 'absolute',
        backgroundColor: Colors.grey100,
        top: 10
    },
    bottomSection: {
        ...GlobalStyles.center,
        flex: 2,
        width: '100%',
        backgroundColor: Colors.secondaryColor,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    questionText: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.black,
        textAlign: 'center',
        margin: 20,
    },
    statsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 50,
    },
    rowEnd: {
        flexDirection: 'row', 
        alignItems: 'flex-end'
    },
    largeText: {
        flex: 1,
        fontSize: 80,
        color: Colors.white,
        textAlign: 'right'
    },
    smallText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: Colors.white,
        marginLeft: 16,
        marginBottom: 12
    },
    buttonStyle: {
        backgroundColor: Colors.white
    },
    buttonText: {
        color: Colors.secondaryColor,
        fontSize: 18,
    },
});
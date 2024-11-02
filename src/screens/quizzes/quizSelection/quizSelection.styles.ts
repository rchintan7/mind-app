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
        ...GlobalStyles.shadowDefault,
    },
    stepProgressWrapper: {
        width: '95%',
        marginTop: 20,
        marginHorizontal: 10
    },
    dash: {
        height: 5,
        width: 50,
        position: 'absolute',
        backgroundColor: Colors.grey100,
        top: 10
    },
    bottomSection: {
        // flex: 2,
        width: '100%',
        // alignItems: 'center',
        backgroundColor: Colors.secondaryColor,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    largeText: {
        marginVertical: 16,
        fontSize: 24,
        fontWeight: '700',
        color: Colors.white,
        textAlign: 'center'
    },
    imageWithTextView: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    checkboxWithTextView: {
        // height: 40,
        justifyContent: 'center',
        width: '92%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    selected: {
        backgroundColor: Colors.white
    },
    questionText: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.black,
        textAlign: 'center',
        margin: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: 10,
        marginBottom: 30,
    },
    image: {
        height: 70,
        width: 70,
        alignSelf: 'center'
    },
    text: {
        fontSize: 10,
        color: Colors.white,
        fontWeight: '700'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: Colors.white,
    },
    selectedText: {
        color: Colors.secondaryColor
    },
    buttonStyle: {
        borderWidth: 2,
        borderColor: Colors.white,
        borderRadius: 25,
        width: 100,
        alignSelf: 'center'
    },
});
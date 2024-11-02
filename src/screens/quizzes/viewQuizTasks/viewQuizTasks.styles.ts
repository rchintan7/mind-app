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
    progressBar: {
        marginTop: 20,
        marginHorizontal: 10,
        flexDirection: 'row',
        height: 6,
    },
    activeSegment: {
        flex: 1,
        backgroundColor: Colors.white,
        marginHorizontal: 4,
        borderRadius: 10,
    },
    inactiveSegment: {
        flex: 1,
        backgroundColor: Colors.white,
        opacity: 0.25,
        marginHorizontal: 4,
        borderRadius: 10,
    },
    dash: {
        height: 5,
        width: 50,
        position: 'absolute',
        backgroundColor: Colors.grey100,
        top: 10
    },
    bottomSection: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.secondaryColor,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    largeText: {
        marginVertical: 16,
        fontSize: 24,
        fontWeight: '700',
        color: Colors.white
    },
    boxView: {
        margin: 8,
        height: 120,
        width: 120,
        justifyContent: 'center',
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
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
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    image: {
        height: 70,
        width: 70,
        alignSelf: 'center'
    },
    percentText: {
        fontSize: 20,
        color: Colors.white,
        fontWeight: '700',
        textAlign: 'center'
    },
    subText: {
        fontSize: 12,
        color: Colors.white,
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: Colors.white,
        borderRadius: 25,
        paddingHorizontal: 80
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.white,
    },
    selectedText: {
        color: Colors.secondaryColor
    }
});
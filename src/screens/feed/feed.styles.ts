import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import GlobalStyles from "../../styles/GlobalStyles";

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black
    },
    appBarStyle: {
        position: 'absolute',
        top: 0,
        zIndex: 1
    },
    videoContainer: {
        height: height,
        ...GlobalStyles.center,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    contentView: {
        ...GlobalStyles.rowContainer,
        position: 'absolute',
        bottom: '16%',
        marginHorizontal: 16
    },
    logo: {
        height: 40,
        width: 40,
        marginRight: 8
    },
    nameText: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.white
    },
    usernameText: {
        fontSize: 12,
        color: Colors.white
    },
    subscriptionSection: {
        padding: 16,
        backgroundColor: Colors.primaryColor,
        borderRadius: 8,
        ...GlobalStyles.shadowLight,
    },
    subscriptionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 10,
    },
    subscriptionSubText: {
        fontSize: 14,
        color: Colors.white,
        marginBottom: 10,
    },
    subscriptionButtonContainer: {
        ...GlobalStyles.rowContainer,
        marginBottom: 10,
    },
    subscriptionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white,
        marginRight: 6,
    },
    subscriptionImage: {
        height: 115,
        width: 125,
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center',
        margin: 20,
    },
    optionContainer: {
        marginTop: 40,
        marginBottom: 20,
    },
    option: {
        ...GlobalStyles.rowSpaceBetween,
        borderWidth: 2,
        borderColor: Colors.borderColor,
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 15,
        marginHorizontal: 20
    },
    selectedOption: {
        borderColor: Colors.secondaryColor,
    },
    optionText: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textColor
    },
    optionSubtext: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '500',
        color: Colors.grey,
    },
    popularContainer: {
        position: 'absolute',
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 4,
        top: -14,
        left: 12
    },
    popularText: {
        fontWeight: '700',
        color: Colors.white
    },
    subText: {
        fontSize: 12,
        color: Colors.grey,
        textAlign: 'center'
    },
    buttonStyle: {
        width: 250,
        alignSelf: 'center',
        marginBottom: 20,
    },
    skipButton: {
        alignSelf: 'center',
    },
    skipButtonText: {
        color: Colors.grey,
        textDecorationLine: 'underline'
    },
    likeView: {
        ...GlobalStyles.center,
        marginLeft: 20
    }
});
import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.textColor,
        textAlign: 'center',
        marginBottom: 20,
    },
    premiumButton: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    premiumButtonText: {
        color: Colors.white,
        fontWeight: '600',
    },
    premiumButtonTextSmall: {
        fontSize: 10,  // Moved fontSize to styles
        color: Colors.white,
        fontWeight: '600',
    },
    featuresTable: {
        borderRadius: 10,
        marginBottom: 20,
        paddingVertical: 10
    },
    featureHeaderText: {
        flex: 1.5,
        alignItems: 'center',
    },
    featureHeaderButtonContainer: {
        flex: 3,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.textColor
    },
    featureRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.secondaryColor,
    },
    featureTitleContainer: {
        flex: 1.5,
    },
    featureText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textColor
    },
    featureIconContainer: {
        flex: 1.5,
        alignItems: 'center',
    },
    overlayRow: {
        flexDirection: 'row',
        position: 'absolute',
    },
    greenOpacityContainer: {
        flex: 3,
        height: 260,
        backgroundColor: Colors.primaryColor,
        opacity: 0.25,
        borderRadius: 4,
        ...GlobalStyles.shadowDefault,
    },
    buttonStyle: {
        width: 300,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    skipButton: {
        alignSelf: 'center',
    },
    skipButtonText: {
        color: Colors.grey,
        textDecorationLine: 'underline'
    },
});
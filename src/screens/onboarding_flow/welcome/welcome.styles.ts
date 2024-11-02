import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.centeredContainer,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.textColor
    },
    logoText: {
        color: Colors.primaryColor
    },
    subtitle: {
        textAlign: 'center',
        marginVertical: 20,
        marginHorizontal: 20,
        color: Colors.grey
    },
    logoImage: {
        height: 200,
        width: 200
    },
    buttonStyle: {
        width: 250
    },
    loginText: {
        marginTop: 16,
        color: Colors.grey,
        textDecorationLine: 'underline'
    },
});
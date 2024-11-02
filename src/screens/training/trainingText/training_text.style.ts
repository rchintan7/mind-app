import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    image: {
        height: '50%',
        width: '100%'
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textColor,
        textAlign: 'center',
        paddingHorizontal: 20
    },
    description: {
        color: Colors.grey,
        textAlign: 'center',
        paddingHorizontal: 20
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textColor,
        textAlign: 'center',
    },
    button: {
        width: 200,
        alignSelf: 'center'
    }
});
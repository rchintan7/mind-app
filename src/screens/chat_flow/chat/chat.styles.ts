import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    sendButton: {
        height: 45,
        width: 45,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: Colors.secondaryColor,
        ...GlobalStyles.center,
    },
    sendImage: {
        height: 150,
        width: 200,
        resizeMode: 'stretch'
    },
    loading: {
        width: 30, 
        height: 30
    },
    trainingPlanButton: {
        width: 190, 
        height: 30, 
        paddingVertical: 0, 
        paddingHorizontal: 0,
        marginLeft: 50
    }
});
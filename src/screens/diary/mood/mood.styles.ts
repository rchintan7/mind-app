import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    innerContainer: {
        padding: 16,
        alignItems: 'center',
        marginTop: '40%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textColor
    },
    subtitle: {
        marginVertical: 20,
        fontSize: 16,
        color: Colors.textColor
    },
    moodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 40,
    },
    moodCard: {
        ...GlobalStyles.center,
        height: 80, 
        width: 60, 
        margin: 0, 
        padding: 0, 
    },
    moodIcon: {
        fontSize: 30
    },
    moodText: {
        fontSize: 11, 
        color: Colors.grey
    },
    saveButtonContainer: {
        width: '100%',
        alignItems: 'center'
    },
});
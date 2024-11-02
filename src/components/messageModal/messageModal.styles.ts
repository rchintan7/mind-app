import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import GlobalStyles from "../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    modal: {
        alignItems: 'flex-end',
        margin: 0,
    },
    container: {
        alignItems: 'center',
    },
    contentText: {
        fontSize: 16, 
        color: Colors.white, 
        fontWeight: '500'
    },
    contentView: {
        maxWidth: '70%', 
        padding: 16, 
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        backgroundColor: Colors.primaryColor
    },
    buttonGroupContainer: {
        ...GlobalStyles.rowContainer,
        marginTop: 12
    },
    buttonText: {
        fontSize: 12,
        color: Colors.white
    },
    categoryButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        margin: 5,
        borderWidth: 1,
        borderColor: Colors.white
    },
});
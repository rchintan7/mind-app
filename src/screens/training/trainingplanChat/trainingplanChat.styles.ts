import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    chatImageContainer: {
        backgroundColor: Colors.secondaryColor,
        borderRadius: 6,
        ...GlobalStyles.center,
    },
    playContainer: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: Colors.secondaryColor,
        borderRadius: 50,
        height: 50,
        width: 50,
        ...GlobalStyles.center,
    },
});
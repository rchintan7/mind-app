import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    socialBattery: {
        ...GlobalStyles.center,
        marginTop: '40%',
        marginVertical: 20,
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textColor
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.textColor
    },
    batteryBar: {
        margin: 24
    },
    saveButtonContainer: {
        marginTop: 40,
        width: '100%',
        alignItems: 'center'
    },
    progress: {
        height: 15,
        width: '19%',
        borderRadius: 20,
    },
    progressWrapper: {
        ...GlobalStyles.rowSpaceBetween,
        width: '100%'
    },
    progressPercent: {
        fontSize: 12, 
        color: Colors.grey, 
        marginTop: 10
    }
});
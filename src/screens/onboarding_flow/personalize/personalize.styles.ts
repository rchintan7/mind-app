import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    container: {
      ...GlobalStyles.centeredContainer,
      paddingHorizontal: 20,
    },
    image: {
      height: 200,
      width: 200
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: Colors.textColor
    },
    subtitle: {
      textAlign: 'center',
      marginVertical: 20,
      marginHorizontal: 20,
      color: Colors.grey
    },
    buttonStyle: {
      width: 250,
    },
    skipButtonText: {
      marginTop: 16,
      color: Colors.grey,
      textDecorationLine: 'underline'
    },
  });
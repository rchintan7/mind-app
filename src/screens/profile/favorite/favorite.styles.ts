import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
    imageWrapper: {
        position: 'relative',
    },
    image: {
        width: 110,
        height: 140,
        resizeMode: 'stretch',
        borderRadius: 12,
        borderColor:Colors.secondaryColor,
        borderWidth:2,
    },
    playButton: {
        position: 'absolute',
        top: '37%',
        left: '35%',
    },
    cardContent: {
        flex: 1,
        paddingLeft: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        color: Colors.grey,
        marginTop: 4,
    },
    likeContainer: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    headerLikeContainer: {
        alignItems: 'center',
        width: 40
    },
});
import React from "react";
import { GestureResponderEvent, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import BackIcon from "../assets/svg/back.svg";
import SizedBox from "./../sizedbox/sizedbox";
import { styles } from "./backButton.styles";

interface BackButtonProps {
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    style?: StyleProp<ViewStyle> | undefined;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <View style={styles.container}>
                <BackIcon height={14} />
                <SizedBox width={5} />
                <Text style={styles.text}>ZURÜCK</Text>
            </View>
        </TouchableOpacity>
    )
};

export default BackButton;
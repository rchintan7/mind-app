import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/colors';
import { Images } from '../../constants/images';
import { styles } from './appbar.styles';

interface TopAppBarProps {
    title: string;
    onBackPress?: () => void;
    onSearchPress?: () => void;
    onMenuPress?: () => void;
    headerStyle?: StyleProp<ViewStyle> | undefined;
    headerTextStyle?: StyleProp<TextStyle> | undefined;
    style?: StyleProp<ViewStyle> | undefined;
    actions?: any,
    iconColor?: string,
}

const AppBar: React.FC<TopAppBarProps> = ({ title, onBackPress, headerStyle, headerTextStyle, style, actions, iconColor }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={style}>
            <View style={{ height: insets.top, backgroundColor: Colors.white }} />
            <View style={[styles.header, { height: 60 }, headerStyle]}>
                {onBackPress ? (
                    <TouchableOpacity onPress={onBackPress} style={styles.button}>
                        <Icon name="arrow-back-ios" size={22} color={iconColor || Colors.textColor} />
                    </TouchableOpacity>
                ) : <View style={{ width: 40 }} />}
                <Text style={[styles.title, headerTextStyle]}>{title}</Text>
                <View style={styles.actions}>
                    {actions
                        ? actions
                        : <View style={styles.avatarContainer}>
                            <Image source={Images.avatar} style={styles.avatar} />
                        </View>
                    }
                </View>
            </View>
        </View>
    );
};

export default AppBar;
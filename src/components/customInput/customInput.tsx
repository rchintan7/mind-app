import React, { useState } from 'react';
import { TextInput, View, TextInputProps, StyleProp, TextStyle, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../constants/colors';
import { styles } from './customInput.styles';
import { Controller } from 'react-hook-form';
import GlobalStyles from '../../styles/GlobalStyles';
import { getErrorMessage } from '../../config/enums';

interface CustomInputProps extends TextInputProps {
    name: string;
    control?: any;
    style?: StyleProp<TextStyle> | undefined;
    innerContainerStyle?: StyleProp<TextStyle> | undefined;
    secureTextEntry?: boolean;
    error?: string;
    isFeedback?: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({ name, control, style, innerContainerStyle, secureTextEntry, error, isFeedback, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

    return (
        <View style={style}>
            <View style={[styles.container, isFocused && { borderColor: Colors.black }, innerContainerStyle]}>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.textInput, isFeedback && { height: 150, }]}
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry={!isPasswordVisible && secureTextEntry}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            {...props}
                        />
                    )}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={16} color={Colors.grey} />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={GlobalStyles.controlError}>{getErrorMessage(error)}</Text>}
        </View>
    );
};

export default CustomInput;
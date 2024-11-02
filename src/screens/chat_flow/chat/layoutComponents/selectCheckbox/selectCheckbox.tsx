import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './selectCheckbox.styles';
import Colors from '../../../../../constants/colors';

interface SelectCheckboxProps {
    text: string;
    onChangeValue: (value: boolean) => void;
}

const SelectCheckbox: React.FC<SelectCheckboxProps> = ({ text, onChangeValue }) => {
    const [value, setValue] = useState(false);

    const handlePress = () => {
        const newValue = !value;
        setValue(newValue);
        onChangeValue(newValue);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.checkButton, value && { backgroundColor: Colors.secondaryColor }]}>
            {value ? (
                <MaterialIcons name="check-circle" color={Colors.white} size={20} />
            ) : (
                <MaterialIcons name="radio-button-unchecked" color={Colors.secondaryColor} size={20} />
            )}
            <Text style={[styles.checkText, value && { color: Colors.white }]}>{text}</Text>
        </TouchableOpacity>
    );
};

export default SelectCheckbox;
import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './selectChip.styles';

interface SelectChipProps {
    text: string | undefined;
    showText?: string | undefined;
    value?: boolean;
    onChangeValue: (value: string) => void;
}

const SelectChip: React.FC<SelectChipProps> = ({ text, showText, value, onChangeValue }) => {

    const handlePress = () => {
        onChangeValue(text || '');
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={[styles.chipContainer, value && styles.selectedChip]}>
            <Text style={[styles.chipText, value && styles.selectedText]}>
                {showText || text}
            </Text>
        </TouchableOpacity>
    );
};

export default SelectChip;
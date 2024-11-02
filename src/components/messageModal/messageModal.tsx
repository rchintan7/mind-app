import React, { useState } from 'react';
import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import { styles } from './messageModal.styles';

interface MessageModalProps {
    isVisible: boolean;
    onClose: () => void;
    containerStyle?: StyleProp<ViewStyle>;
}

const MessageModal: React.FC<MessageModalProps> = ({ isVisible, onClose, containerStyle }) => {
    const insets = useSafeAreaInsets();

    const SelectChip = ({ text, onChangeValue }: any) => {
        const [value, setValue] = useState(false);

        return (
            <TouchableOpacity
                onPress={() => {
                    setValue(!value)
                    onChangeValue(!value)
                }}
                style={[styles.categoryButton, value && { borderWidth: 0, backgroundColor: Colors.secondaryColor }]}>
                <Text style={[styles.buttonText, value && { color: Colors.white }]}>{text}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modal}
            backdropColor="black"
            backdropOpacity={0.5}
        >
            <View style={[styles.container, containerStyle]}>
                <View style={styles.contentView}>
                    <Text style={styles.contentText}>Lorem ipsum dolor sit amet consectetur. Pretium feugiat ac sed consequat. Diam.</Text>
                </View>
                <View style={styles.buttonGroupContainer}>
                    <SelectChip text={'👋 Lorem ipsum'} onChangeValue={(v: boolean) => { }} />
                    <SelectChip text={'👍 Lorem ipsum'} onChangeValue={(v: boolean) => { }} />
                </View>
            </View>
        </Modal>
    );
};

export default MessageModal;
import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './customBottomSheet.styles';

interface CustomBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    children: any;
}

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ isVisible, onClose, containerStyle, children }) => {
    const insets = useSafeAreaInsets();

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modal}
            backdropColor="black"
            backdropOpacity={0.5}
        >
            <View style={[styles.container, { paddingBottom: 20 + insets.bottom }, containerStyle]}>
                {children}
            </View>
        </Modal>
    );
};

export default CustomBottomSheet;
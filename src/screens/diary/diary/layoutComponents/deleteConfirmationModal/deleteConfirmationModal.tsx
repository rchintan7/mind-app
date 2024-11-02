import React from 'react';
import { View, Text } from 'react-native';
import CustomBottomSheet from '../../../../../components/customBottomSheet/customBottomSheet';
import SizedBox from '../../../../../components/sizedbox/sizedbox';
import CustomButton from '../../../../../components/customButton/customButton';
import OutlinedButton from '../../../../../components/outlinedButton/outlinedButton';
import { styles } from './deleteConfirmationModal.styles';

interface DeleteConfirmationModalProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirmDelete: () => void;
    title: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isVisible,
    onClose,
    onConfirmDelete,
    title
}) => {
    return (
        <CustomBottomSheet
            isVisible={isVisible}
            onClose={onClose}
            containerStyle={{ paddingTop: 12 }}
        >
            <View style={styles.modalDash} />
            <View style={styles.modalContent}>
                <Text style={styles.title}>Möchten Sie dieses {title} wirklich löschen?</Text>
                <Text style={styles.warningText}>Diese Aktion kann nicht rückgängig gemacht werden.</Text>

                <SizedBox height={20} />

                <View style={styles.buttonContainer}>
                    <OutlinedButton
                        title="Abmelden"
                        onPress={onClose}
                        buttonStyle={styles.cancelBtn}
                        textStyle={styles.cancelBtnText}
                    />
                    <CustomButton
                        title="löschen"
                        onPress={onConfirmDelete}
                        buttonStyle={styles.deleteBtn}
                        textStyle={styles.deleteBtnText}
                    />
                </View>
            </View>

            <SizedBox height={30} />
        </CustomBottomSheet>
    );
};

export default DeleteConfirmationModal;

import React from 'react';
import { Modal, View, Text, TextInput } from 'react-native';
import { styles } from './UpdateDetailsModal.styles';
import CustomButton from '../../../../../components/customButton/customButton';

interface UpdateDetailsModal {
  visible: boolean;
  onClose: () => void;
  title: string;
  placeholder: string;
  onSubmit: (value: string) => void;
}

const UpdateDetailsModal: React.FC<UpdateDetailsModal> = ({
  visible,
  onClose,
  title,
  placeholder,
  onSubmit,
}) => {
  const [newValue, setNewValue] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const handleSubmit = () => {
    if (!newValue.trim()) {
      setError('Dieses Feld darf nicht leer sein.');
      return;
    }
    setError('');
    onSubmit(newValue);
    setNewValue('');
    onClose();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              value={newValue}
              onChangeText={text => {
                setNewValue(text);
                if (error) setError('');
              }}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>
          <View
            style={styles.buttonsContainer}>
            <CustomButton
              onPress={onClose}
              title={'Abbrechen'}
              buttonStyle={styles.cancelBtn}
              textStyle={styles.cancleBtnText}
            />
            <CustomButton
              onPress={handleSubmit}
              title={'Aktualisieren'}
              buttonStyle={styles.submitBtn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateDetailsModal;

import React, { useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomBottomSheet from '../../../../../components/customBottomSheet/customBottomSheet';
import SizedBox from '../../../../../components/sizedbox/sizedbox';
import { styles } from './AddDestinationModal.styles';
import RadioButton from '../../../../../components/radioButton/radioButton';
import CustomButton from '../../../../../components/customButton/customButton';
import OutlinedButton from '../../../../../components/outlinedButton/outlinedButton';

interface SelectImageModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  onDelete: any;
  isEdit?: boolean;
  data: any;
  loading: boolean;
}

const AddDestinationModal: React.FC<SelectImageModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  isEdit,
  data,
  loading,
  onDelete
}) => {
  const [destination, setDestination] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [type, setType] = React.useState('');
  const [typeError, setTypeError] = React.useState('');
  const [reachGoal, setReachGoal] = React.useState<string>('');
  const [reachGoalError, setReachGoalError] = React.useState<string>('');
  const [reachedGoal, setReachedGoal] = React.useState<string>('');
  const [reachGoaledError, setReachedGoalError] = React.useState<string>('');

  function resetFields() {
    setDestination('');
    setType('');
    setReachGoal('');
    setReachedGoal('');
    setReachGoalError('');
    setReachedGoalError('');
    setError('');
    setTypeError('');
  }

  useEffect(() => {
    if (isEdit && data) {
      setDestination(data.goal);
      setType(data.goalType);
      setReachGoal(data.goalCount.toString());
      setReachedGoal(data.completedCount.toString());
    }
  }, [isEdit, data]);

  const validateFields = () => {

    let isValid = true;
    setError('');
    setReachGoalError('');
    setReachedGoalError('');

    if (!destination) {
      setError('Please enter a goal');
      isValid = false;
    }
    if (!type) {
      setTypeError('Please select a goal type');
      isValid = false;
    }


    if (!reachGoal || isNaN(Number(reachGoal)) || parseInt(reachGoal, 10) < 0) {
      setReachGoalError('Please enter a valid number');
      isValid = false;
    }
    if (isEdit && parseInt(reachedGoal, 10) > parseInt(reachGoal, 10)) {
      setReachedGoalError('Reached goal must be less than the target goal');
      isValid = false;
    }
    if (
      isEdit &&
      (!reachedGoal ||
        isNaN(Number(reachedGoal)) ||
        parseInt(reachedGoal, 10) < 0)
    ) {
      setReachedGoalError('Please enter a valid number');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      const payload: any = {
        goal: destination,
        goalType: type,
        goalCount: type === 'DAILY' ? 1 : parseInt(reachGoal, 10),
        completedCount: 0,
      };

      // const updatePayload: any = {
      //   id: data.id,
      //   completedCount: parseInt(reachedGoal, 10),
      // };

      // onSubmit(isEdit ? updatePayload : payload);
      onSubmit(payload);
      resetFields();
    }
  };

  return (
    <CustomBottomSheet
      isVisible={isVisible}
      onClose={() => {
        onClose();
        resetFields();
      }}
      containerStyle={{ paddingTop: 12 }}>
      <View style={styles.modalDash} />
      <View style={styles.modalContent}>
        <Text style={styles.title}>{'Ziel'}</Text>
        <View>
          <TextInput
            style={styles.input}
            value={destination}
            editable={!isEdit}
            onChangeText={text => {
              setDestination(text);
              if (error) setError('');
            }}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        <View style={styles.fieldSpace}>
          <SizedBox height={8} />
          <RadioButton
            disabled={isEdit}
            selected={type === 'DAILY'}
            text="Täglich"
            onPress={() => {
              setType('DAILY');
              setReachGoal('1')
              setTypeError('');
            }}
          />
          <SizedBox height={15} />
          <RadioButton
            disabled={isEdit}
            selected={type === 'WEEKLY'}
            text="Wöchentlich"
            onPress={() => {
              setType('WEEKLY');
              setTypeError('');
            }}
          />
          <SizedBox height={15} />
          <RadioButton
            disabled={isEdit}
            selected={type === 'MONTHLY'}
            text="Monatlich"
            onPress={() => {
              setType('MONTHLY');
              setTypeError('');
            }}
          />
          {typeError ? <Text style={styles.error}>{typeError}</Text> : null}
          <SizedBox height={25} />
        </View>

        <Text style={styles.titleCenter}>
          {'Wie oft willst du das Ziel erreichen?'}
        </Text>
        <View>
          <TextInput
            style={styles.input}
            value={reachGoal}
            editable={type !== 'DAILY' && !isEdit}
            keyboardType="numeric"
            onChangeText={(text: string) => {
              const numericText = text.replace(/[^0-9]/g, '');
              setReachGoal(numericText);
              if (reachGoalError) setReachGoalError('');
            }}
          />
          {reachGoalError ? (
            <Text style={styles.error}>{reachGoalError}</Text>
          ) : null}
        </View>

        {isEdit && (
          <>
            <Text style={styles.titleCenter}>
              {'Wie oft haben Sie das Ziel erreicht?'}
            </Text>
            <View>
              <TextInput
                style={styles.input}
                value={reachedGoal}
                editable={!isEdit}
                onChangeText={(value: string) => {
                  const numericText = value.replace(/[^0-9]/g, '');
                  setReachedGoal(numericText);
                  if (reachGoalError) setReachedGoalError('');
                }}
              />
              {reachGoaledError && (
                <Text style={styles.error}>{reachGoaledError}</Text>
              )}
            </View>
          </>
        )}

        <SizedBox height={20} />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <OutlinedButton
            title="Abbechen"
            onPress={() => {
              onClose();
              resetFields();
            }}
            buttonStyle={styles.cancelBtn}
            textStyle={styles.cancleBtnText}
          />
          {
            isEdit ?
              <OutlinedButton
                title="Abmelden"
                onPress={async () => {
                  onDelete();
                }}
                textStyle={styles.deleteText}
                buttonStyle={styles.deleteButton}
              />
              :
              <CustomButton
                title="Speichern"
                onPress={handleSubmit}
                buttonStyle={styles.saveBtn}
                textStyle={styles.saveBtnText}
                loading={loading}
              />
          }
        </View>
      </View>

      <SizedBox height={30} />
    </CustomBottomSheet>
  );
};

export default AddDestinationModal;

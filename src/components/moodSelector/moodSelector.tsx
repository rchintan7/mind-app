import React, { FC } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import Card from './../card/card';
import SizedBox from './../sizedbox/sizedbox';
import { styles } from './moodSelector.styles';
import { Mood } from '../../utils/enums';

// Define the props for the MoodSelector component
interface MoodSelectorProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedMood?: Mood | null;
    setSelectedMood: (mood: Mood) => void;
}

const MoodSelector: FC<MoodSelectorProps> = ({
    modalVisible,
    setModalVisible,
    selectedMood,
    setSelectedMood,
}) => {
    const moods: Mood[] = [
        { icon: '😣', name: 'Schlecht', type: 'BAD' },
        { icon: '😕', name: 'Geht so', type: 'OK' },
        { icon: '🙂', name: 'Normal', type: 'NORMAL' },
        { icon: '☺️', name: 'Gut', type: 'GOOD' },
        { icon: '🤩', name: 'Super', type: 'SUPER' },
    ];

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleMoodSelect = (mood: Mood) => {
        setSelectedMood(mood);
        closeModal();
    };

    return (
        <Modal
            isVisible={modalVisible}
            onBackdropPress={closeModal}
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                <View style={styles.moodContainer}>
                    {moods.map((mood, index) => {
                        const isSelected = selectedMood === mood;

                        return (
                            <React.Fragment key={index}>
                                <Card
                                    onPress={() => handleMoodSelect(mood)}
                                    style={[
                                        styles.moodButton,
                                        isSelected && styles.selectedMood,
                                    ]}
                                >
                                    <Text style={styles.moodText}>{mood.icon}</Text>
                                    <Text style={styles.label}>{mood.name}</Text>
                                </Card>
                                {index !== moods.length - 1 && <SizedBox width={8} />}
                            </React.Fragment>
                        );
                    })}
                </View>
            </View>
        </Modal>
    );
};

export default MoodSelector;
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from './stepProgress.styles';

interface StepProgressProps {
    totalSteps: number;           // Total number of steps in the progress indicator
    activeSteps: number;          // Number of active steps (completed)
    activeColor?: string;         // Custom color for active segments
    inactiveColor?: string;       // Custom color for inactive segments
    style?: StyleProp<ViewStyle>;
}

const StepProgress: React.FC<StepProgressProps> = ({
    totalSteps,
    activeSteps,
    activeColor = '#FFFFFF',
    inactiveColor = 'rgba(255, 255, 255, 0.25)',
}) => {
    const segments = Array.from({ length: totalSteps }, (_, index) => (
        <View
            key={index}
            style={[
                styles.segment,
                index < activeSteps
                    ? { backgroundColor: activeColor } // Active segment color
                    : { backgroundColor: inactiveColor }, // Inactive segment color
            ]}
        />
    ));

    return (
        <View style={styles.progressBar}>
            {segments}
        </View>
    );
};

export default StepProgress;
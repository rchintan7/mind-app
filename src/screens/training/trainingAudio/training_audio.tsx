import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './training_audio.style';
import GlobalStyles from '../../../styles/GlobalStyles';
import CustomButton from '../../../components/customButton/customButton';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Sound from 'react-native-sound';
import { useTaskCompleted } from '../../../api/apis';

const TrainingAudioScreen = ({ navigation, route }: any) => {
    const { data } = route.params;
    const insets = useSafeAreaInsets();
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<Sound | null>(null);
    const [loading, setLoading] = useState(true);
    const { taskCompleted, loading: taskCompletedLoading } = useTaskCompleted();

    const categoryRequirement = data?.categoryRequirements?.[0]?.category || {};
    const { id: categoryId, baseCategory } = categoryRequirement;

    useEffect(() => {
        taskCompleted({
            taskId: data?.tasks?.[0]?.id,
            taskflowId: data?.id,
            categoryId: categoryId || '',
            isCompleted: true,
            baseCategory: baseCategory || ''
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        const sound = new Sound(data?.tasks?.[0]?.imageURL, undefined, (error) => {
            if (error) {
                console.error('Failed to load the sound:', error);
                setLoading(false);
                return;
            }
            setAudio(sound);
            setLoading(false);
        });

        const unsubscribe = navigation.addListener('blur', () => {
            if (sound) {
                sound.stop(() => {
                    console.log('Sound stopped');
                });
            }
        });

        return () => {
            if (sound) {
                sound.release(); // Release resources when component unmounts
            }
            unsubscribe(); // Clean up the listener
        };
    }, [data]);

    const handlePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play((success: any) => {
                    if (!success) {
                        console.log('Playback failed');
                    }
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <View style={{ height: insets.top }} />
            <SizedBox flex={3} />
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <CustomButton
                    onPress={handlePlayPause}
                    buttonStyle={styles.button}
                    title={isPlaying ? 'Pause' : 'Play'} />
            )}
            <SizedBox flex={2} />
            <Text style={styles.title}>{data?.tasks?.[0]?.title}</Text>
            <SizedBox flex={0.5} />
            <Text style={styles.description}>{data?.tasks?.[0]?.description}</Text>
            <SizedBox flex={0.5} />
            <CustomButton
                onPress={() => navigation.goBack()}
                title={'Weiter'}
                buttonStyle={styles.button} />
            <SizedBox flex={3} />
        </View >
    );
};

export default TrainingAudioScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './training_video.style';
import GlobalStyles from '../../../styles/GlobalStyles';
import CustomButton from '../../../components/customButton/customButton';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import { useTaskCompleted } from '../../../api/apis';

const TrainingVideoScreen = ({ navigation, route }: any) => {
    const { data } = route.params;
    const insets = useSafeAreaInsets();
    const [paused, setPaused] = useState(false);
    const { taskCompleted, loading: taskCompletedLoading } = useTaskCompleted();

    const categoryRequirement = data?.categoryRequirements?.[0]?.category || {};
    const { id: categoryId, baseCategory } = categoryRequirement;

    useEffect(() => {
        const body = {
            taskId: data?.tasks?.[0]?.id,
            taskflowId: data?.id,
            categoryId: categoryId || '',
            isCompleted: true,
            baseCategory: baseCategory || ''
        }
        console.log(body);
        
        taskCompleted(body)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }, [])

    const handleVideoClick = () => {
        setPaused(!paused);
    };
    
    return (
        <View style={GlobalStyles.container}>
            <View style={{ height: insets.top }} />
            <SizedBox flex={3} />
            <TouchableOpacity
                onPress={() => handleVideoClick()}
                activeOpacity={1}>
                <Video
                    source={{ uri: data?.tasks?.[0]?.imageURL }}
                    style={styles.video}
                    resizeMode="cover"
                    paused={paused}
                />
            </TouchableOpacity>
            {/* <SizedBox flex={1} /> */}
            <Text style={styles.title}>{data?.tasks?.[0]?.title}</Text>
            <SizedBox flex={1} />
            <Text style={styles.description}>{data?.tasks?.[0]?.description}</Text>
            <SizedBox flex={1} />
            <CustomButton
                onPress={() => navigation.goBack()}
                title={'Weiter'}
                buttonStyle={styles.button} />
            <SizedBox flex={3} />
        </View >
    );
};

export default TrainingVideoScreen;

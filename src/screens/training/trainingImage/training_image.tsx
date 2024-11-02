import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './training_image.style';
import GlobalStyles from '../../../styles/GlobalStyles';
import CustomButton from '../../../components/customButton/customButton';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTaskCompleted } from '../../../api/apis';

const TrainingImageScreen = ({ navigation, route }: any) => {
    const { data } = route.params;
    const insets = useSafeAreaInsets();
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

    return (
        <View style={GlobalStyles.container}>
            <View style={{ height: insets.top }} />
            <SizedBox flex={3} />
            <Image source={{ uri: data?.tasks?.[0]?.imageURL }} style={styles.image} />
            <SizedBox flex={1} />
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

export default TrainingImageScreen;

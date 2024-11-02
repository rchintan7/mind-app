import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../constants/colors';
import AppBar from '../../../components/appbar/appbar';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { styles } from './tasks.styles';
import GlobalStyles from '../../../styles/GlobalStyles';
import { useSelectedCompletedTasks } from '../../../api/apis';
import Loader from '../../../components/loader/loader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TaskType } from '../../../utils/enums';

const TasksScreen = ({ navigation, route }: any) => {
    const { selectedCompletedTasks, loading: selectedCompletedTasksLoading } = useSelectedCompletedTasks();
    const [completedTasks, setCompletedTasks] = useState<any[]>([]);

    useEffect(() => {
        selectedCompletedTasks(route?.params?.type)
            .then((response) => {
                console.log('selected completed tasks', response);
                setCompletedTasks(response)
            })
            .catch(error => {
                console.error('Error selected completed tasks:', error);
            });
    }, []);

    const getTaskIcon = (taskType: TaskType, color: string) => {
        switch (taskType) {
            case TaskType.VIDEO:
                return <FontAwesome name="video-camera" size={24} color={color} />;
            case TaskType.AUDIO:
                return <FontAwesome name="music" size={24} color={color} />;
            case TaskType.IMAGE:
                return <FontAwesome name="image" size={22} color={color} />;
            case TaskType.TEXT:
                return <FontAwesome name="book" size={24} color={color} />;
            case TaskType.ARTICLE:
                return <FontAwesome name="book" size={24} color={color} />;
            case TaskType.SINGLE_CHOICE_QUESTION:
                return <FontAwesome name="question-circle" size={30} color={color} />;
            default:
                return <FontAwesome name="question-circle" size={24} color={color} />;
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <Loader loading={selectedCompletedTasksLoading} />

            <AppBar onBackPress={() => navigation.goBack()} title={'Trainingsplan'} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>{'Deine Aufgaben'}</Text>
                </View>
                <View style={styles.levelLine} />

                {completedTasks.map((item) => {
                    return (
                        <View style={styles.videoContainer}>
                            {getTaskIcon(item?.tasks?.[0]?.taskType, Colors.white)}
                            <View style={styles.videoContent}>
                                <Text style={styles.videoTitle}>{item?.title}</Text>
                                <Text style={styles.videoSubTitle}>{item?.description}</Text>
                            </View>
                            <Icon name={'check-circle'} size={20} color={Colors.white} />
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
};

export default TasksScreen;
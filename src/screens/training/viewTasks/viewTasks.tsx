import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../constants/colors';
import AppBar from '../../../components/appbar/appbar';
import { Svgs } from '../../../constants/images';
import Icon from 'react-native-vector-icons/FontAwesome6';
import CustomButton from '../../../components/customButton/customButton';
import Card from '../../../components/card/card';
import { styles } from './viewTasks.styles';
import GlobalStyles from '../../../styles/GlobalStyles';
import { useAllCompletedTasks, useAllTask, useSelectedCompletedTasks, useTaskFlows } from '../../../api/apis';
import Loader from '../../../components/loader/loader';
import { TaskType } from '../../../utils/enums';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ViewTasksScreen = ({ navigation, route }: any) => {
    const { getTaskFlows, loading: getTaskFlowsLoading } = useTaskFlows();
    const { getAllTask, loading: getAllTaskLoading } = useAllTask();
    const { allCompletedTasks, loading: allCompletedTasksLoading } = useAllCompletedTasks();
    const { selectedCompletedTasks, loading: selectedCompletedTasksLoading } = useSelectedCompletedTasks();
    const [trainingTasks, setTrainingTasks] = useState<any>([]);
    const [quizTasks, setQuizTasks] = useState<any>([]);
    const [completedTasks, setCompletedTasks] = useState<any[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            if (route.params.screen === 'All') {
                getAllTask()
                    .then(response => {
                        console.log('Full Response:', response);

                        // Extract task flows from the response
                        const tasksArray = response.map((taskFlow: any) => taskFlow);

                        // Separate tasks based on taskFlowType
                        const trainingList = tasksArray.filter((taskFlow: { taskFlowType: string; }) => taskFlow.taskFlowType !== 'QUIZ');
                        const quizList = tasksArray.filter((taskFlow: { taskFlowType: string; }) => taskFlow.taskFlowType === 'QUIZ');

                        // Update the state with the extracted tasks
                        setTrainingTasks(trainingList);
                        setQuizTasks(quizList);

                        console.log('Training Tasks:', trainingTasks);
                        console.log('Quiz Tasks:', quizTasks);
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
                // allCompletedTasks()
                //     .then((response) => {
                //         console.log('All completed tasks', response);
                //         setCompletedTasks(response)
                //     })
                //     .catch(error => {
                //         console.error('Error all completed tasks:', error);
                //     });
            } else {
                getTaskFlows(route?.params?.type)
                    .then(response => {
                        const tasksArray = response.map((taskFlow: any) => taskFlow);

                        // Separate tasks based on taskFlowType
                        const trainingList = tasksArray.filter((taskFlow: { taskFlowType: string; }) => taskFlow.taskFlowType === 'TRAINING');
                        const quizList = tasksArray.filter((taskFlow: { taskFlowType: string; }) => taskFlow.taskFlowType === 'QUIZ');

                        console.log('1 ->', trainingList);
                        console.log('2 ->', quizList);

                        setTrainingTasks(trainingList);
                        setQuizTasks(quizList);
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
                // selectedCompletedTasks(route?.params?.type)
                //     .then((response) => {
                //         console.log('selected completed tasks', response);
                //         setCompletedTasks(response)
                //     })
                //     .catch(error => {
                //         console.error('Error selected completed tasks:', error);
                //     });
            }
        }, [])
    );

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

    const renderTrainingList = (tasks: any) => (
        tasks.map((item: any, index: number) => (
            <Card
                key={index}
                onPress={() => {
                    if (item?.tasks?.[0]?.taskType === TaskType.IMAGE) {
                        navigation.navigate('TrainingImageScreen', { data: item })
                    } else if (item?.tasks?.[0]?.taskType === TaskType.VIDEO) {
                        navigation.navigate('TrainingVideoScreen', { data: item })
                    } else if (item?.tasks?.[0]?.taskType === TaskType.AUDIO) {
                        navigation.navigate('TrainingAudioScreen', { data: item })
                    } else {
                        navigation.navigate('TrainingTextScreen', { data: item })
                    }
                }}
                style={[styles.taskContainer, item?.tasks?.[0]?.isCompleted && { backgroundColor: Colors.primaryColor }]}
            >
                {getTaskIcon(item?.tasks?.[0]?.taskType, item?.tasks?.[0]?.isCompleted ? Colors.white : Colors.primaryColor)}
                <View style={styles.videoContent}>
                    <Text style={[styles.taskTitle, item?.tasks?.[0]?.isCompleted && { color: Colors.white }]}>{item?.title}</Text>
                    <Text style={[styles.taskSubTitle, item?.tasks?.[0]?.isCompleted && { color: Colors.white }]}>{item?.description}</Text>
                </View>
                {item?.tasks?.[0]?.isCompleted && <Icon name={'check-circle'} size={20} color={Colors.white} />}
            </Card>
        ))
    );

    const renderQuizist = (tasks: any) => (
        tasks.map((item: any, index: number) => (
            <Card key={index}
                style={[styles.taskContainer, item?.tasks?.[0]?.isCompleted && { backgroundColor: Colors.primaryColor }]}
            >
                {getTaskIcon(item?.tasks?.[0]?.taskType, item?.tasks?.[0]?.isCompleted ? Colors.white : Colors.primaryColor)}
                <View style={styles.videoContent}>
                    <Text style={[styles.taskTitle, item?.tasks?.[0]?.isCompleted && { color: Colors.white }]}>{item?.title}</Text>
                    <Text style={[styles.taskSubTitle, item?.tasks?.[0]?.isCompleted && { color: Colors.white }]}>{item?.description}</Text>
                </View>
                {item?.tasks?.[0]?.isCompleted
                    ? <Icon name={'check-circle'} size={20} color={Colors.white} />
                    : <CustomButton
                        onPress={() => { navigation.navigate('WelcomeQuizScreen', { data: item }); }}
                        title={'Starten'}
                        buttonStyle={styles.startButtonStyle}
                        textStyle={styles.startTextStyle} />}
            </Card>
        ))
    );

    const renderAllTask = (tasks: any) => (
        tasks.map((item: any, index: number) => (
            <Card
                key={index}
                onPress={() => {
                    if (item?.tasks?.[0]?.taskType === TaskType.IMAGE) {
                        navigation.navigate('TrainingImageScreen', { data: item })
                    } else if (item?.tasks?.[0]?.taskType === TaskType.VIDEO) {
                        navigation.navigate('TrainingVideoScreen', { data: item })
                    } else if (item?.tasks?.[0]?.taskType === TaskType.AUDIO) {
                        navigation.navigate('TrainingAudioScreen', { data: item })
                    } else {
                        navigation.navigate('TrainingTextScreen', { data: item })
                    }
                }}
                style={[styles.taskContainer, item?.tasks?.[0]?.isCompleted && { backgroundColor: Colors.primaryColor }]}
            >
                {getTaskIcon(item?.tasks?.[0]?.taskType, item?.tasks?.[0]?.isCompleted ? Colors.white : Colors.primaryColor)}
                <View style={styles.videoContent}>
                    <Text style={[styles.taskTitle, item?.tasks?.[0]?.isCompleted && { color: Colors.white }]}>{item?.title}</Text>
                    <Text style={[styles.taskSubTitle, item?.tasks?.[0]?.isCompleted && { color: Colors.white }]}>{item?.description}</Text>
                </View>
                {item?.tasks?.[0]?.isCompleted && <Icon name={'check-circle'} size={20} color={Colors.white} />}
            </Card>
        ))
    );

    const renderAllTaskQuiz = (tasks: any) => (
        tasks.map((item: any, index: number) => (
            <Card key={index}
                style={[styles.taskContainer, item?.tasks?.[0]?.isCompleted && { backgroundColor: Colors.primaryColor }]}
            >
                {getTaskIcon(item?.tasks?.[0]?.taskType, item?.tasks?.[0]?.isCompleted ? Colors.white : Colors.primaryColor)}
                <View style={styles.videoContent}>
                    <Text style={[styles.taskTitle, item?.tasks?.[0]?.isCompleted && { color: Colors.white }]}>{item?.title}</Text>
                    <Text style={[styles.taskSubTitle, item?.tasks?.[0]?.isCompleted && { color: Colors.white }]}>{item?.description}</Text>
                </View>
                {item?.tasks?.[0]?.isCompleted
                    ? <Icon name={'check-circle'} size={20} color={Colors.white} />
                    : <CustomButton
                        onPress={() => { navigation.navigate('WelcomeQuizScreen', { data: item }); }}
                        title={'Starten'}
                        buttonStyle={styles.startButtonStyle}
                        textStyle={styles.startTextStyle} />}
            </Card>
        ))
    );

    return (
        <View style={GlobalStyles.container}>
            <Loader loading={getTaskFlowsLoading || getAllTaskLoading || allCompletedTasksLoading || selectedCompletedTasksLoading} />
            <AppBar onBackPress={() => navigation.goBack()} title={'Trainingsplan'} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>{'Deine Aufgaben'}</Text>
                </View>
                <View style={styles.levelLine} />

                {completedTasks?.map((item) => (
                    <View style={styles.videoContainer}>
                        <Icon name={'video'} size={20} color={Colors.white} />
                        <View style={styles.videoContent}>
                            <Text style={styles.videoTitle}>{item?.title}</Text>
                            <Text style={styles.videoSubTitle}>{item?.description}</Text>
                        </View>
                        <Icon name={'check-circle'} size={20} color={Colors.white} />
                    </View>
                ))}

                {route.params.screen === 'All'
                    ? <>
                        {/* Render Training Tasks */}
                        {/* < Text style={styles.title}>Training Tasks</Text> */}
                        {renderAllTask(trainingTasks)}

                        {/* Render Quiz Tasks */}
                        {/* <Text style={styles.title}>Quiz Tasks</Text> */}
                        {renderAllTaskQuiz(quizTasks)}
                    </>
                    : <>
                        {/* Render Training Tasks */}
                        <Text style={styles.title}>Training Tasks</Text>
                        {renderTrainingList(trainingTasks)}

                        {/* Render Quiz Tasks */}
                        <Text style={styles.title}>Quiz Tasks</Text>
                        {renderQuizist(quizTasks)}
                    </>
                }
            </ScrollView>
        </View >
    );
};

export default ViewTasksScreen;

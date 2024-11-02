import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../constants/colors';
import AppBar from '../../../components/appbar/appbar';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Card from '../../../components/card/card';
import GlobalStyles from '../../../styles/GlobalStyles';
import Chip from '../../../components/chip/chip';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { Svgs } from '../../../constants/images';
import { styles } from './completedTasks.styles';
import { useCategoryAnalysis } from '../../../api/apis';
import Loader from '../../../components/loader/loader';

const CompletedTasksScreen = ({ navigation }: any) => {
    const [CategoryAnalysis, setCategoryAnalysis] = useState<any>([]);
    const [totalCompletedTasks, setTotalCompletedTasks] = useState<number>(0);
    const { categoryAnalysis, loading: categoryAnalysisLoading } = useCategoryAnalysis();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        categoryAnalysis()
            .then((response: any) => {
                const processedData = calculateCompletedTasks(response);
                setCategoryAnalysis(response);
                setTotalCompletedTasks(processedData.totalCompleted);
            })
            .catch((error: any) => {
                console.error('Error fetching user data:', error);
            });
    };

    const calculateCompletedTasks = (data: any) => {
        let totalCompleted = 0;

        // Update percentage for each category and calculate total completed tasks
        const updatedTaskStatus = data.taskStatus.map((category: any) => {
            const { completedTask, totalTask } = category;
            const percentage = totalTask > 0
                ? Math.round((completedTask / totalTask) * 100)
                : 0;

            totalCompleted += completedTask;

            return { ...category, percentage };
        });

        // Return updated data with total completed tasks
        return {
            ...data,
            taskStatus: updatedTaskStatus,
            totalCompleted,
        };
    };

    const list = [
        {
            title: 'Lebensfreude',
            value: (CategoryAnalysis?.taskStatus?.[0]?.totalTask ?? 0),
            value1: (CategoryAnalysis?.taskStatus?.[0]?.completedTask ?? 0),
            percent: `${(CategoryAnalysis?.taskStatus?.[0]?.percentage ?? 0).toFixed(0)}`,
            icon: 'sun',
            color: '#FFA07A',
            type: 'JOY_OF_LIFE',
        },
        {
            title: 'Persönliches Wachstum',
            value: (CategoryAnalysis?.taskStatus?.[1]?.totalTask ?? 0),
            value1: (CategoryAnalysis?.taskStatus?.[1]?.completedTask ?? 0),
            percent: `${(CategoryAnalysis?.taskStatus?.[1]?.percentage ?? 0).toFixed(0)}`,
            icon: 'mountain',
            color: '#FFD700',
            type: 'PERSONAL_GROWTH',
        },
        {
            title: 'Emotionale Stärke',
            value: (CategoryAnalysis?.taskStatus?.[2]?.totalTask ?? 0),
            value1: (CategoryAnalysis?.taskStatus?.[2]?.completedTask ?? 0),
            percent: `${(CategoryAnalysis?.taskStatus?.[2]?.percentage ?? 0).toFixed(0)}`,
            icon: 'heart',
            color: '#87CEFA',
            type: 'EMOTIONAL_STRENGTH',
        },
        {
            title: 'Beziehungen',
            value: (CategoryAnalysis?.taskStatus?.[3]?.totalTask ?? 0),
            value1: (CategoryAnalysis?.taskStatus?.[3]?.completedTask ?? 0),
            percent: `${(CategoryAnalysis?.taskStatus?.[3]?.percentage ?? 0).toFixed(0)}`,
            icon: 'hand-holding-heart',
            color: '#FF6347',
            type: 'RELATIONSHIPS',
        }
    ];

    const handleClick = (type?: string) => {
        navigation.navigate('TasksScreen', { type: type })
    };

    return (
        <View style={GlobalStyles.container}>
            <Loader loading={categoryAnalysisLoading} />
            <AppBar onBackPress={() => navigation.goBack()} title={'Completed tasks'} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.cardWrapper}>
                    <Card style={styles.cardStyel}>
                        <Svgs.listCheck height={30} width={30} />
                        <SizedBox width={10} />
                        <View>
                            <Text style={styles.greetingText}>{totalCompletedTasks}</Text>
                            <Text style={styles.subText}>Aufgaben erledigt</Text>
                        </View>
                    </Card>
                    <Card style={styles.cardStyel}>
                        <Svgs.bolt height={30} width={30} />
                        <SizedBox width={10} />
                        <View>
                            <Text style={styles.greetingText}>{CategoryAnalysis?.currentXP}</Text>
                            <Text style={styles.subText}>XP insgesamt</Text>
                        </View>
                    </Card>
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>{'Deine Aufgaben'}</Text>
                </View>
                <View style={styles.levelLine} />

                {list.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            onPress={() => handleClick(item.type)}
                            style={[GlobalStyles.rowContainer, styles.cardStyle]}>
                            <View style={[styles.iconBorder, { borderColor: item.color }]}>
                                <Icon name={item.icon} size={20} color={item.color} />
                            </View>
                            <SizedBox width={8} />
                            <View style={{ flex: 1 }}>
                                <View style={GlobalStyles.rowSpaceBetween}>
                                    <Text style={{ flex: 1, fontSize: 16, fontWeight: '500' }}>{item.title}</Text>
                                    <Chip label={`${item.percent}%`} style={{ backgroundColor: item.color, }} textStyle={{ color: Colors.white }} />
                                </View>
                                <Text style={{ fontSize: 12, color: Colors.grey }}>{item.value1}/{item.value}</Text>
                                <SizedBox height={8} />
                                <View style={GlobalStyles.rowSpaceBetween}>
                                    {[...Array(item.value)].map((_, index) => (
                                        <View
                                            key={index}
                                            style={[styles.taskProgress, { backgroundColor: item.color, opacity: index >= item.value1 ? 0.3 : 1 }]}
                                        />
                                    ))}
                                </View>
                            </View>
                        </Card>
                    )
                })}
            </ScrollView>
        </View>
    );
};

export default CompletedTasksScreen;
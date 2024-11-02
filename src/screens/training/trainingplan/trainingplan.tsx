import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import Colors from '../../../constants/colors';
import AppBar from '../../../components/appbar/appbar';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CustomButton from '../../../components/customButton/customButton';
import Card from '../../../components/card/card';
import GlobalStyles from '../../../styles/GlobalStyles';
import Chip from '../../../components/chip/chip';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { BarChart } from 'react-native-gifted-charts';
import { styles } from './trainingplan.styles';
import { useCategoryAnalysis } from '../../../api/apis';
import Loader from '../../../components/loader/loader';
import { useFocusEffect } from '@react-navigation/native';


const TrainingPlanScreen = ({ navigation }: any) => {
    const { width } = useWindowDimensions();
    const [CategoryAnalysis, setCategoryAnalysis] = useState<any>([]);
    const [totalCompletedTasks, setTotalCompletedTasks] = useState<number>(0);
    const { categoryAnalysis, loading: categoryAnalysisLoading } = useCategoryAnalysis();

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



    const renderProgressCard = (iconName: string, fill: number, iconColor: string, title: string) => (
        <View style={styles.card}>
            <AnimatedCircularProgress
                size={50}
                width={5}
                fill={fill}
                rotation={0}
                tintColor={iconColor}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={`${iconColor}1A`}
            >
                {(fill) => (
                    <Icon name={iconName} size={20} color={iconColor} solid />
                )}
            </AnimatedCircularProgress>
            <SizedBox height={8} />
            <Text style={styles.cardText}>{title}</Text>
        </View>
    );

    const data = [
        { value: CategoryAnalysis?.taskStatus?.[0]?.completedTask || 0, label: 'Lebensfreude' },
        { value: CategoryAnalysis?.taskStatus?.[1]?.completedTask || 0, label: 'Persönliches Wachstum' },
        { value: CategoryAnalysis?.taskStatus?.[2]?.completedTask || 0, label: 'Emotionale Stärke' },
        { value: CategoryAnalysis?.taskStatus?.[3]?.completedTask || 0, label: 'Beziehungen' },
    ];

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

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

    const handleClick = (index: any, screen: string, type?: string) => {
        navigation.navigate('ViewTasksScreen', { type: type, screen: screen })
    };


    return (
        <View style={GlobalStyles.container}>
            <Loader loading={categoryAnalysisLoading} />

            <AppBar title={'Trainingsplan'} />

            {categoryAnalysisLoading
                ? <></>
                : <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>{'Deine Gesamt-Entwicklung'}</Text>
                    </View>

                    <View style={styles.levelLine} />

                    <View style={styles.cardsSection}>
                        {renderProgressCard('sun', CategoryAnalysis?.taskStatus?.[0]?.completedTask ?? 0 / CategoryAnalysis?.taskStatus?.[0]?.totalTask ?? 0, '#FFA07A', 'Lebensfreude')}
                        {renderProgressCard('mountain', CategoryAnalysis?.taskStatus?.[1]?.completedTask ?? 0 / CategoryAnalysis?.taskStatus?.[1]?.totalTask ?? 0, '#FFD700', 'Persönliches Wachstum')}
                        {renderProgressCard('heart', CategoryAnalysis?.taskStatus?.[2]?.completedTask ?? 0 / CategoryAnalysis?.taskStatus?.[2]?.totalTask ?? 0, '#87CEFA', 'Emotionale Stärke')}
                        {renderProgressCard('hand-holding-heart', CategoryAnalysis?.taskStatus?.[3]?.completedTask ?? 0 / CategoryAnalysis?.taskStatus?.[3]?.totalTask ?? 0, '#FF6347', 'Beziehungen')}
                    </View>

                    <View style={styles.titleSection}>
                        <Text style={styles.title}>{'Deine Reise in mind'}</Text>
                    </View>
                    <View style={styles.levelLine} />

                    {/* Stufe Section */}
                    <View style={styles.levelSection}>
                        <View>
                            <Text style={styles.levelText}>Stufe {CategoryAnalysis?.currentLevel}</Text>
                            <View style={styles.levelLine} />
                            <Text style={styles.xpText}>{CategoryAnalysis?.currentXP} XP / {CategoryAnalysis?.nextLevelXP} XP</Text>
                        </View>
                        <AnimatedCircularProgress
                            size={40}
                            width={5}
                            fill={CategoryAnalysis?.totalPercentage}
                            rotation={0}
                            tintColor={Colors.primaryColor}
                            onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor={'#25D5A41A'}
                        >
                            {(fill) => (
                                <Text style={styles.circularProgressText}>{CategoryAnalysis?.totalPercentage}%</Text>
                            )}
                        </AnimatedCircularProgress>
                    </View>

                    <Card style={styles.trainingChartCard}>
                        <BarChart
                            data={data}
                            width={width * 0.7}
                            barWidth={40}
                            spacing={30}
                            noOfSections={5}
                            frontColor={Colors.primaryColor}
                            yAxisLabelTexts={['0', '2', '4', '6', '8', '10']}
                            xAxisLabelsVerticalShift={20}
                            xAxisTextNumberOfLines={2}
                            xAxisLabelTextStyle={{
                                color: Colors.textColor,
                                fontSize: 10,
                                transform: [{ rotate: '-45deg' }],
                                textAlign: 'center',
                            }}
                            dashWidth={5}
                            isAnimated={true}
                        />
                    </Card>

                    <CustomButton
                        onPress={() => { handleClick(0, 'All'); }}
                        title={'Aufgaben ansehen'}
                        buttonStyle={styles.buttonStyle} />

                    <View style={styles.titleSection}>
                        <Text style={styles.title}>{'Deine Aufgaben'}</Text>
                    </View>
                    <View style={styles.levelLine} />

                    {list.map((item, index) => {
                        return (
                            <Card
                                key={index}
                                onPress={() => { handleClick(index, 'Category', item.type); }}
                                style={[GlobalStyles.rowContainer, styles.cardStyle]}>
                                <View style={[styles.iconBorder, { borderColor: item.color }]}>
                                    <Icon name={item.icon} size={20} color={item.color} solid />
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

                    <CustomButton
                        onPress={() => navigation.navigate('CompletedTasksScreen')}
                        title={`< ${totalCompletedTasks} erledigte Aufgaben ansehen`}
                        buttonStyle={styles.disableButtonStyle} />
                </ScrollView>}
        </View>
    );
};

export default TrainingPlanScreen;
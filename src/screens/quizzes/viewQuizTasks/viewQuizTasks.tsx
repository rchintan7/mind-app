import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../constants/colors';
import AppBar from '../../../components/appbar/appbar';
import SizedBox from '../../../components/sizedbox/sizedbox';
import CustomButton from '../../../components/customButton/customButton';
import { styles } from './viewQuizTasks.styles';
import GlobalStyles from '../../../styles/GlobalStyles';

const ViewQuizTasksScreen = ({ navigation, route }: any) => {
    const { data } = route.params;

    const calculateAveragePoints = () => {
        const totalPoints = data?.categories.reduce(
            (acc: number, category: { pointsToEarn: number }) => acc + category.pointsToEarn, 
            0
        );
        const averagePoints = data?.categories.length 
            ? Math.round(totalPoints / data.categories.length) 
            : 0;
        return averagePoints;
    };

    const averagePoints = calculateAveragePoints();

    const list = [
        {
            title: '76%',
            subTitle: 'Lorem ipsum dolor sit amet consectetur.',
            color: '#EEC900'
        },
        {
            title: '76%',
            subTitle: 'Lorem ipsum dolor sit amet consectetur.',
            color: '#36B37E'
        },
        {
            title: '76%',
            subTitle: 'Lorem ipsum dolor sit amet consectetur.',
            color: '#E95432'
        },
        {
            title: '76%',
            subTitle: 'Lorem ipsum dolor sit amet consectetur.',
            color: '#1565D8'
        }
    ];

    return (
        <View style={GlobalStyles.container}>
            <AppBar onBackPress={() => navigation.goBack()} title={'Trainingsplan'} />
            <View style={styles.modal}>
                <View style={GlobalStyles.centeredContainer}>
                    <Text style={styles.questionText}>{data?.name}</Text>
                    <View style={styles.dash} />
                </View>
                <View style={styles.bottomSection}>
                    <SizedBox height={'10%'} />
                    <View style={styles.statsContainer}>
                        <View
                            style={[styles.boxView, { backgroundColor: '#EEC900' }]}>
                            <Text style={styles.percentText}>{`${averagePoints}%`}</Text>
                            <SizedBox height={4} />
                            <Text style={styles.subText} numberOfLines={3}>{data?.description}</Text>
                        </View>
                        {/* {list.map((option, index) => (
                            <View
                                key={index}
                                style={[styles.boxView, { backgroundColor: option.color }]}>
                                <Text style={styles.percentText}>{option.title}</Text>
                                <SizedBox height={4} />
                                <Text style={styles.subText}>{option.subTitle}</Text>
                            </View>
                        ))} */}
                    </View>
                    <SizedBox height={'20%'} />
                    <CustomButton onPress={() => navigation.navigate('TrainingPlanScreen')}
                        buttonStyle={styles.buttonStyle}
                        textStyle={{ color: Colors.secondaryColor }}
                        title='Aufgaben ansehen'>
                    </CustomButton>
                </View>
            </View>
        </View>
    );
};

export default ViewQuizTasksScreen;
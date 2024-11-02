import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import Colors from '../../../constants/colors';
import GlobalStyles from '../../../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '../../../components/card/card';
import CustomProgressCircle from '../../../components/customProgressCircle/customProgressCircle';
import SizedBox from '../../../components/sizedbox/sizedbox';
import * as Progress from 'react-native-progress';
import { styles } from './activities.styles';

const ActivitiesScreen = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    const W = Width - (insets.left + insets.right);
    const [currentDate, setCurrentDate] = useState(moment());

    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const startOfWeek = startOfMonth.clone().startOf('week');
    const endOfWeek = endOfMonth.clone().endOf('week');

    const daysArray: any[] = [];
    let day = startOfWeek.clone();

    while (day.isSameOrBefore(endOfWeek)) {
        daysArray.push(day.clone());
        day.add(1, 'day');
    }

    const handlePreviousMonth = () => {
        setCurrentDate(currentDate.clone().subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.clone().add(1, 'month'));
    };

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handlePreviousMonth()}>
                    <Text style={styles.arrow}>◀</Text>
                </TouchableOpacity>
                <Text style={styles.monthText}>{currentDate.format('MMMM YYYY')}</Text>
                <TouchableOpacity onPress={() => handleNextMonth()}>
                    <Text style={styles.arrow}>▶</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
        return (
            <View style={styles.daysOfWeekContainer}>
                {daysOfWeek.map((day, index) => (
                    <Text key={index} style={[styles.dayOfWeekText, { width: '14.28%' }]}>{day}</Text>
                ))}
            </View>
        );
    };

    const renderDays = () => {
        return (
            <View style={styles.daysContainer}>
                {daysArray.map((day) => (
                    <View style={[styles.dayContainer, { width: '14.28%' }]}>
                        <CustomProgressCircle size={36} strokeWidth={4} />
                        <Text style={styles.dayText}>{moment(day).format('D')}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const list = [
        {
            smile: '🙂',
            title: 'Arbeit',
            desc: 'Lorem ipsum',
            value: '6/25',
            progress: 0.40,
            progressColor: '#5CAC60'
        },
        {
            smile: '😕',
            title: 'Familie',
            desc: 'Lorem ipsum',
            value: '3/25',
            progress: 0.20,
            progressColor: '#D51920'
        },
        {
            smile: '☺️',
            title: 'Sport',
            desc: 'Lorem ipsum',
            value: '6/25',
            progress: 0.80,
            progressColor: '#8433D1'
        },
        {
            smile: '🙂',
            title: 'Selbstliebe',
            desc: 'Lorem ipsum',
            value: '6/25',
            progress: 0.25,
            progressColor: '#26C9F3'
        },
    ]

    const list2 = [
        {
            title: 'Schlecht',
            backgroundColor: '#FF395D'
        },
        {
            title: 'Geht so',
            backgroundColor: '#FF9339'
        },
        {
            title: 'Normal',
            backgroundColor: '#FDC944'
        },
        {
            title: 'Gut',
            backgroundColor: '#74C69D'
        },
        {
            title: 'Super',
            backgroundColor: '#40916C'
        },
    ]

    return (
        <View style={[GlobalStyles.container, GlobalStyles.paddingHorizontal]}>
            <AppBar onBackPress={() => navigation.goBack()} title='Aktivitäten' />
            {/* Header: Month and XP */}
            <View style={styles.header}>
                <TouchableOpacity style={GlobalStyles.rowContainer}>
                    <Text style={styles.monthText}>August 2024</Text>
                    <Icon name="keyboard-arrow-down" size={22} color={Colors.black} />
                </TouchableOpacity>
                <Text style={styles.xpText}>430 XP</Text>
            </View>

            {/* Calendar */}
            <Card style={styles.card}>
                {/* {renderHeader()} */}
                {renderDaysOfWeek()}
                {renderDays()}
            </Card>

            {/* Legend */}
            <View style={GlobalStyles.rowContainer}>
                <View style={GlobalStyles.rowContainer}>
                    <View style={[styles.legendColor, { backgroundColor: '#5CAC60' }]}>
                        <Text style={styles.legendText}>Arbeit</Text>
                    </View>
                </View>
                <View style={GlobalStyles.rowContainer}>
                    <View style={[styles.legendColor, { backgroundColor: '#D51920' }]}>
                        <Text style={styles.legendText}>Familie</Text>
                    </View>
                </View>
                <View style={GlobalStyles.rowContainer}>
                    <View style={[styles.legendColor, { backgroundColor: '#8433D1' }]}>
                        <Text style={styles.legendText}>Sport</Text>
                    </View>
                </View>
                <View style={GlobalStyles.rowContainer}>
                    <View style={[styles.legendColor, { backgroundColor: '#26C9F3' }]}>
                        <Text style={styles.legendText}>Selbstliebe</Text>
                    </View>
                </View>
            </View>

            <View style={styles.titleSection}>
                <Text style={styles.title}>{'Deine Ziele'}</Text>
            </View>
            <View style={styles.levelLine} />

            <View style={{ height: 140 }}>
                <ScrollView
                    horizontal={true}>
                    {list.map((item, index) => (
                        <Card key={index} style={styles.goalCard}>
                            <View style={[GlobalStyles.rowSpaceBetween, { alignItems: 'flex-start' }]}>
                                <View style={styles.smileContainer}>
                                    <Text>{item.smile}</Text>
                                </View>
                                <Text style={styles.valueText}>{item.value}</Text>
                            </View>
                            <SizedBox height={6} />
                            <Text style={styles.goalTitle}>{item.title}</Text>
                            <Text style={styles.goalSubtitle}>{item.desc}</Text>
                            <SizedBox height={6} />
                            <Progress.Bar
                                progress={item.progress}
                                width={100}
                                color={item.progressColor}
                                borderWidth={0}
                                unfilledColor='rgba(249, 249, 249, 1)'
                            />
                        </Card>
                    ))}
                </ScrollView>
            </View>

            <View style={GlobalStyles.rowContainer}>
                {list2.map((item) => (
                    <View style={GlobalStyles.rowContainer}>
                        <View style={[styles.legendColor, { backgroundColor: item.backgroundColor }]}>
                            <Text style={styles.legendText}>{item.title}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <Text 
            onPress={() => navigation.navigate('SocialBatteryScreen')}
            style={styles.downloadText}>Herunterladen</Text>
        </View>
    );
};

export default ActivitiesScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import Colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import { Images } from '../../../constants/images';
import SizedBox from '../../../components/sizedbox/sizedbox';
import CustomButton from '../../../components/customButton/customButton';
import OutlinedButton from '../../../components/outlinedButton/outlinedButton';
import Card from '../../../components/card/card';
import Chip from '../../../components/chip/chip';
import GlobalStyles from '../../../styles/GlobalStyles';
import CustomBottomSheet from '../../../components/customBottomSheet/customBottomSheet';
import moment from 'moment';
import { styles } from './entries.styles';
import { useDiaries } from '../../../api/apis';
import Loader from '../../../components/loader/loader';
import { getMoodEmoji } from '../../../utils/enums';

const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

const EntriesScreen = ({ navigation }: any) => {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { getDiaries, loading: getDiariesLoading } = useDiaries();
    const [diariesData, setDiariesData] = useState<any>();
    const currentDate = new Date();

    const getWeekDates = (date: Date) => {
        const dayOfWeek = date.getDay();
        const startOfWeek = new Date(date);
        const endOfWeek = new Date(date);

        // Adjust to start on Monday
        startOfWeek.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const newDate = new Date(startOfWeek);
            newDate.setDate(startOfWeek.getDate() + i);
            newDate.setHours(0, 0, 0, 0);
            weekDates.push(newDate);
        }

        return weekDates;
    };

    const weekDates = getWeekDates(currentWeek);

    const handlePreviousWeek = () => {
        const previousWeek = new Date(currentWeek);
        previousWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(previousWeek);
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentWeek);
        nextWeek.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(nextWeek);
    };

    const isSelectedDate = (date: Date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    const list = [1, 2, 3, 4, 5]

    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const [currentDate1, setCurrentDate] = useState(moment());
    const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | null>(null);

    const startOfMonth = currentDate1.clone().startOf('month');
    const endOfMonth = currentDate1.clone().endOf('month');
    const startOfWeek = startOfMonth.clone().startOf('week');
    const endOfWeek = endOfMonth.clone().endOf('week');

    const daysArray: any[] = [];
    let day = startOfWeek.clone();

    const isCalendarSelectedDate = (date: Date) => {
        return date?.toDateString() === selectedCalendarDate?.toDateString();
    };

    while (day.isSameOrBefore(endOfWeek)) {
        daysArray.push(day.clone());
        day.add(1, 'day');
    }

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
                {daysArray.map((day) => {
                    const isSelected = isCalendarSelectedDate(new Date(day))
                    return (
                        <TouchableOpacity
                            onPress={() => setSelectedCalendarDate(new Date(day))}
                            activeOpacity={1}
                            style={[styles.dayContainer1, { width: '14.28%' }]}>
                            <View style={[styles.calendarDate, isSelected && styles.selectedCalendarDate]}>
                                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{moment(day).format('D')}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    };

    useEffect(() => {
        getDiariesData();
    }, [selectedDate])

    const getDiariesData = () => {
        getDiaries()
            .then(response => {
                if (response.success) {
                    setDiariesData(response.diaries);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }

    console.log(diariesData);
    

    return (
        <View style={GlobalStyles.container}>
            <Loader loading={getDiariesLoading} />
            <AppBar onBackPress={() => navigation.goBack()} title='Tagebuch' />
            {/* <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={handlePreviousWeek} style={styles.arrowButton}>
                    <Icon name="arrow-back-ios" size={20} color={Colors.black} />
                </TouchableOpacity>
                <Text style={styles.weekLabel}>Diese Woche</Text>
                <TouchableOpacity onPress={handleNextWeek} style={styles.arrowButton}>
                    <Icon name="arrow-forward-ios" size={20} color={Colors.black} />
                </TouchableOpacity>
            </View> */}
            {/* <View style={styles.weekContainer}>
                {weekDates.map((date, index) => {
                    const isSelected = isSelectedDate(date);
                    const dateToCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                    const currentDateToCompare = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

                    // Check if the date is in the past
                    const isPastDate = dateToCompare < currentDateToCompare;
                    const isCurrentDate = dateToCompare.getTime() === currentDateToCompare.getTime();

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dayContainer,
                                isSelected && styles.selectedDayContainer
                            ]}
                            onPress={() => setSelectedDate(date)}
                        >
                            <Text style={[
                                styles.dayName,
                                isSelected && styles.selectedDay
                            ]}>
                                {dayNames[date.getDay()]}
                            </Text>
                            <Text style={[
                                styles.dayDate,
                                isSelected && styles.selectedDay
                            ]}>{date.getDate()}</Text>
                            {(isPastDate && !isSelected) && <Icon name="close" size={16} color={isSelected ? Colors.white : Colors.black} />}
                            {isSelected && <Icon name="edit" size={16} color={isSelected ? Colors.white : Colors.black} />}
                        </TouchableOpacity>
                    )
                })}
            </View> */}

            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>

                <View style={styles.newEntrySection}>
                    <Text style={styles.entry}>{'Meine Einträge'}</Text>
                </View>
                <View style={styles.levelLine} />

                {diariesData?.map((data: any) => {
                    return (
                        <Card style={GlobalStyles.marginHorizontal}>
                            <View style={GlobalStyles.rowSpaceBetween}>
                                <Text style={styles.dateText}>{moment(data?.createdAt).isSame(moment(), 'day')
                                    ? 'Heute'
                                    : moment(data?.createdAt).format('DD.MM.YYYY.')}</Text>
                                <OutlinedButton
                                    icon={<FontAwesomeIcon name="pen" size={14} color={Colors.secondaryColor} />}
                                    iconStyle={styles.outlinedButtonIconStyle}
                                    buttonStyle={styles.iconButtonStyle}
                                    onPress={() => navigation.navigate('ChatScreen', { date: data?.createdAt })}
                                />
                            </View>
                            <View style={[GlobalStyles.rowContainer, styles.chipContainer]}>
                                <Text style={styles.emoji}>{getMoodEmoji(data?.mood?.[0])}</Text>
                                {data?.activity?.map((item: any) => (<Chip label={item} />))}
                            </View>
                            {data?.freeText && <Text style={styles.bodyText}>{data?.freeText}</Text>}
                            {/* <SizedBox height={10} />
                            <Text style={styles.questionText}>
                                {`Welcher Gedanken hat deine Stimmung am meisten beeinflusst?`}
                            </Text>
                            <SizedBox height={16} />
                            <Text style={styles.bodyText}>
                                {`Lorem ipsum dolor sit amet consectetur. Egestas purus faucibus leo iaculis fermentum sed lacus. Tellus imperdiet convallis eget ut purus nunc. Ac mauris rutrum ultricies ornare facilisi montes. Nunc egestas condimentum ut imperdiet nunc non nulla. Faucibus arcu justo dignissim leo lorem pellentesque et.`}
                            </Text>
                            <SizedBox height={16} />
                            <Image source={Images.image2} style={{ height: 120, width: 180 }} resizeMode='contain' /> */}
                        </Card>
                    )
                })}
            </ScrollView>
            <CustomBottomSheet isVisible={isModalVisible} onClose={hideModal}>
                <View style={styles.header}>
                    <TouchableOpacity style={GlobalStyles.rowContainer}>
                        <Text style={styles.monthText}>August 2024</Text>
                        <Icon name="keyboard-arrow-down" size={22} color={Colors.black} />
                    </TouchableOpacity>
                    <OutlinedButton
                        icon={<FontAwesomeIcon name="x" size={14} color={Colors.secondaryColor} />}
                        iconStyle={styles.outlinedButtonIconStyle}
                        buttonStyle={styles.iconButtonStyle}
                        onPress={() => { }}
                    />
                </View>
                <Card style={{ margin: 0 }}>
                    {renderDaysOfWeek()}
                    {renderDays()}
                </Card>
                <SizedBox height={20} />
                <CustomButton onPress={() => { }} title='Auswählen' />
            </CustomBottomSheet>
        </View>
    );
};

export default EntriesScreen;
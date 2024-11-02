import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, useWindowDimensions, TouchableOpacity, SafeAreaView, BackHandler } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import AppBar from '../../../components/appbar/appbar';
import Colors from '../../../constants/colors';
import Card from '../../../components/card/card';
import GlobalStyles from '../../../styles/GlobalStyles';
import SizedBox from '../../../components/sizedbox/sizedbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SocialBattery from '../../../components/socialBattery/socialBattery';
import moment from 'moment';
import CustomProgressCircle from '../../../components/customProgressCircle/customProgressCircle';
import * as Progress from 'react-native-progress';
import { Svgs } from '../../../constants/images';
import MoodSelector from '../../../components/moodSelector/moodSelector';
import { styles } from './analyse.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { useAnalyse } from '../../../api/apis';
import Loader from '../../../components/loader/loader';
import { Mood } from '../../../utils/enums';
import MonthPicker from 'react-native-month-year-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const AnalyseScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { userMe } = useSelector((state: RootState) => state.userSlice);
  const [selectedLegend, setSelectedLegend] = useState(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<Mood>({
    icon: '🙂',
    name: 'Normal',
    type: 'NORMAL',
  });

  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | null>(
    new Date(),
  );
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

  const isCalendarSelectedDate = (date: Date) => {
    return date?.toDateString() === selectedCalendarDate?.toDateString();
  };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value: boolean | ((prevState: boolean) => boolean)) => {
    setShow(value);
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: value ? 'none' : 'flex' },
    });
  }, [navigation]);

  const onValueChange = useCallback(
    (event: any, newDate: Date) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
      setCurrentDate(moment(selectedDate))
      showTabBar();
    },
    [date, showPicker, navigation],
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        showTabBar();
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  const gestureEndListener = () => {
    console.log(" Called when screen is unmounted ")
    showTabBar()
  }

  useEffect(() => {
    navigation.addListener('beforeRemove', gestureEndListener);
  }, []);

  const showTabBar = () => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
  }

  const { getAnalyse, loading: getAnalyseLoading } = useAnalyse();
  const [analyseData, setAnalyseData] = useState<any>([]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthNamesGerman = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];

  const selectedDate = date ? new Date(date) : new Date();
  const monthName = monthNames[selectedDate.getMonth()];
  const monthNameGermen = monthNamesGerman[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();

  const getData = () => {
    getAnalyse({ month: monthName, year: `${year}` })
      .then(response => {
        console.log('Fetched analyse data:', response);
        setAnalyseData(response);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }

  useEffect(() => {
    getData();
  }, [date])

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    return (
      <View style={styles.daysOfWeekContainer}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={[styles.dayOfWeekText, { width: '14.28%' }]}>
            {day}
          </Text>
        ))}
      </View>
    );
  };

  const renderDays = () => {
    return (
      <View style={styles.daysCalendarContainer}>
        {daysArray.map((day) => {
          const isSelected = isCalendarSelectedDate(new Date(day))
          const formattedDate = moment(day).format('YYYY-MM-DD');
          const dayActivities = analyseData?.CALENDAR_DATA?.[formattedDate] || [];

          return (
            <View
              // onPress={() => setSelectedCalendarDate(new Date(day))}
              // activeOpacity={1}
              style={[styles.dayCalendarContainer, { width: '14.28%' }]}>
              <CustomProgressCircle size={36} strokeWidth={4} showSelectedData={selectedLegend} dayActivities={dayActivities} />
              <View style={[styles.calendarDate, isSelected && styles.selectedCalendarDate]}>
                <Text style={[styles.dayCalendarText, isSelected && styles.selectedDayText]}>{moment(day).format('D')}</Text>
              </View>
            </View>
          )
        })}
      </View>
    );
  };

  const currentMonthDaysArray: any[] = [];

  let currentMonthDay = startOfMonth.clone();

  // Generate an array of days for the current month only
  while (currentMonthDay.isSameOrBefore(endOfMonth)) {
    currentMonthDaysArray.push(currentMonthDay.clone());
    currentMonthDay.add(1, 'day');
  }

  const emojiData = ['🤩', '☺️', '🙂', '😕', '😣'];

  const moodDataAnalyse = [
    {
      type: 'BAD',
      smile: '😣',
      title: 'Schlecht',
      value: `${analyseData?.MOOD_LINE_DATA?.BAD}/${analyseData?.DAYS_OF_MONTH}`,
      progress:
        (analyseData?.MOOD_LINE_DATA?.BAD ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#FF395D',
      backgroundColor: 'rgba(255, 57, 93, 0.25)',
    },
    {
      type: 'OK',
      smile: '😕',
      title: 'Geht so',
      value: `${analyseData?.MOOD_LINE_DATA?.OK}/${analyseData?.DAYS_OF_MONTH}`,
      progress:
        (analyseData?.MOOD_LINE_DATA?.OK ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#FF9339',
      backgroundColor: 'rgba(255, 140, 57, 0.25)',
    },
    {
      type: 'NORMAL',
      smile: '🙂',
      title: 'Normal',
      value: `${analyseData?.MOOD_LINE_DATA?.NORMAL}/${analyseData?.DAYS_OF_MONTH}`,
      progress:
        (analyseData?.MOOD_LINE_DATA?.NORMAL ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#FDC944',
      backgroundColor: 'rgba(253, 201, 68, 0.25)',
    },
    {
      type: 'GOOD',
      smile: '🤩',
      title: 'Gut',
      value: `${analyseData?.MOOD_LINE_DATA?.GOOD}/${analyseData?.DAYS_OF_MONTH}`,
      progress:
        (analyseData?.MOOD_LINE_DATA?.GOOD ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#74C69D',
      backgroundColor: 'rgba(116, 198, 157, 0.25)',
    },
    {
      type: 'SUPER',
      smile: '🙂',
      title: 'Super',
      value: `${analyseData?.MOOD_LINE_DATA?.SUPER}/${analyseData?.DAYS_OF_MONTH}`,
      progress:
        (analyseData?.MOOD_LINE_DATA?.SUPER ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#40916C',
      backgroundColor: 'rgba(64, 145, 108, 0.25)',
    },
  ];

  const getMoodData = (type: string) => {
    return moodDataAnalyse.find(mood => mood.type === type);
  };

  const moodDataAnalyseMood = {
    smile: getMoodData(analyseData?.MOOD_LINE_DATA?.MAIN)?.smile,
    title: getMoodData(analyseData?.MOOD_LINE_DATA?.MAIN)?.title,
    value: 'ø August',
    progress: getMoodData(analyseData?.MOOD_LINE_DATA?.MAIN)?.progress,
    progressColor: getMoodData(analyseData?.MOOD_LINE_DATA?.MAIN)
      ?.progressColor,
    backgroundColor: getMoodData(analyseData?.MOOD_LINE_DATA?.MAIN)
      ?.backgroundColor,
  };

  const trends = [
    {
      smile: selectedMood?.icon,
      title: 'Arbeit',
      desc: 'Lorem ipsum',
      value: `${analyseData?.TRENDS?.Work?.[`${selectedMood.type}`]}/${analyseData?.DAYS_OF_MONTH
        }`,
      progress:
        (analyseData?.TRENDS?.Work?.[`${selectedMood.type}`] ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#5CAC60',
    },
    {
      smile: selectedMood?.icon,
      title: 'Familie',
      desc: 'Lorem ipsum',
      value: `${analyseData?.TRENDS?.Family?.[`${selectedMood.type}`]}/${analyseData?.DAYS_OF_MONTH
        }`,
      progress:
        (analyseData?.TRENDS?.Family?.[`${selectedMood.type}`] ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#D51920',
    },
    {
      smile: selectedMood?.icon,
      title: 'Sport',
      desc: 'Lorem ipsum',
      value: `${analyseData?.TRENDS?.Sport?.[`${selectedMood.type}`]}/${analyseData?.DAYS_OF_MONTH
        }`,
      progress:
        (analyseData?.TRENDS?.Sport?.[`${selectedMood.type}`] ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#8433D1',
    },
    {
      smile: selectedMood?.icon,
      title: 'Gamble',
      desc: 'Lorem ipsum',
      value: `${analyseData?.TRENDS?.Gamble?.[`${selectedMood.type}`]}/${analyseData?.DAYS_OF_MONTH
        }`,
      progress:
        (analyseData?.TRENDS?.Gamble?.[`${selectedMood.type}`] ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#5CAC60',
    },
    {
      smile: selectedMood?.icon,
      title: 'Date',
      desc: 'Lorem ipsum',
      value: `${analyseData?.TRENDS?.Date?.[`${selectedMood.type}`]}/${analyseData?.DAYS_OF_MONTH
        }`,
      progress:
        (analyseData?.TRENDS?.Date?.[`${selectedMood.type}`] ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#D51920',
    },
    {
      smile: selectedMood?.icon,
      title: 'See friends',
      desc: 'Lorem ipsum',
      value: `${analyseData?.TRENDS?.['See friends']?.[`${selectedMood.type}`]
        }/${analyseData?.DAYS_OF_MONTH}`,
      progress:
        (analyseData?.TRENDS?.['See friends']?.[`${selectedMood.type}`] ?? 0) /
        (analyseData?.DAYS_OF_MONTH ?? 1),
      progressColor: '#8433D1',
    },
  ];

  // Function to handle smile selection
  const handleSmileChange = () => {
    setModalVisible(true); // Open the modal
  };

  return (
    <View style={GlobalStyles.container}>
      <Loader loading={getAnalyseLoading} />

      <AppBar onBackPress={() => { showTabBar(), navigation.goBack() }} title={'Analyse'} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header: Month and XP */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => showPicker(true)} style={GlobalStyles.rowContainer}>
            <Text style={styles.monthText}>{`${monthNameGermen} ${year}`}</Text>
            <Icon name="keyboard-arrow-down" size={22} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.xpText}>{analyseData?.USER_XP} XP</Text>
        </View>

        {/* Calendar */}
        <Card style={styles.calendarCard}>
          {renderDaysOfWeek()}
          {renderDays()}
        </Card>

        {/* Legend */}
        <ScrollView
          horizontal
          style={{ height: 30 }}
          showsHorizontalScrollIndicator={false}>
          <View style={[GlobalStyles.rowContainer, GlobalStyles.paddingHorizontal]}>
            <TouchableOpacity
              onPress={() => setSelectedLegend(1)}
              activeOpacity={0.7}
              style={GlobalStyles.rowContainer}>
              <View style={[styles.legendColor, { backgroundColor: '#5CAC60' }]}>
                <Text style={styles.legendText}>Arbeit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedLegend(2)}
              activeOpacity={0.7}
              style={GlobalStyles.rowContainer}>
              <View style={[styles.legendColor, { backgroundColor: '#D51920' }]}>
                <Text style={styles.legendText}>Familie</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedLegend(3)}
              activeOpacity={0.7}
              style={GlobalStyles.rowContainer}>
              <View style={[styles.legendColor, { backgroundColor: '#8433D1' }]}>
                <Text style={styles.legendText}>Sport</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedLegend(4)}
              activeOpacity={0.7}
              style={GlobalStyles.rowContainer}>
              <View style={[styles.legendColor, { backgroundColor: '#26C9F3' }]}>
                <Text style={styles.legendText}>Gamble</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedLegend(5)}
              activeOpacity={0.7}
              style={GlobalStyles.rowContainer}>
              <View style={[styles.legendColor, { backgroundColor: '#FFA500' }]}>
                <Text style={styles.legendText}>Date</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedLegend(6)}
              activeOpacity={0.7}
              style={GlobalStyles.rowContainer}>
              <View style={[styles.legendColor, { backgroundColor: '#FFD700' }]}>
                <Text style={styles.legendText}>See friends</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* <SocialBattery style={styles.cardStyle} /> */}
        <Card style={[styles.cardStyle, GlobalStyles.marginVertical]}>
          <Text style={styles.title}>Mood Map</Text>
          <SizedBox height={12} />
          <View style={GlobalStyles.rowContainer}>
            <View style={styles.emojiContainer}>
              {emojiData.map((emoji, index) => (
                <Text key={index} style={{ fontSize: 28, marginBottom: 6 }}>
                  {emoji}
                </Text>
              ))}
            </View>
            <BarChart
              data={analyseData?.MOOD_MAP_DATA}
              width={width * 0.7}
              barWidth={18}
              spacing={20}
              noOfSections={5}
              frontColor={Colors.primaryColor}
              yAxisLabelTexts={['0', '20', '40', '60', '80', '100']}
              xAxisLabelTextStyle={{
                color: Colors.textColor,
                fontSize: 12,
              }}
              dashWidth={5}
              hideYAxisText
              isAnimated
            />
          </View>
        </Card>

        <View style={styles.moodMapSection}>
          <Text style={styles.moodMapText}>{'Mood-Map Analyse'}</Text>
        </View>
        <View style={styles.levelLine} />

        <View style={styles.moodMapAnalyseContainer}>
          {[...moodDataAnalyse, moodDataAnalyseMood].map((item, index) => (
            <Card
              key={index}
              style={[
                styles.moodMapAnalyseCard,
                GlobalStyles.noShadow,
                { backgroundColor: item.backgroundColor },
              ]}>
              <View
                style={[
                  GlobalStyles.rowSpaceBetween,
                  { alignItems: 'flex-start' },
                ]}>
                <Text>{item.smile}</Text>
                <Text style={styles.valueText}>{item.value}</Text>
              </View>
              <SizedBox height={6} />
              <Text style={styles.moodMapAnalyseTitle}>{item.title}</Text>
              <SizedBox height={6} />
              <Progress.Bar
                progress={item.progress}
                width={90}
                color={item.progressColor}
                borderWidth={0}
                unfilledColor="rgba(249, 249, 249, 1)"
              />
            </Card>
          ))}
        </View>

        <Card style={styles.entriesCardStyle}>
          <Text style={styles.entriesText}>
            🔥{analyseData?.STREAK} Einträge in Folge
          </Text>
        </Card>

        <SocialBattery
          style={styles.socialBattery}
          socialBattery={analyseData?.SOCIAL_BATTERY}
        />

        <View style={styles.titleSection}>
          <Text style={styles.title}>{'Trends'}</Text>
          <Text onPress={() => handleSmileChange()} style={styles.filterText}>
            {'Filter'}
          </Text>
        </View>
        <View style={styles.levelLine} />

        <View style={{ height: 140 }}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ paddingHorizontal: 8 }}>
            {trends.map((item, index) => (
              <Card key={index} style={styles.trendsCard}>
                <View
                  style={[
                    GlobalStyles.rowSpaceBetween,
                    { alignItems: 'flex-start' },
                  ]}>
                  <View style={styles.smileContainer}>
                    <Text>{item.smile}</Text>
                  </View>
                  <Text style={styles.valueText}>{item.value}</Text>
                </View>
                <SizedBox height={6} />
                <Text style={styles.trendsTitle}>{item.title}</Text>
                {/* <Text style={styles.trendsSubtitle}>{item.desc}</Text> */}
                <SizedBox height={6} />
                <Progress.Bar
                  progress={item.progress}
                  width={100}
                  color={item.progressColor}
                  borderWidth={0}
                  unfilledColor="rgba(249, 249, 249, 1)"
                />
              </Card>
            ))}
          </ScrollView>
        </View>
        <MoodSelector
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedMood={selectedMood}
          setSelectedMood={(mood) => setSelectedMood(mood)}
        />
      </ScrollView>
      <SafeAreaView>
        {show && (
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={new Date(2000, 1)}
            maximumDate={new Date()}
            locale="de"
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default AnalyseScreen;

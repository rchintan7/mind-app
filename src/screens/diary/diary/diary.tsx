import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import Colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Images, Svgs } from '../../../constants/images';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import SizedBox from '../../../components/sizedbox/sizedbox';
import CustomButton from '../../../components/customButton/customButton';
import OutlinedButton from '../../../components/outlinedButton/outlinedButton';
import Card from '../../../components/card/card';
import Chip from '../../../components/chip/chip';
import GlobalStyles from '../../../styles/GlobalStyles';
import * as Progress from 'react-native-progress';
import CustomBottomSheet from '../../../components/customBottomSheet/customBottomSheet';
import moment from 'moment';
import { styles } from './diary.styles';
import {
  useAddGoals,
  useDeleteGoals,
  useDiaries,
  useGoals,
  useUpdateGoals,
} from '../../../api/apis';
import Loader from '../../../components/loader/loader';
import { getMoodEmoji } from '../../../utils/enums';
import AddDestinationModal from './layoutComponents/addDestinationModal/AddDestinationModal';
import { useFocusEffect } from '@react-navigation/native';
import DeleteConfirmationModal from './layoutComponents/deleteConfirmationModal/deleteConfirmationModal';
import { showToast } from '../../../config/utils';

const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

const DiaryScreen = ({ navigation }: any) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { getDiaries, loading: getDiariesLoading } = useDiaries();
  const { getGoals, loading: getGoalsLoading } = useGoals();
  const { addGoals, loading: addGoalsLoading } = useAddGoals();
  const { updateGoals, loading: updateGoalsLoading } = useUpdateGoals();
  const { deleteGoals, loading: deleteGoalsLoading } = useDeleteGoals();
  const [diariesData, setDiariesData] = useState<any>();
  const [goalsList, setGoalsList] = useState<any>([]);
  const [isEditGoals, setIsEditGoals] = useState<any>(false);
  const [diaryCount, setDiaryCount] = useState(0);
  const [isAddDestinationVisible, setIsAddDestinationVisible] = useState(false);
  const [editGoalsData, setEditGoalsData] = useState<any>();
  const [diaryStatusWeekly, setDiaryStatusWeekly] = useState<any[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemId, setItemId] = useState<any>();
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

  const list2 = [
    {
      id: 1,
      title: 'Stimmung',
      data: [{ id: 1, value: '😕', createdAt: '13.08.2024.' }],
      screen: 'MoodScreen',
    },
    // {
    //     id: 2,
    //     title: 'Social Battery',
    //     data: [],
    //     screen: 'SocialBatteryScreen'
    // },
  ];

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [currentDate1, setCurrentDate] = useState(moment());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | null>(
    null,
  );

  const startOfMonth = currentDate1.clone().startOf('month');
  const endOfMonth = currentDate1.clone().endOf('month');
  const startOfWeek = startOfMonth.clone().startOf('week');
  const endOfWeek = endOfMonth.clone().endOf('week');

  const daysArray: any[] = [];
  let day = startOfWeek.clone();

  function handleOnDelete() {
    setIsAddDestinationVisible(false);
    setTimeout(() => {
      setIsDeleteModalVisible(true);
    }, 400);
  }

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
          <Text key={index} style={[styles.dayOfWeekText, { width: '14.28%' }]}>
            {day}
          </Text>
        ))}
      </View>
    );
  };

  const renderDays = () => {
    return (
      <View style={styles.daysContainer}>
        {daysArray.map((day, index) => {
          const isSelected = isCalendarSelectedDate(new Date(day));
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCalendarDate(new Date(day))}
              activeOpacity={1}
              style={[styles.dayContainer1, { width: '14.28%' }]}>
              <View
                style={[
                  styles.calendarDate,
                  isSelected && styles.selectedCalendarDate,
                ]}>
                <Text
                  style={[
                    styles.dayText,
                    isSelected && styles.selectedDayText,
                  ]}>
                  {moment(day).format('D')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      getDiariesData();
    }, [selectedDate])
  );

  const getDiariesData = () => {
    const day = moment(selectedDate).format('YYYY-MM-DD');
    getDiaries(day)
      .then(response => {
        if (response.success) {
          const filteredData = response.diaries.filter((item: any) => {
            return moment(item.createdAt).isSame(selectedDate, 'day');
          });
          if (filteredData?.length > 0) {
            setDiariesData(filteredData[0]);
          } else {
            setDiariesData(undefined);
          }
          setDiaryCount(response?.diaryCountWeekly ?? 0)
          setDiaryStatusWeekly(response?.diaryStatusWeekly ?? [])
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }

  function handleEditGoals(data: any) {
    setIsAddDestinationVisible(true);
    setIsEditGoals(true);
    setEditGoalsData(data);
    setItemId(data.id);
  }

  const getGoalsList = () => {
    getGoals()
      .then(response => {
        if (response) {
          if (response) {
            setGoalsList(response);
          } else {
            setGoalsList([]);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  const addNewGoal = (data: any) => {
    addGoals(data)
      .then(response => {
        if (response) {
          setIsAddDestinationVisible(false);
          getGoalsList();
        } else {
          console.log('Response not found');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  const updateGoal = (item: any) => {
    let data: any = {
      completedCount: item.completedCount + 1,
    }

    if (!item.disabled) {
      updateGoals(data, item.id)
        .then(response => {
          if (response) {
            setIsAddDestinationVisible(false);
            setGoalsList(response);
          } else {
            console.log('Response not found');
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  };

  const deleteGoal = () => {
    deleteGoals(itemId)
      .then(response => {
        if (response) {
          setIsDeleteModalVisible(false);
          getGoalsList();
        } else {
          console.log('Response not found');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    getGoalsList();
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <Loader loading={getDiariesLoading || getGoalsLoading || deleteGoalsLoading || updateGoalsLoading} />
      <AppBar title="Tagebuch" />
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={handlePreviousWeek}
          style={styles.arrowButton}>
          <Icon name="arrow-back-ios" size={20} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.weekLabel}>Diese Woche</Text>
        <TouchableOpacity onPress={handleNextWeek} style={styles.arrowButton}>
          <Icon name="arrow-forward-ios" size={20} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.weekContainer}>
        {weekDates.map((date, index) => {
          const isSelected = isSelectedDate(date);
          const dateToCompare = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          );
          const currentDateToCompare = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
          );

          // Check if the date is in the past
          const isPastDate = dateToCompare < currentDateToCompare;
          const isCurrentDate =
            dateToCompare.getTime() === currentDateToCompare.getTime();

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayContainer,
                isSelected && styles.selectedDayContainer,
              ]}
              onPress={() => setSelectedDate(date)}>
              <Text
                style={[styles.dayName, isSelected && styles.selectedDayName]}>
                {dayNames[date.getDay()]}
              </Text>
              <Text style={[styles.dayDate, isSelected && styles.selectedDate]}>
                {date.getDate()}
              </Text>
              {isPastDate && !isSelected && (
                <Icon
                  name="close"
                  size={16}
                  color={isSelected ? Colors.white : Colors.black}
                />
              )}
              {isSelected && (
                <Icon
                  name="edit"
                  size={16}
                  color={isSelected ? Colors.white : Colors.black}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.greenBackgroundWrapper}>
          <Image
            source={Images.greenBackground}
            style={styles.greenBackground}
          />
          <View style={styles.greenBackgroundContent}>
            <View style={styles.greenBackgroundTextContainer}>
              <SizedBox height={8} />
              <Text style={styles.challengeText}>Challenge XY</Text>
              <SizedBox height={16} />
              <Text style={styles.challengeDescription}>
                Mach weiter so, du hast bereits 2 Tage diese Woche geschafft.
              </Text>
            </View>
            <SizedBox height={10} />
            <AnimatedCircularProgress
              size={100}
              width={20}
              fill={(diaryCount * 100) / 7}
              rotation={260}
              tintColor={Colors.white}
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor={'rgba(255, 255, 255, 0.28)'}
              arcSweepAngle={200}>
              {fill => (
                <Text style={styles.circularProgressText}>
                  {diaryCount}/7
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {diariesData ? (
            <OutlinedButton
              onPress={() => navigation.navigate('AnalyseScreen')}
              icon={
                <FontAwesomeIcon
                  name="chart-line"
                  size={16}
                  color={Colors.secondaryColor}
                />
              }
              title="Analyse"
              buttonStyle={[
                styles.customButtonStyle,
                { flex: 0, paddingHorizontal: 16 },
              ]}
            />
          ) : (
            <CustomButton
              onPress={() =>
                navigation.navigate('ChatScreen', { date: selectedDate })
              }
              icon={
                <FontAwesomeIcon name="pen" size={16} color={Colors.white} />
              }
              title="Neuer Eintrag"
              buttonStyle={[
                styles.customButtonStyle,
                { flex: 0, paddingHorizontal: 10 },
              ]}
            />
          )}
          <SizedBox width={12} />
          <OutlinedButton
            onPress={() => navigation.navigate('ArchiveScreen', { diaryId: diariesData?.id })}
            icon={
              <MaterialCommunityIcons
                name="arrow-u-up-right-bold"
                size={20}
                color={Colors.secondaryColor}
              />
            }
            iconStyle={{ marginRight: 4 }}
            title="Persönliche Themen"
            buttonStyle={styles.customButtonStyle}
            textStyle={{ fontWeight: '700' }}
          />
        </View>

        {
          !diariesData && (
            <View
              style={[GlobalStyles.marginHorizontal, GlobalStyles.marginBottom]}>
              <OutlinedButton
                onPress={() => navigation.navigate('AnalyseScreen')}
                icon={
                  <FontAwesomeIcon
                    name="chart-line"
                    size={16}
                    color={Colors.secondaryColor}
                  />
                }
                title="Analyse"
                buttonStyle={styles.customButtonStyle}
              />
            </View>
          )
        }

        {
          diariesData && (
            <>
              <View style={styles.newEntrySection}>
                <Text style={styles.entry}>{'Meine Einträge'}</Text>
                <Text
                  onPress={() => navigation.navigate('EntriesScreen')}
                  style={styles.showMore}>
                  Alle anzeigen
                </Text>
              </View>
              <View style={styles.levelLine} />
            </>
          )
        }

        {
          diariesData && (
            <Card style={GlobalStyles.marginHorizontal}>
              <View style={GlobalStyles.rowSpaceBetween}>
                <Text style={styles.dateText}>
                  {moment(selectedDate).isSame(moment(), 'day')
                    ? 'Heute'
                    : moment(selectedDate).format('DD.MM.YYYY.')}
                </Text>
                <OutlinedButton
                  icon={
                    <FontAwesomeIcon
                      name="pen"
                      size={14}
                      color={Colors.secondaryColor}
                    />
                  }
                  iconStyle={styles.outlinedButtonIconStyle}
                  buttonStyle={styles.iconButtonStyle}
                  onPress={() =>
                    navigation.navigate('ChatScreen', { date: selectedDate })
                  }
                />
              </View>
              <View style={[GlobalStyles.rowContainer, styles.chipContainer]}>
                <Text style={styles.emoji}>
                  {getMoodEmoji(diariesData?.mood?.[0])}
                </Text>
                {diariesData?.activity?.map((item: any) => (
                  <Chip label={item} />
                ))}
              </View>
              {diariesData?.freeText && (
                <Text style={styles.bodyText}>{diariesData?.freeText}</Text>
              )}
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
        }

        <View style={styles.newEntrySection}>
          <Text style={styles.entry}>{'Deine Ziele'}</Text>
          <Text style={styles.showMore} onPress={() => navigation.navigate('Goals')}>Mehr anzeigen</Text>
          {/* <TouchableOpacity
            onPress={() => {
              setIsAddDestinationVisible(true);
              setIsEditGoals(false);
            }}>
            <Text style={styles.entry}>{'Ziel hinzufügen'}</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.levelLine} />
        {/* <Card style={styles.startGoal}>
          <TouchableOpacity onPress={() => {}} style={styles.playIcon}>
            <FontAwesomeIcon name={'play'} size={18} color={Colors.grey} />
          </TouchableOpacity>
          <Text style={styles.startGoalText}>
            {
              'Lerne, was Ziele sind und wie wir diese gemeinsam auf dich anpassen'
            }
          </Text>
        </Card> */}

        <View style={styles.goalContainer}>
          {goalsList.length > 0 ? (
            goalsList?.slice(0, 4).map((item: any, index: any) => (
              <Card
                // disabled={item.disabled}
                key={index}
                style={[styles.goalCard, item.disabled && { backgroundColor: 'rgba(37, 213, 164, 0.25)' }]}
                onPress={() => {
                  updateGoal(item)
                }}
                onLongPress={() => handleEditGoals(item)}
              >
                <Svgs.goal />
                <SizedBox height={6} />
                <Text style={styles.goalTitle} numberOfLines={1}>
                  {item.goal}
                </Text>
                <Text style={styles.goalSubtitle}>
                  {item.completedCount}/{item.goalCount}
                </Text>
                <SizedBox height={6} />
                <Progress.Bar
                  progress={item.progress}
                  width={100}
                  color={Colors.primaryColor}
                  borderWidth={0}
                  unfilledColor="rgba(249, 249, 249, 1)"
                />
              </Card>
            ))
          ) : (
            !getGoalsLoading && <View style={GlobalStyles.centeredContainer}>
              <Text style={{ color: '#7e7e7e', fontSize: 12 }}>No Goals</Text>
            </View>
          )}
        </View>

        {
          diariesData?.moodWeek && (
            <View
              style={[
                styles.goalContainer,
                { marginHorizontal: 16, flexDirection: 'column' },
              ]}>
              {list2.map((item, index) => (
                <Card key={index} style={[styles.goalCard, { width: '100%' }]}>
                  <View style={GlobalStyles.rowSpaceBetween}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: Colors.textColor,
                      }}>
                      {item.title}
                    </Text>
                    {/* <OutlinedButton
                                    icon={<FontAwesomeIcon name="chart-line" size={14} color={Colors.secondaryColor} />}
                                    iconStyle={styles.outlinedButtonIconStyle}
                                    buttonStyle={styles.iconButtonStyle}
                                    onPress={() => navigation.navigate('AnalyseScreen')}
                                /> */}
                  </View>
                  <View style={GlobalStyles.rowContainer}>
                    {diariesData?.moodWeek.map((element: any) => {
                      const [date, mood] = Object.entries(element)[0];
                      return (
                        <View>
                          <Card style={styles.cardStyle}>
                            <Text>{getMoodEmoji(mood?.toString() || '')}</Text>
                          </Card>
                          <Text
                            style={{
                              fontSize: 8,
                              textAlign: 'center',
                              color: Colors.grey,
                              marginRight: 12,
                            }}>
                            {date}
                          </Text>
                        </View>
                      );
                    })}
                    {/* <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
                                    <Card style={styles.noShadowCardStyle}>
                                        <FontAwesomeIcon name="plus" size={18} color={Colors.grey} />
                                    </Card>
                                </TouchableOpacity> */}
                  </View>
                </Card>
              ))}
            </View>
          )
        }
      </ScrollView >
      <CustomBottomSheet isVisible={isModalVisible} onClose={hideModal}>
        <View style={styles.header}>
          <TouchableOpacity style={GlobalStyles.rowContainer}>
            <Text style={styles.monthText}>August 2024</Text>
            <Icon name="keyboard-arrow-down" size={22} color={Colors.black} />
          </TouchableOpacity>
          <OutlinedButton
            icon={
              <FontAwesomeIcon
                name="x"
                size={14}
                color={Colors.secondaryColor}
              />
            }
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
        <CustomButton onPress={() => { }} title="Auswählen" />
      </CustomBottomSheet>

      <AddDestinationModal
        isVisible={isAddDestinationVisible}
        onClose={() => setIsAddDestinationVisible(false)}
        onSubmit={(data: any) => addNewGoal(data)}
        onDelete={(data: any) => handleOnDelete()}
        isEdit={isEditGoals}
        data={isEditGoals ? editGoalsData : []}
        loading={addGoalsLoading}
      />

      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirmDelete={deleteGoal}
        title='Ziel'
      />
    </View >
  );
};

export default DiaryScreen;

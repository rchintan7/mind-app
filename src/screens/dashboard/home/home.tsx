import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, useWindowDimensions } from 'react-native';
import Colors from '../../../constants/colors';
import { Images, Svgs } from '../../../constants/images';
import Icon from 'react-native-vector-icons/FontAwesome6';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-gifted-charts';
import MessageModal from '../../../components/messageModal/messageModal';
import CustomButton from '../../../components/customButton/customButton';
import SizedBox from '../../../components/sizedbox/sizedbox';
import OutlinedButton from '../../../components/outlinedButton/outlinedButton';
import Card from '../../../components/card/card';
import SocialBattery from '../../../components/socialBattery/socialBattery';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from './home.styles';
import { useAddMood, useAffirmations, useAffirmationsDelete, useAffirmationsStatus, useCategoryAnalysis, useChangeMood, useFetchUserMe, useGetMood, useSocialBattery } from '../../../api/apis';
import GlobalStyles from '../../../styles/GlobalStyles';
import Loader from '../../../components/loader/loader';
import { actionSetUserMe } from '../../../state/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import quizData from '../../../assets/quiz.json';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }: any) {
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { userMe } = useSelector((state: RootState) => state.userSlice);
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [moodData, setMoodData] = useState<any>();
    const [categoryAnalysisData, setCategoryAnalysisData] = useState<any>();
    const [affirmation, setAffirmation] = useState<any>([]);
    const { fetchUserMe, loading: fetchUserMeLoading } = useFetchUserMe();
    const { changeMood, loading: changeMoodLoading } = useChangeMood();
    const { addMood, loading: addMoodLoading } = useAddMood();
    const { getMood, loading: getMoodLoading } = useGetMood();
    const { updateSocialBattery, loading: updateSocialBatteryLoading } = useSocialBattery();
    const { categoryAnalysis, loading: categoryAnalysisLoading } = useCategoryAnalysis();
    const { getAffirmations, loading: affirmationLoading } = useAffirmations();
    const { updateAffirmations, loading: isChangeAffirmationLoading } = useAffirmationsStatus();
    const { deleteAffirmations, loading: deleteAffirmationLoading } = useAffirmationsDelete();

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);


    // toggle Affirmation status
    const toggleCheckbox = (index: number, id: string) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(item => item !== index));
            updateAffirmationStatus(id);
        } else {
            setCheckedItems([...checkedItems, index]);
            updateAffirmationStatus(id);
        }
    };


    // Get Affirmation Data
    const getAffirmationData = () => {
        affirmationLoading
        getAffirmations()
            .then(response => {
                setAffirmation(response);
                console.log(response, 'get');
            }).catch(error => {
                console.error('Error fetching affirmation data:', error);
            })
    }

    // Update Affirmation status
    const updateAffirmationStatus = (id: any) => {
        updateAffirmations(id)
            .then(response => {
                if (response) {
                    getAffirmationData();
                } else {
                    console.log('Response not found');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    // Delete Affirmation
    const deleteAffirmationStatus = (id: any) => {
        deleteAffirmations(id)
            .then(response => {
                if (response) {
                    getAffirmationData();
                } else {
                    console.log('Response not found');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    useFocusEffect(
        useCallback(() => {
            getAffirmationData();
            getCategoryAnalysis();
        }, [])
    );

    const getCategoryAnalysis = () => {
        categoryAnalysis()
            .then((response) => {
                setCategoryAnalysisData(response)
            }).catch(error => {
                console.error('Error fetching category analysis data:', error);
            })
    }

    useEffect(() => {
        fetchUserMe()
            .then(response => {
                setSelectedMood(response?.currentMood);
                dispatch(actionSetUserMe(response));

                getMood({ type: 'weekly', userId: response?.id })
                    .then((moodData) => {
                        setMoodData(moodData)
                    })
                    .catch(error => {
                        console.error('Error fetching mood data:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const emojiData = [
        { icon: '😣', title: 'Schlecht', type: 'BAD' },
        { icon: '😕', title: 'Geht so', type: 'OK' },
        { icon: '🙂', title: 'Normal', type: 'NORMAL' },
        { icon: '☺️', title: 'Gut', type: 'GOOD' },
        { icon: '🤩', title: 'Super', type: 'SUPER' },
    ];

    const personalGrowth = [
        { icon: Images.bookGreen, backgroundColor: 'rgba(37, 213, 164, 0.25)', title: 'Tagebuch', subTitle: 'Reflektiere deine Gedanken', screen: 'Tagebuch' },
        { icon: Images.taskOrange, backgroundColor: 'rgba(252, 128, 74, 0.25)', title: 'Trainingsplan', subTitle: 'Erreiche deine Ziele', screen: 'Aufgaben' },
        { icon: Images.assessments, backgroundColor: 'rgba(145, 98, 73, 0.25)', title: 'Vision Board', subTitle: 'Visualisiere deine Zukunft', screen: 'VisionBoard' },
        { icon: Images.heartPurple, backgroundColor: 'rgba(184, 25, 255, 0.25)', title: 'Feelgood Feed', subTitle: 'Lass dich täglich inspirieren', screen: 'Feed' },
    ]

    const handleChangeMood = async (mood: string) => {
        setSelectedMood(mood)
        await changeMood({ mood: mood });
        await addMood({ mood: mood, userId: userMe?.id });
    }

    const renderMood = (emoji: { icon: string; title: string; type: string; }) => {
        const isSelected = selectedMood === emoji.type;

        return (
            <TouchableOpacity
                key={emoji.type}
                style={[styles.moodCard, isSelected ? styles.selectedMoodCard : null]}
                onPress={() => handleChangeMood(emoji.type)}
                activeOpacity={0.7}
            >
                <Text style={styles.moodEmoji}>{emoji.icon}</Text>
                <Text style={[styles.moodText, isSelected ? styles.selectedMoodText : null]}>
                    {emoji.title}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderTask = (iconName: string, category: any, navigation: any) => (
        <Card
            onPress={() => { navigation.navigate('ViewTasksScreen', { screen: 'All' }); }}
            style={styles.card}>
            <View style={styles.cardIconContainer}>
                <Icon name={iconName} size={20} color={Colors.white} solid />
            </View>
            <View style={styles.cardLine} />
            <Text style={styles.cardText}>{category}</Text>
            <View style={styles.cardStatusIcon}>
                <Icon name={"check"} size={12} color={Colors.white} />
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Loader loading={fetchUserMeLoading || changeMoodLoading || categoryAnalysisLoading} />
            {/* Profile Greeting Section */}
            <View style={[styles.profileSection, { marginTop: insets.top }]}>
                <View>
                    <Text style={styles.greetingText}>Hi, {userMe?.firstname} {userMe?.lastname} 👋</Text>
                    {/* <Text style={styles.subText}>Lorem ipsum dolor sit amet consectetur.</Text> */}
                </View>
                <View style={styles.avatarContainer}>
                    <Image source={Images.avatar} style={styles.avatar} />
                    <View style={styles.progressBarContainer}>
                        {/* Custom Circular Progress Bar */}
                        <TouchableOpacity
                            style={styles.circularProgressBar}
                            onPress={() => navigation.navigate('ProfileScreen')}
                        >
                            <View style={[styles.progressCircle, { transform: [{ rotate: '-90deg' }] }]}>
                                <Animated.View
                                    style={[
                                        styles.progressIndicator,
                                        {
                                            transform: [{ rotate: `${0.875 * 360}deg` }],
                                        },
                                    ]}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Mood Selector Section */}
                <View style={styles.moodSelector}>
                    <Text style={styles.moodTitle}>Wie fühlst du dich gerade?</Text>
                    <View style={styles.moodIcons}>
                        {emojiData.map((emoji) => renderMood(emoji))}
                    </View>
                </View>

                <SocialBattery style={styles.socialBatteryCard} socialBattery={userMe?.socialBattery} />

                {/* Journal Button */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Tagebuch')}
                    style={styles.journalButton}>
                    <Svgs.book height={20} width={20} />
                    <Text style={styles.journalText}>Tagebuch</Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={() => navigation.navigate('ChatScreen')}
                        icon={<Icon name="pen" size={16} color={Colors.white} />}
                        title='Neuer Eintrag'
                        buttonStyle={styles.customButtonStyle} />
                    <SizedBox width={16} />
                    <OutlinedButton
                        onPress={() => navigation.navigate('AnalyseScreen')}
                        icon={<Icon name="chart-line" size={16} color={Colors.secondaryColor} />}
                        title='Analyse'
                        buttonStyle={styles.outlinedButtonStyle} />
                </View>

                {/* Stufe Section */}
                <View style={styles.levelSection}>
                    <View>
                        <Text style={styles.levelText}>Stufe {categoryAnalysisData?.currentLevel ?? 0}</Text>
                        <View style={styles.levelLine} />
                        <Text style={styles.xpText}>{categoryAnalysisData?.currentXP ?? 0} XP / {categoryAnalysisData?.nextLevelXP ?? 0} XP</Text>
                    </View>
                    <AnimatedCircularProgress
                        size={40}
                        width={5}
                        fill={categoryAnalysisData?.totalPercentage ?? 0}
                        rotation={0}
                        tintColor={Colors.primaryColor}
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor={'#25D5A41A'}
                    >
                        {(fill) => (
                            <Text style={styles.circularProgressText}>{categoryAnalysisData?.totalPercentage ?? 0}%</Text>
                        )}
                    </AnimatedCircularProgress>
                </View>

                {/* Cards Section */}
                {/* <View style={styles.cardsSection}>
                    {dashboardData?.categories?.map((category: any) => {
                        return renderTask('heart', category, navigation);
                    })}
                    {renderTask('sun', 'Lebensfreude', navigation)}
                    {renderTask('mountain', 'Persönliches Wachstum', navigation)}
                    {renderTask('heart', 'Emotionale Stärke', navigation)}
                    {renderTask('hand-holding-heart', 'Beziehungen', navigation)}
                </View> */}

                <CustomButton
                    onPress={() => { navigation.navigate('ViewTasksScreen', { screen: 'All' }) }}
                    title={'Aufgaben ansehen'}
                    buttonStyle={styles.viewTaskButton} />

                {/* Start Training Section */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('QuizSelectionScreen', { data: quizData, screen: 'home' })}
                    style={styles.trainingSection}>
                    <Text style={styles.trainingText}>Starte jetzt</Text>
                    <Text style={styles.trainingSubText}>deinen Entwicklungsweg mit unserem maßgeschneiderten Fragebogen. </Text>
                    <View style={styles.trainingButtonContainer}>
                        <Text style={styles.trainingButtonText}>Trainingsplan starten</Text>
                        <Icon name="arrow-right" size={16} color={Colors.white} />
                    </View>
                    <Image source={Images.image1} style={styles.trainingImage} />
                </TouchableOpacity>

                <View style={GlobalStyles.rowSpaceBetween}>
                    <Text style={styles.moodTitle}>Tägliche Affirmation</Text>
                    <Text style={styles.showMore} onPress={() => navigation.navigate('Affirmation')}>Mehr anzeigen</Text>
                </View>
                <View style={styles.levelLine} />

                <View>
                    {affirmation.length === 0 ? (
                        <Text style={styles.noDataText}>No data found</Text>
                    ) : (
                        affirmation.slice(0, 3).map((item: any, index: any) => (
                            <Card
                                key={index}
                                style={styles.dailyAffirmation}
                            >
                                {item.isChecked
                                    ? <TouchableOpacity onPress={() => toggleCheckbox(index, item.id)} style={styles.checked}>
                                        <Icon name={'check'} size={20} color={Colors.white} />
                                    </TouchableOpacity>
                                    : <TouchableOpacity onPress={() => toggleCheckbox(index, item.id)} style={styles.uncheck} />}
                                <Text style={styles.dailyAffirmationText}>{item.affirmation}</Text>
                                <TouchableOpacity onPress={() => deleteAffirmationStatus(item.id)}>
                                    <EntypoIcon name={'trash'} size={22} color={Colors.red} />
                                </TouchableOpacity>
                            </Card>
                        ))
                    )}
                </View>

                <View style={styles.moodMapSection}>
                    <Text style={styles.moodTitle}>Mood Map</Text>
                    <Text
                        onPress={() => navigation.navigate('AnalyseScreen')}
                        style={styles.showMore}>Mehr anzeigen</Text>
                </View>
                <View style={styles.levelLine} />
                <View style={styles.moodMapContainer}>
                    <View style={styles.emojiContainer}>
                        {emojiData.reverse().map((emoji, index) => (
                            <Text key={index} style={{ fontSize: 28, marginBottom: 6 }}>{emoji.icon}</Text>
                        ))}
                    </View>
                    <BarChart
                        data={moodData}
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
                    />
                </View>

                <View style={styles.moodMapSection}>
                    <Text style={styles.moodTitle}>Schritte zum persönlichen Wachstum</Text>
                </View>
                <View style={styles.levelLine} />
                <View style={styles.personalGrowthWrapper}>
                    {personalGrowth.map((item) => (
                        <TouchableOpacity
                            onPress={() => item.screen && navigation.navigate(item.screen)}
                            activeOpacity={0.7}
                            key={item.title} style={styles.personalGrowthContainer}>
                            <View style={{ height: 60, width: 60, backgroundColor: item.backgroundColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={item.icon} style={{ height: 30, width: 30 }} resizeMode='contain' />
                            </View>
                            <Text style={styles.personalGrowthText}>{item.title}</Text>
                            <Text style={styles.personalGrowthSubText}>{item.subTitle}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.quoteSection}>
                    <Text style={styles.quoteText}>Der einzige Weg, großartige Arbeit zu leisten, ist, zu lieben, was du tust.</Text>
                    <Svgs.quote height={30} width={30} />
                </View>
            </ScrollView>
            <MessageModal isVisible={isModalVisible} onClose={hideModal} />
        </View>
    );
}
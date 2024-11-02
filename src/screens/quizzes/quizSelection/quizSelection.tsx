import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../../../constants/colors';
import AppBar from '../../../components/appbar/appbar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images, Svgs } from '../../../constants/images';
import OutlinedButton from '../../../components/outlinedButton/outlinedButton';
import { styles } from './quizSelection.styles';
import GlobalStyles from '../../../styles/GlobalStyles';
import StepProgress from '../../../components/stepProgress/stepProgress';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { useCategoriesAssign, useCategory, useQuizResult } from '../../../api/apis';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loader from '../../../components/loader/loader';
import { CommonActions } from '@react-navigation/native';
import { showToast } from '../../../config/utils';
import AfterCompletingProject from '../../../assets/svg/quiz/After completing a project, you reflect on your performance. What do you do-.svg';
import EmotionalIntelligence1 from '../../../assets/svg/quiz/Emotional intelligence-1.svg';
import EmotionalIntelligence2 from '../../../assets/svg/quiz/Emotional inteligence-2.svg';
import Gratitude1 from '../../../assets/svg/quiz/Gratitude-1.svg';
import Gratitude2 from '../../../assets/svg/quiz/Gratitude-2.svg';
import GratitudeNew from '../../../assets/svg/quiz/Gratitude-New.svg';
import UnexpectedChanges from '../../../assets/svg/quiz/How do you deal with unexpected changes-.svg';
import ImportantDecisions from '../../../assets/svg/quiz/How do you make important decisions-.svg';
import StressfulSituations from '../../../assets/svg/quiz/How do you usually deal with stressful situations-.svg';
import BehaviorDescription from '../../../assets/svg/quiz/How would you best describe your behavior.svg';
import PositiveThought1 from '../../../assets/svg/quiz/Positive thought structure-1.svg';
import PositiveThought2 from '../../../assets/svg/quiz/Positive thought structure-2.svg';
import ProactiveAction1 from '../../../assets/svg/quiz/Proactive action-1.svg';
import ProactiveAction2 from '../../../assets/svg/quiz/Proactive action-2.svg';
import Resilience1 from '../../../assets/svg/quiz/Resilience-1.svg';
import Resilience2 from '../../../assets/svg/quiz/Resilience-2.svg';
import SocialEnvironment1 from '../../../assets/svg/quiz/Social environment-1.svg';
import StrengthEverydayCopy from '../../../assets/svg/quiz/What gives you the most strength in everyday life- copia.svg';
import StrengthEveryday from '../../../assets/svg/quiz/What gives you the most strength in everyday life-.svg';
import NewCarDecision from '../../../assets/svg/quiz/You are looking for a new car and have two good options that meet your requirements, but you can_t decide immediately. How do you proceed-.svg';

const svgs = [Gratitude1, Gratitude2, EmotionalIntelligence1, EmotionalIntelligence2, PositiveThought1, PositiveThought2, Resilience1, Resilience2, ProactiveAction1, ProactiveAction2, SocialEnvironment1, GratitudeNew, AfterCompletingProject, UnexpectedChanges, NewCarDecision];

const QuizSelectionScreen = ({ navigation, route }: any) => {
    const insets = useSafeAreaInsets();
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [answers, setAnswers] = useState(
        route?.params?.data?.tasks.map(() => ({ selectedOption: null })) // Initialize with null selected options for each task
    );
    const [scores, setScores] = useState(() => {
        const initialScores = {};
        route?.params?.data?.matchingParameters.forEach((param) => {
            initialScores[param] = 0;
        });
        return initialScores;
    });
    const { quizResult, loading: quizResultLoading } = useQuizResult();
    const { category, loading: categoryLoading } = useCategory();
    const { categoriesAssign, loading: categoriesAssignLoading } = useCategoriesAssign();
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [assignCategory, setAssignCategory] = useState<any[]>([]);
    const [matchingIds, setMatchingIds] = useState<string[]>([]);

    useEffect(() => {
        // Filter categoryData based on assignCategory and get unique IDs
        const ids = assignCategory.map((category) => {
            const match = categoryData.find((item) => item.title === category);
            return match ? match.id : null;
        }).filter((id) => id !== null); // Remove nulls

        // Remove duplicate IDs using Set
        const uniqueIds = Array.from(new Set(ids));
        setMatchingIds(uniqueIds);
    }, [assignCategory, categoryData]);

    useEffect(() => {
        if (route?.params?.screen === 'home') {
            category()
                .then((response) => setCategoryData(response))
                .catch((error) => console.log('category api error', error))
        }
    }, [])

    const toggleOption = (optionIndex: number) => {
        // Update the selected option for the current quiz question
        setAnswers((prev: any) => {
            const updatedAnswers = [...prev];
            updatedAnswers[currentQuiz].selectedOption = optionIndex;

            // Update the scores based on the selected option
            const selectedOption = route.params.data.tasks[currentQuiz];
            const selectedAnswer = route.params.data.tasks[currentQuiz].answers[optionIndex];
            calculateScores(selectedAnswer?.matchingParameters);
            setAssignCategory((prevCategories) => 
                selectedOption.categoryAssign ? [...prevCategories, selectedOption.categoryAssign] : prevCategories
            );    

            return updatedAnswers;
        });

        // Move to the next question after 500ms
        setTimeout(() => {
            if (currentQuiz < route.params.data.tasks.length - 1) {
                setCurrentQuiz((prev) => prev + 1);
            } else {
                handleQuizCompletion();
            }
        }, 500);
    };

    const calculateScores = (matchingParameters: any[]) => {
        const newScores = { ...scores };
        matchingParameters?.forEach((param: { key: any; value: any; }) => {
            const { key, value } = param;
            newScores[key] = (newScores[key] || 0) + parseInt(value, 10); // Dynamically update score
        });
        setScores(newScores);
    };

    // Function to handle what happens when the quiz is completed
    const handleQuizCompletion = () => {
        if (route?.params?.screen === 'home') {
            categoriesAssign({ selectedCategories: matchingIds })
                .then((response) => {
                    console.log('category response', response);
                    showToast(response?.message);

                    setTimeout(() => {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0, // Start with the first route in the stack
                                routes: [{ name: 'RootStack' }], // Target screen to navigate
                            })
                        );
                    }, 2000);
                })
                .catch((error) => console.log(error));
        } else {
            quizResult({
                taskFlowId: route?.params?.data?.id,
                parameterValues: scores, // Scores will be correctly updated here
            })
                .then((response) => {
                    console.log(response);
                    // navigation.navigate('TrainingPlanScreen');
                    navigation.navigate('ViewQuizTasksScreen', { data: response });
                })
                .catch((error) => console.log(error));
        }
    };

    const handleBack = () => {
        if (currentQuiz > 0) {
            setCurrentQuiz((prev) => prev - 1);
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <Loader loading={categoryLoading || quizResultLoading || categoriesAssignLoading} />
            <AppBar onBackPress={() => navigation.goBack()} title={'Fragebogen'} />
            <View style={styles.modal}>
                <View style={[{ minHeight: route?.params?.screen === 'home' ? 300 : 250, alignItems: 'center', justifyContent: 'center' }]}>
                    <SizedBox height={10} />
                    {route?.params?.screen === 'home' && React.createElement(svgs[currentQuiz], { width: 150, height: 150 })}
                    <Text style={styles.questionText}>{route?.params?.data?.tasks[currentQuiz]?.title}</Text>
                    <View style={styles.dash} />
                </View>
                <ScrollView style={styles.bottomSection}>
                    <View style={styles.stepProgressWrapper}>
                        <StepProgress
                            totalSteps={route?.params?.data.tasks.length}
                            activeSteps={currentQuiz + 1}
                        />
                    </View>
                    <Text style={styles.largeText}>
                        'Bitte wähle eine Antwort aus'
                    </Text>
                    <View style={styles.statsContainer}>
                        {route?.params?.data?.tasks[currentQuiz]?.answers.map((option: any, index: number) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.checkboxWithTextView,
                                    answers[currentQuiz]?.selectedOption === index && styles.selected,
                                ]}
                                onPress={() => toggleOption(index)}
                            >
                                <View style={styles.checkboxContainer}>
                                    {answers[currentQuiz]?.selectedOption === index ? (
                                        <Svgs.selectedCircle height={24} width={24} />
                                    ) : (
                                        <Svgs.whiteCircle height={22} width={22} />
                                    )}
                                    <SizedBox width={8} />
                                    <Text style={[
                                        styles.label,
                                        answers[currentQuiz]?.selectedOption === index && styles.selectedText,
                                    ]}>
                                        {option.answerText}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <OutlinedButton onPress={handleBack} buttonStyle={styles.buttonStyle}>
                        <Icon name="backward" size={20} color={Colors.white} />
                    </OutlinedButton>
                    <View style={{ height: insets.bottom }} />
                </ScrollView>
            </View>
        </View>
    );
};

export default QuizSelectionScreen;
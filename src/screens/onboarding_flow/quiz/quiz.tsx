import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Checkbox from '../../../components/checkbox/checkbox';
import { Images, Svgs } from '../../../constants/images';
import Colors from '../../../constants/colors';
import OutlinedButton from '../../../components/outlinedButton/outlinedButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './quiz.styles';
import Spacer from '../../../components/spacer/spacer';
import StepProgress from '../../../components/stepProgress/stepProgress';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizAnswers } from '../../../state/slices/app.slice';
import { RootState } from '../../../state/store';

export default function Quiz({ navigation }: any) {
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const { quiz } = useSelector((state: RootState) => state.appSlice);
    const dispatch = useDispatch();

    const quizData = [
        {
            question: "Wie würdest du dein Verhalten am besten beschreiben?",
            image: Svgs.describeYourBehaviour,
            answerWithImage: false,
            options: [
                'Ich rede gern mit anderen und genieße es, unter Leuten zu sein.',
                'Ich bin lieber für mich allein und denke über Dinge nach.',
                'Ich mache Dinge gern nach Plan und überlege vorher alles genau.',
                'Ich entscheide oft spontan und mache, was sich gerade richtig anfühlt.',
                'Ich übernehme gerne Verantwortung und entscheide, wie es weitergeht.',
            ],
        },
        {
            question: "Wie gehst du normalerweise mit stressigen Situationen um?",
            answerWithImage: false,
            image: Svgs.dealWithStressfull,
            options: [
                'Ich ziehe mich zurück und versuche, mich zu beruhigen.',
                'Ich rede mit meinen Freunden oder meiner Familie darüber.',
                'Ich versuche, das Problem Schritt für Schritt zu lösen.',
                'Ich lasse meinen Gefühlen freien Lauf, um den Stress loszuwerden.',
                'Ich versuche, den Stress einfach zu ignorieren und weiterzumachen.',
            ],
        },
        {
            question: "Was gibt dir im Alltag am meisten Kraft?",
            answerWithImage: false,
            image: Svgs.whatGivesYouStrength,
            options: [
                'Zeit mit anderen Menschen zu verbringen, gibt mir Kraft.',
                'Allein zu sein und über Dinge nachzudenken, gibt mir Energie.',
                'Ich liebe es, Neues zu lernen und Herausforderungen anzunehmen.',
                'Ich fühle mich gut, wenn ich das Gefühl habe, Dinge im Griff zu haben.',
                'Ich brauche mal Ruhe, mal Action – es kommt drauf an.',
            ],
        },
        {
            question: "Wie triffst du wichtige Entscheidungen?",
            answerWithImage: false,
            image: Svgs.importantDecisions,
            options: [
                'Ich schaue mir die Fakten an und entscheide logisch.',
                'Ich höre auf mein Bauchgefühl und entscheide danach.',
                'Ich überlege, was meine Gefühle mir sagen, und entscheide danach.',
                'Ich rede mit anderen darüber und entscheide dann.',
                'Ich entscheide lieber alleine, ohne auf andere zu hören.',
            ],
        },
        {
            question: "Wie gehst du mit unerwarteten Veränderungen um?",
            answerWithImage: false,
            image: Svgs.unexpectedChanges,
            options: [
                'Ich sehe das als Chance, was Neues auszuprobieren.',
                'Veränderungen stressen mich, und ich brauche Zeit, mich daran zu gewöhnen.',
                'Ich gehe mit der Situation mit und schaue, was passiert.',
                'Ich denke erst einmal darüber nach, bevor ich etwas tue.',
                'Ich versuche, möglichst an dem festzuhalten, was ich kenne.',
            ],
        },
    ];

    useEffect(() => {
        const currentAnswer = quiz.find(answer => answer.question === quizData[currentQuiz].question);

        console.log("Current Quiz Question:", quizData[currentQuiz].question);
        console.log("Current Answer Found:", currentAnswer);

        if (currentAnswer) {
            // If an answer exists, split it into an array of selected option indices
            const indices = quizData[currentQuiz].options.reduce((acc: number[], option, index) => {
                if (currentAnswer.answer.includes(option)) {
                    acc.push(index);
                }
                return acc;
            }, []);
            setSelectedOptions(indices);
        } else {
            // Reset selected options if no answer is found
            setSelectedOptions([]);
        }
    }, [currentQuiz, quiz]); // Updated dependency

    const toggleOption = (index: number) => {
        setSelectedOptions(prev =>
            prev.includes(index)
                ? prev.filter(item => item !== index)
                : [...prev, index]
        );
    };

    const handleBack = () => {
        if (currentQuiz > 0) {
            setCurrentQuiz(currentQuiz - 1);
            setSelectedOptions([]);
        } else {
            navigation.goBack();
        }
    };

    const handleForward = () => {
        if (selectedOptions.length > 0) {
            const selectedAnswers = selectedOptions.map(index => quizData[currentQuiz].options[index]);
            dispatch(
                setQuizAnswers({
                    question: quizData[currentQuiz].question,
                    answer: selectedAnswers, // Store answers as an array
                })
            );

            if (currentQuiz < quizData.length - 1) {
                setCurrentQuiz(currentQuiz + 1);
                setSelectedOptions([]);
            } else {
                navigation.navigate('RegisterScreen', { selectedOptions })
            }
        }
    };

    const ImageComponent = quizData[currentQuiz].image;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <StepProgress
                    totalSteps={quizData.length}
                    activeSteps={currentQuiz + 1}
                    activeColor={Colors.primaryColor}
                    inactiveColor={Colors.lightGrey}
                />
                {quizData[currentQuiz].image ? <View style={{ height: 200 }}><ImageComponent /></View> : <Spacer flex={0.6} />}
                <Text style={styles.question}>{quizData[currentQuiz].question}</Text>
                {currentQuiz !== 0 && <Text style={styles.subtitle}>{`Bitte auswählen`}</Text>}
                {quizData[currentQuiz].answerWithImage
                    ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, alignItems: 'center', justifyContent: 'center' }}>
                        {quizData[currentQuiz].options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.checkboxView, selectedOptions.includes(index) && styles.selected]}
                                onPress={() => toggleOption(index)}>
                                <Image source={Images.plan} style={styles.optionImage} resizeMode='contain' />
                                <Text style={[styles.optionText, selectedOptions.includes(index) && { color: Colors.white }]}>Fallschirmspringen</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    : <>
                        {quizData[currentQuiz].options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.checkboxView, selectedOptions.includes(index) && styles.selected]}
                                onPress={() => toggleOption(index)}>
                                <Checkbox
                                    checked={selectedOptions.includes(index)}
                                    label={option}
                                />
                            </TouchableOpacity>
                        ))}
                    </>}
                <View style={styles.buttonsContainer}>
                    <OutlinedButton onPress={handleBack}
                        buttonStyle={styles.buttonStyle}>
                        <Icon name='backward' size={20} color={Colors.secondaryColor} />
                    </OutlinedButton>
                    <OutlinedButton onPress={handleForward}
                        buttonStyle={selectedOptions?.length > 0 ? styles.selectedButtonStyle : styles.notSelectedButtonStyle}>
                        <Icon name='forward' size={20} color={Colors.white} />
                    </OutlinedButton>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../bottomTabs/bottom_tabs';
import WelcomeQuizScreen from '../../screens/quizzes/welcomeQuiz/welcomeQuiz';
import QuizSelectionScreen from '../../screens/quizzes/quizSelection/quizSelection';
import DiaryEntryScreen from '../../screens/diary/diaryEntry/diaryEntry';
import SocialBatteryScreen from '../../screens/diary/socialBattery/socialBattery';
import MoodScreen from '../../screens/diary/mood/mood';
import ChatScreen from '../../screens/chat_flow/chat/chat';
import AudioScreen from '../../screens/chat_flow/audio/audio';
import ReplayAudioScreen from '../../screens/chat_flow/replayAudio/replayAudio';
import TraningPlanChatScreen from '../../screens/training/trainingplanChat/trainingplanChat';
import UploadAudioScreen from '../../screens/chat_flow/upload/upload';
import VisionBoard from '../../screens/vision_board/visionBoard';
import Colors from '../../constants/colors';
import CongratsScreen from '../../screens/quizzes/congrats/congrats';
import ViewQuizTasksScreen from '../../screens/quizzes/viewQuizTasks/viewQuizTasks';
import FeaturesScreen from '../../screens/onboarding_flow/features/features';
import SubscriptionScreen from '../../screens/onboarding_flow/subscription/subscription';
import TrainingImageScreen from '../../screens/training/trainingImage/training_image';
import TrainingVideoScreen from '../../screens/training/trainingVideo/training_video';
import TrainingAudioScreen from '../../screens/training/trainingAudio/training_audio';
import TrainingTextScreen from '../../screens/training/trainingText/training_text';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="BottomTabs"
            screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.white } }}>
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="WelcomeQuizScreen" component={WelcomeQuizScreen} />
            <Stack.Screen name="QuizSelectionScreen" component={QuizSelectionScreen} />
            <Stack.Screen name="ViewQuizTasksScreen" component={ViewQuizTasksScreen} />
            <Stack.Screen name="CongratsScreen" component={CongratsScreen} />
            <Stack.Screen name="DiaryEntryScreen" component={DiaryEntryScreen} />
            <Stack.Screen name="SocialBatteryScreen" component={SocialBatteryScreen} />
            <Stack.Screen name="MoodScreen" component={MoodScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="AudioScreen" component={AudioScreen} />
            <Stack.Screen name="ReplayAudioScreen" component={ReplayAudioScreen} />
            <Stack.Screen name="TraningPlanChatScreen" component={TraningPlanChatScreen} />
            <Stack.Screen name="UploadAudioScreen" component={UploadAudioScreen} />
            <Stack.Screen name="VisionBoard" component={VisionBoard} />
            <Stack.Screen name="FeaturesScreen" component={FeaturesScreen} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
            <Stack.Screen name="TrainingImageScreen" component={TrainingImageScreen} />
            <Stack.Screen name="TrainingVideoScreen" component={TrainingVideoScreen} />
            <Stack.Screen name="TrainingAudioScreen" component={TrainingAudioScreen} />
            <Stack.Screen name="TrainingTextScreen" component={TrainingTextScreen} />
        </Stack.Navigator>
    );
};

export default RootStack;

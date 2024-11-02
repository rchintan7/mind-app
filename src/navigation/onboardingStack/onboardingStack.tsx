import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../screens/onboarding_flow/welcome/welcome';
import PersonalizeScreen from '../../screens/onboarding_flow/personalize/personalize';
import Quiz from '../../screens/onboarding_flow/quiz/quiz';
import RegisterScreen from '../../screens/onboarding_flow/register/register';
import LoginScreen from '../../screens/onboarding_flow/login/login';
import NumberScreen from '../../screens/onboarding_flow/number/number';
import CookiesScreen from '../../screens/onboarding_flow/cookies/cookies';
import WelcomeSlideScreen from '../../screens/onboarding_flow/welcomeSlide/welcomeSlide';
import FeaturesScreen from '../../screens/onboarding_flow/features/features';
import SubscriptionScreen from '../../screens/onboarding_flow/subscription/subscription';
import Colors from '../../constants/colors';
import RegisterDetailsScreen from '../../screens/onboarding_flow/registerDetails/register_details';

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.white } }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Personalize" component={PersonalizeScreen} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="RegisterDetailsScreen" component={RegisterDetailsScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="NumberScreen" component={NumberScreen} />
            <Stack.Screen name="CookiesScreen" component={CookiesScreen} />
            <Stack.Screen name="WelcomeSlideScreen" component={WelcomeSlideScreen} />
            <Stack.Screen name="FeaturesScreen" component={FeaturesScreen} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
        </Stack.Navigator>
    );
};

export default OnboardingStack;

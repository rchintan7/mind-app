import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../../constants/colors';
import HomeScreen from '../../screens/dashboard/home/home';
import ProfileScreen from '../../screens/profile/profile/profile';
import FavoriteScreen from '../../screens/profile/favorite/favorite';
import BadgeScreen from '../../screens/profile/badge/badge';
import AnalyseScreen from '../../screens/diary/analyse/analyse';
import ViewTasksScreen from '../../screens/training/viewTasks/viewTasks';
import Affirmation from '../../screens/dashboard/affirmation/Affirmation';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.white } }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
            <Stack.Screen name="BadgeScreen" component={BadgeScreen} />
            <Stack.Screen name="AnalyseScreen" component={AnalyseScreen} />
            <Stack.Screen name="ViewTasksScreen" component={ViewTasksScreen} />
            <Stack.Screen name="Affirmation" component={Affirmation} />
        </Stack.Navigator>
    );
};

export default HomeStack;

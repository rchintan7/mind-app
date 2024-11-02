import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../../constants/colors';
import DiaryScreen from '../../screens/diary/diary/diary';
import ActivitiesScreen from '../../screens/diary/activities/activities';
import AnalyseScreen from '../../screens/diary/analyse/analyse';
import ArchiveScreen from '../../screens/diary/archive/archive';
import EntriesScreen from '../../screens/diary/entries/entries';
import ArchiveDataScreen from '../../screens/diary/archiveData/archive_data';
import Goals from '../../screens/diary/goals/goals';

const Stack = createNativeStackNavigator();

const DiaryStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.white } }}>
            <Stack.Screen name="DiaryScreen" component={DiaryScreen} />
            <Stack.Screen name="ActivitiesScreen" component={ActivitiesScreen} />
            <Stack.Screen name="ArchiveScreen" component={ArchiveScreen} />
            <Stack.Screen name="ArchiveDataScreen" component={ArchiveDataScreen} />
            <Stack.Screen name="AnalyseScreen" component={AnalyseScreen} />
            <Stack.Screen name="EntriesScreen" component={EntriesScreen} />
            <Stack.Screen name="Goals" component={Goals} />
        </Stack.Navigator>
    );
};

export default DiaryStack;

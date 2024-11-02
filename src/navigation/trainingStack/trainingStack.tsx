import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../../constants/colors';
import TrainingPlanScreen from '../../screens/training/trainingplan/trainingplan';
import ViewTasksScreen from '../../screens/training/viewTasks/viewTasks';
import CompletedTasksScreen from '../../screens/training/completedTasks/completedTasks';
import TasksScreen from '../../screens/training/tasks/tasks';

const Stack = createNativeStackNavigator();

const TrainingStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.white } }}>
            <Stack.Screen name="TrainingPlanScreen" component={TrainingPlanScreen} />
            <Stack.Screen name="ViewTasksScreen" component={ViewTasksScreen} />
            <Stack.Screen name="CompletedTasksScreen" component={CompletedTasksScreen} />
            <Stack.Screen name="TasksScreen" component={TasksScreen} />
        </Stack.Navigator>
    );
};

export default TrainingStack;

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../constants/colors';
import { onAuthStateChange } from '../state/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import OnboardingStack from './onboardingStack/onboardingStack';
import RootStack from './rootStack/rootStack';
import FeaturesScreen from '../screens/onboarding_flow/features/features';
import SubscriptionScreen from '../screens/onboarding_flow/subscription/subscription';

const Stack = createNativeStackNavigator();

function MainRoute() {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState<boolean>(true);
    const { jwtToken } = useSelector((state: RootState) => state.userSlice);

    useEffect(() => {
        dispatch(onAuthStateChange())
            .then(async result => {
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, []);

    if (loading) return null;

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            {jwtToken ? (
                <Stack.Screen name="RootStack" component={RootStack} />
            ) : (
                <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
            )}
            <Stack.Screen name="FeaturesScreen" component={FeaturesScreen} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
        </Stack.Navigator>
    )
}

export default MainRoute
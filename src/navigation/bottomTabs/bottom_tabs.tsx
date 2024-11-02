import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/colors';
import { Images } from '../../constants/images';
import GlobalStyles from '../../styles/GlobalStyles';
import FeedScreen from '../../screens/feed/feed';
import HomeStack from '../homeStack/homeStack';
import DiaryStack from '../diaryStack/diaryStack';
import TrainingStack from '../trainingStack/trainingStack';
import { useAppCount, useStreak } from '../../api/apis';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ navigation, children }: any) => (
    <View style={{
        top: -35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        height: 70,
        width: 70,
        borderRadius: 100
    }}>
        <TouchableOpacity
            style={GlobalStyles.shadowDefault}
            onPress={() => navigation.navigate('ChatScreen')}
        >
            <View style={styles.fab}>
                {children}
            </View>
        </TouchableOpacity>
    </View>
);

export default function BottomTabs({ navigation }: any) {
    const { getStreak, loading: getStreakLoading } = useStreak();
    const { appCount, loading: appCountLoading } = useAppCount();

    useEffect(() => {
        getStreak()
            .then((response) => console.log(response))
            .catch((error) => console.log('Streak api error', error));
        appCount()
            .then((response) => console.log(response))
            .catch((error) => console.log('App count api error', error));
    }, [])

    React.useEffect(() => {
        const unsubscribe = messaging().onTokenRefresh(token => {
            console.log('Token - ', token);

            // updateFCMTokenInFirestore(user.uid, token);
        });

        // Initial setup to get the FCM token
        messaging()
            .getToken()
            .then(token => {
                console.log('Token - ', token);

                // updateFCMTokenInFirestore(user.uid, token);
            }).catch((error) => {
                console.log('Push error', error);

            });

        return unsubscribe;
    }, []);

    React.useEffect(() => {
        const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
        })

        // Cleanup: Unsubscribe when the component unmounts
        return () => unsubscribe();
    }, [])

    React.useEffect(() => {
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {

                }
            });
    }, [])

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "local-channel", // (required)
                channelName: "Local Notification", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                playSound: false, // (optional) default: true
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    React.useEffect(() => {
        createChannels();

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            console.log('Forground message', remoteMessage);
            const { notification, data } = remoteMessage;
            PushNotification.localNotification({
                channelId: "local-channel",
                title: notification?.title ?? '',
                message: notification?.body ?? '',
                userInfo: { ...data, appOpen: true }
            });
        })

        // Cleanup: Unsubscribe when the component unmounts
        return () => unsubscribe();
    }, [])

    React.useEffect(() => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log('Tokne', token);

            },
            onNotification: function (notification) {
                console.log('LOCAL NOTIFICATION RECEIVED:', notification);
                if (notification?.data?.appOpen) {
                    const { data } = notification;

                }
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }, []);

    React.useEffect(() => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.addEventListener('notification', onRemoteNotification);
        }
        return () => {
            if (Platform.OS === 'ios') {
                PushNotificationIOS.removeEventListener('notification');
            }
        };
    });

    const onRemoteNotification = (notification: any) => {
        const isClicked = notification.getData().userInteraction === 1;
        console.log('ios notification', notification);

        if (isClicked) {
            // Navigate user to another screen
        } else {
            // Do something else with push notification
        }
        // Use the appropriate result based on what you needed to do for this notification
        const result = PushNotificationIOS.FetchResult.NoData;
        notification.finish(result);
    };

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: Colors.white,
                    borderRadius: 12,
                },
                headerShown: false,
                tabBarActiveTintColor: Colors.primaryColor,
                tabBarInactiveTintColor: Colors.grey300,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image source={focused ? Images.selectedHome : Images.home} style={{ height: size, width: size }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tagebuch"
                component={DiaryStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image source={focused ? Images.selectedBook : Images.book} style={{ height: size, width: size }} />
                    ),
                }}
            />
            <Tab.Screen
                name="CenterButton"
                component={() => null}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="add" color={Colors.white} size={28} />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} navigation={navigation}>
                            <Image source={Images.floatingIcon} style={{ height: 60, width: 60 }} />
                        </CustomTabBarButton>
                    ),
                }}
            />
            <Tab.Screen
                name="Aufgaben"
                component={TrainingStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image source={focused ? Images.selectedTask : Images.task} style={{ height: size, width: size }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image source={focused ? Images.selectedFeed : Images.feed} style={{ height: size, width: size }} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    fab: {
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
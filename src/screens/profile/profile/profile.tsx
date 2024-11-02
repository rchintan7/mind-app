import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Colors from '../../../constants/colors';
import AppBar from '../../../components/appbar/appbar';
import { Images } from '../../../constants/images';
import SizedBox from '../../../components/sizedbox/sizedbox';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './profile.styles';
import ProfileTab from './tabs/profileTab/profileTab';
import SettingsTab from './tabs/settingsTab/settingsTab';
import GlobalStyles from '../../../styles/GlobalStyles';
import { RootState } from '../../../state/store';
import { useSelector } from 'react-redux';

const ProfileScreen = (props: any) => {
    const { userMe } = useSelector((state: RootState) => state.userSlice);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;
    const tabWidth = 123; // Adjust according to your tab width

    useEffect(() => {
        Animated.timing(animation, {
            toValue: selectedIndex * tabWidth,
            duration: 600,
            useNativeDriver: false,
        }).start();
    }, [selectedIndex]);

    const translateX = animation.interpolate({
        inputRange: [0, tabWidth],
        outputRange: [0, tabWidth],
    });

    const renderContent = () => {
        if (selectedIndex === 0) {
            return (
                <ProfileTab {...props}  />
            );
        } else {
            return (
                <SettingsTab {...props} />
            );
        }
    };

    return (
        <View style={GlobalStyles.container}>
            {/* Profile Greeting Section */}
            <AppBar
                onBackPress={() => props.navigation.goBack()}
                title={'Profil'}
                actions={<TouchableOpacity
                    onPress={() => props.navigation.navigate('FavoriteScreen')}
                    style={styles.likeContainer}>
                    <FontAwesomeIcon name="heart" size={22} color={Colors.textColor} />
                </TouchableOpacity>} />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <SizedBox height={20} />
                <View style={styles.avatarContainer}>
                    <Image source={Images.avatar} style={styles.avatar} />
                </View>
                <SizedBox height={10} />
                <Text style={styles.greetingText}>{userMe?.firstname} {userMe?.lastname}</Text>
                <Text style={styles.subText}>{userMe?.email}</Text>
                <SizedBox height={20} />

                {/* Tab Selection with animation */}
                <View>
                    <View style={styles.tabContainer}>
                        <Animated.View style={[styles.animatedTab, { transform: [{ translateX }] }]} />
                        <TouchableOpacity
                            style={[styles.tabButton]}
                            onPress={() => setSelectedIndex(0)}
                        >
                            <Text style={[styles.tabTextStyle, selectedIndex === 0 && styles.activeText]}>
                                Profil
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton]}
                            onPress={() => setSelectedIndex(1)}
                        >
                            <Text style={[styles.tabTextStyle, selectedIndex === 1 && styles.activeText]}>
                                Einstellungen
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <SizedBox height={20} />

                {/* Render content based on selected tab */}
                {renderContent()}
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;

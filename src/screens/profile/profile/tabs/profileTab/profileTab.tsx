import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from './profileTab.styles';
import { Images, Svgs } from '../../../../../constants/images';
import Card from '../../../../../components/card/card';
import SizedBox from '../../../../../components/sizedbox/sizedbox';
import Colors from '../../../../../constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../state/store';
import { useAchievements } from '../../../../../api/apis';
import Loader from '../../../../../components/loader/loader';

const ProfileTab = ({ navigation, data }: any) => {
    const { userMe } = useSelector((state: RootState) => state.userSlice);
    const badgeData = [
        { icon: Images.lavelOpen, title: 'Lorem ipsum', subtitle: 'Lorem ipsum dolor sit amet' },
        { icon: Images.lavelLock, title: 'Lorem ipsum', subtitle: 'Lorem ipsum dolor sit amet' },
        { icon: Images.lavelOpen, title: 'Lorem ipsum', subtitle: 'Lorem ipsum dolor sit amet' },
    ];
    const { getAchievements, loading: getAchievementsLoading } = useAchievements();
    const [achhivementsData, setAchivementData] = useState<any[]>([]);

    useEffect(() => {
        getAchievements()
            .then((response) => {
                setAchivementData(response?.achievements)
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <View style={styles.container}>
            <Loader loading={getAchievementsLoading} />
            <View style={styles.cardWrapper}>
                <Card style={styles.cardStyel}>
                    <Svgs.calendarCheck height={30} width={30} />
                    <SizedBox width={10} />
                    <View>
                        <Text style={styles.greetingText}>{userMe?.appOpenCount ?? 0}</Text>
                        <Text style={styles.subText}>Eingetragene Tage</Text>
                    </View>
                </Card>
                <Card style={styles.cardStyel}>
                    <Image source={Images.lavel} style={styles.badgeIcon} />
                    <SizedBox width={10} />
                    <View>
                        <Text style={styles.greetingText}>{userMe?.userLevel ?? 0}</Text>
                        <Text style={styles.subText}>Aktuelle Stufe</Text>
                    </View>
                </Card>
            </View>
            <View style={styles.cardWrapper}>
                <Card style={styles.cardStyel}>
                    <Svgs.listCheck height={30} width={30} />
                    <SizedBox width={10} />
                    <View>
                        <Text style={styles.greetingText}>{userMe?.taskCompleted ?? 0}</Text>
                        <Text style={styles.subText}>Aufgaben erledigt</Text>
                    </View>
                </Card>
                <Card style={styles.cardStyel}>
                    <Svgs.bolt height={30} width={30} />
                    <SizedBox width={10} />
                    <View>
                        <Text style={styles.greetingText}>{userMe?.experiencePoints ?? 0}</Text>
                        <Text style={styles.subText}>XP insgesamt</Text>
                    </View>
                </Card>
            </View>
            <SizedBox height={8} />
            <Card style={styles.entriesCardStyle}>
                <Text style={styles.entriesText}>🔥{userMe?.streakCount ?? 0} Logins in Folge</Text>
            </Card>
            <SizedBox height={20} />
            <View style={styles.levelSection}>
                <View>
                    <Text style={styles.levelText}>Abzeichen</Text>
                    <View style={styles.levelLine} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('BadgeScreen')}>
                    <Text style={styles.subText}>Alle anzeigen</Text>
                </TouchableOpacity>
            </View>
            {achhivementsData.map((item, index) => (
                <Card style={styles.badgeCard} key={index}>
                    <Image source={{ uri: item?.imageURL }} style={styles.badgeIcon} />
                    <SizedBox width={10} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.badgeTitle}>{item?.title}</Text>
                        <Text style={styles.badgeSubtitle}>{item?.description}</Text>
                    </View>
                    <AnimatedCircularProgress
                        size={50}
                        width={4}
                        fill={item?.progress}
                        rotation={0}
                        tintColor={Colors.primaryColor}
                        backgroundColor={'#25D5A41A'}
                    >
                        {() => (
                            <Text style={styles.circularProgressText}>{item?.progress}%</Text>
                        )}
                    </AnimatedCircularProgress>
                </Card>
            ))}
            <SizedBox height={120} />
        </View>
    );
};

export default ProfileTab;

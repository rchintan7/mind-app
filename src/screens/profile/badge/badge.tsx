import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { Images } from '../../../constants/images';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Colors from '../../../constants/colors';
import Card from '../../../components/card/card';
import { styles } from './badge.styles';
import GlobalStyles from '../../../styles/GlobalStyles';
import { useAchievements } from '../../../api/apis';
import Loader from '../../../components/loader/loader';

const BadgeScreen = ({ navigation }: any) => {
    const { getAchievements, loading: getAchievementsLoading } = useAchievements();
    const [achhivementsData, setAchivementData] = useState<any[]>([]);

    useEffect(() => {
        getAchievements()
            .then((response) => {
                setAchivementData(response?.achievements)
            })
            .catch((error) => console.log(error))
    }, [])

    const badgeData = [
        { icon: Images.lavelOpen, title: 'Lorem ipsum', subtitle: 'Lorem ipsum dolor sit amet' },
        { icon: Images.lavelLock, title: 'Lorem ipsum', subtitle: 'Lorem ipsum dolor sit amet' },
        { icon: Images.lavelOpen, title: 'Lorem ipsum', subtitle: 'Lorem ipsum dolor sit amet' },
    ];

    return (
        <View style={GlobalStyles.container}>
            <Loader loading={getAchievementsLoading} />

            {/* Header */}
            <AppBar onBackPress={() => navigation.goBack()} title={'Profil'} />

            {/* Content */}
            <ScrollView>
                <SizedBox height={20} />
                <View style={styles.levelSection}>
                    <View>
                        <Text style={styles.levelText}>Abzeichen</Text>
                        <View style={styles.levelLine} />
                    </View>
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
            </ScrollView>
        </View>
    );
};

export default BadgeScreen;

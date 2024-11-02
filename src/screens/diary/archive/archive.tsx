import React from 'react';
import { View, Text } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import Card from '../../../components/card/card';
import SizedBox from '../../../components/sizedbox/sizedbox';
import GlobalStyles from '../../../styles/GlobalStyles';
import { styles } from './archive.styles';

const ArchiveScreen = ({ navigation, route }: any) => {
    const list = [
        {
            title: 'Dankbarkeit',
            color: 'rgba(37, 213, 164, 0.25)',
            type: 'GRATITUDE'
        },
        {
            title: 'Selbstfürsorge',
            color: 'rgba(252, 128, 74, 0.25)',
            type: 'SELFCARE'
        },
        {
            title: 'Erfolg',
            color: 'rgba(145, 98, 73, 0.25)',
            type: 'SUCCESS'
        },
        {
            title: 'Herausforderungen',
            color: 'rgba(184, 25, 255, 0.25)',
            type: 'CHALLENGES'
        },
    ]

    return (
        <View style={GlobalStyles.container}>
            <AppBar onBackPress={() => navigation.goBack()} title='Archiv' />

            <View style={styles.titleSection}>
                <Text style={styles.title}>{'Deine Ziele'}</Text>
            </View>
            <View style={styles.levelLine} />

            <View style={styles.goalContainer}>
                {list.map((item, index) => (
                    <Card key={index}
                        onPress={() => navigation.navigate('ArchiveDataScreen', { type: item.type, diaryId: route?.params?.diaryId })}
                        style={styles.goalCard}>
                        <View style={[styles.smileContainer, { backgroundColor: item.color }]}>
                        </View>
                        <SizedBox height={10} />
                        <Text style={styles.goalTitle}>{item.title}</Text>
                    </Card>
                ))}
            </View>
        </View>
    );
};

export default ArchiveScreen;
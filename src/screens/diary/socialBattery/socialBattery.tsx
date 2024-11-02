import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import SizedBox from '../../../components/sizedbox/sizedbox';
import CustomButton from '../../../components/customButton/customButton';
import { styles } from './socialBattery.styles';
import GlobalStyles from '../../../styles/GlobalStyles';

const SocialBatteryScreen = ({ navigation }: any) => {
    const list = ['#FF395D', '#FF8C39', '#FDC944', '#74C69D', '#40916C'];
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <View style={GlobalStyles.container}>
            <AppBar onBackPress={() => navigation.goBack()} title='Social Battery' />

            <View style={styles.socialBattery}>
                <Text style={styles.title}>Social Battery</Text>
                <SizedBox height={10} />
                <Text style={styles.subtitle}>{`Wähle aus, wie viel Energie\ndu aktuell hast:`}</Text>
                <View style={styles.batteryBar}>
                    <View style={styles.progressWrapper}>
                        {list.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedIndex(index)}
                                activeOpacity={0.7}
                                style={[styles.progress, { backgroundColor: item, opacity: index > selectedIndex ? 0.10 : 1 }]}
                            />
                        ))}
                    </View>
                    <View style={styles.progressWrapper}>
                        <Text style={styles.progressPercent}>0%</Text>
                        <Text style={styles.progressPercent}>50%</Text>
                        <Text style={styles.progressPercent}>100%</Text>
                    </View>
                </View>
            </View>

            <View style={styles.saveButtonContainer}>
                <CustomButton onPress={() => { }} title={'Speichern'} />
            </View>
        </View>
    );
};

export default SocialBatteryScreen;
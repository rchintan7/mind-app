import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../../components/customButton/customButton';
import Colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { styles } from './subscription.styles';
import { useDispatch } from 'react-redux';

export default function SubscriptionScreen({ navigation }: any) {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Wähle ein Abo für die Zeit nach deiner 7-tägigen Testphase`}</Text>

            <View style={styles.optionContainer}>
                <TouchableOpacity
                    style={[
                        styles.option,
                        selectedOption === 'Monatlich' && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedOption('Monatlich')}
                >
                    <View>
                        <Text style={styles.optionText}>Monatlich</Text>
                        <Text style={styles.optionSubtext}>8,99 € pro Monat</Text>
                    </View>
                    {selectedOption === 'Monatlich' ? <Icon name='circle-check' size={20} color={Colors.secondaryColor} /> : <Icon name='circle' size={20} color={Colors.textColor} />}
                </TouchableOpacity>
                <View style={styles.popularContainer}>
                    <Text style={styles.popularText}>BELIEBT</Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.option,
                        selectedOption === 'Jährlich' && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedOption('Jährlich')}
                >
                    <View>
                        <Text style={styles.optionText}>Jährlich</Text>
                        <Text style={styles.optionSubtext}>59,80 € - 4,99 € pro Monat</Text>
                    </View>
                    {selectedOption === 'Jährlich' ? <Icon name='circle-check' size={20} color={Colors.secondaryColor} /> : <Icon name='circle' size={20} color={Colors.textColor} />}
                </TouchableOpacity>
                <Text style={styles.subText}>Jederzeit kündbar im App Store</Text>
            </View>

            <CustomButton
                onPress={() => navigation.navigate('RootStack')}
                title='Kostenlos starten'
                buttonStyle={styles.buttonStyle} />

            <TouchableOpacity
                onPress={() => navigation.navigate('RootStack')}
                style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Überspringen</Text>
            </TouchableOpacity>
        </View>
    );
}